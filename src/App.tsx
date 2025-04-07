import { useState, useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { DhikrSelector } from "./components/DhikrSelector";
import { TasbehCounter } from "./components/TasbehCounter";
import { HijriDate } from "./components/HijriDate";
import { QiblaCompass } from "./components/QiblaCompass";
import { PrayerTimes } from "./components/PrayerTimes";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { Navigation } from "./components/Navigation";
import { Dhikr } from "./types/dhikr";
import "./index.css";

function App() {
  const [hasStarted, setHasStarted] = useState(() => {
    const saved = localStorage.getItem("hasStarted");
    return saved ? JSON.parse(saved) : false;
  });
  const [activeTab, setActiveTab] = useState("counter");
  const [selectedDhikr, setSelectedDhikr] = useState<Dhikr | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("hasStarted", JSON.stringify(hasStarted));
  }, [hasStarted]);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  const handleError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  if (!hasStarted) {
    return <WelcomeScreen onStart={() => setHasStarted(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "counter":
        return (
          <>
            <DhikrSelector
              selectedDhikr={selectedDhikr}
              onSelectDhikr={setSelectedDhikr}
            />
            <TasbehCounter
              selectedDhikr={selectedDhikr}
              onError={handleError}
            />
          </>
        );
      case "prayer":
        return <PrayerTimes />;
      case "qibla":
        return <QiblaCompass onError={handleError} />;
      case "calendar":
        return <HijriDate />;
      case "stats":
        return (
          <div className="card p-4">
            <h2 className="text-xl font-bold mb-4">Your Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Dhikr Count</span>
                <span className="font-bold">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Daily Average</span>
                <span className="font-bold">123</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Current Streak</span>
                <span className="font-bold">7 days</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <div className="container mx-auto px-4 py-4">{renderContent()}</div>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {error && <div className="error-message animate-fade-in">{error}</div>}
    </div>
  );
}

export default App;
