import WebApp from "@twa-dev/sdk";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: "counter", label: "Counter", icon: "🔢" },
    { id: "prayer", label: "Prayer", icon: "🕌" },
    { id: "qibla", label: "Qibla", icon: "🧭" },
    { id: "calendar", label: "Calendar", icon: "📅" },
    { id: "stats", label: "Stats", icon: "📊" },
  ];

  const handleShare = () => {
    const shareData = {
      title: "Tasbeh Counter",
      text: "Check out this amazing Tasbeh Counter app!",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      WebApp.showAlert("Please share this link: " + window.location.href);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}

        <button onClick={handleShare} className="nav-link">
          <span className="text-xl">📤</span>
          <span className="text-xs">Share</span>
        </button>
      </div>
    </nav>
  );
}
