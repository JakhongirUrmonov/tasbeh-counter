import { useState, useEffect } from "react";
import { getHijriDate } from "../utils/hijriDate";

export function HijriDate() {
  const [hijriDate, setHijriDate] = useState("");

  useEffect(() => {
    setHijriDate(getHijriDate());

    // Update the date every minute
    const interval = setInterval(() => {
      setHijriDate(getHijriDate());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hijri-date">
      <span className="hijri-date-text">{hijriDate}</span>
    </div>
  );
}
