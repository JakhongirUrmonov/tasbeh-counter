import { useState, useEffect } from "react";

interface PrayerTime {
  name: string;
  time: string;
  isNext: boolean;
}

export function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setIsLoading(true);
        // Get user's location
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const date = new Date();
            const formattedDate = `${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`;

            // Using Aladhan API
            const response = await fetch(
              `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${latitude}&longitude=${longitude}&method=2`
            );

            if (!response.ok) {
              throw new Error("Failed to fetch prayer times");
            }

            const data = await response.json();
            const timings = data.data.timings;

            const currentTime = new Date();
            const formattedPrayerTimes: PrayerTime[] = [
              { name: "Fajr", time: timings.Fajr, isNext: false },
              { name: "Sunrise", time: timings.Sunrise, isNext: false },
              { name: "Dhuhr", time: timings.Dhuhr, isNext: false },
              { name: "Asr", time: timings.Asr, isNext: false },
              { name: "Maghrib", time: timings.Maghrib, isNext: false },
              { name: "Isha", time: timings.Isha, isNext: false },
            ];

            // Find the next prayer
            const nextPrayerIndex = formattedPrayerTimes.findIndex((prayer) => {
              const [hours, minutes] = prayer.time.split(":");
              const prayerTime = new Date();
              prayerTime.setHours(parseInt(hours), parseInt(minutes), 0);
              return prayerTime > currentTime;
            });

            if (nextPrayerIndex !== -1) {
              formattedPrayerTimes[nextPrayerIndex].isNext = true;
            }

            setPrayerTimes(formattedPrayerTimes);
            setIsLoading(false);
          },
          (error) => {
            setError("Error getting location: " + error.message);
            setIsLoading(false);
          }
        );
      } catch (error) {
        setError("Error fetching prayer times: " + (error as Error).message);
        setIsLoading(false);
      }
    };

    fetchPrayerTimes();
    // Update prayer times every minute
    const interval = setInterval(fetchPrayerTimes, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="prayer-times loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="prayer-times error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="prayer-times">
      <h3>Prayer Times</h3>
      <div className="prayer-times-grid">
        {prayerTimes.map((prayer, index) => (
          <div
            key={index}
            className={`prayer-time ${prayer.isNext ? "next-prayer" : ""}`}
          >
            <span className="prayer-name">{prayer.name}</span>
            <span className="prayer-time-value">{prayer.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
