import { useState, useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import { Dhikr } from "../types/dhikr";

interface TasbehCounterProps {
  selectedDhikr: Dhikr | null;
  onError: (message: string) => void;
}

export function TasbehCounter({ selectedDhikr, onError }: TasbehCounterProps) {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("tasbehCount");
    return savedCount ? parseInt(savedCount) : 0;
  });
  const [cycles, setCycles] = useState(() => {
    const savedCycles = localStorage.getItem("cycles");
    return savedCycles ? parseInt(savedCycles) : 0;
  });

  useEffect(() => {
    localStorage.setItem("tasbehCount", count.toString());
    localStorage.setItem("cycles", cycles.toString());
  }, [count, cycles]);

  const incrementCount = () => {
    if (!selectedDhikr) {
      onError("Please select a dhikr first");
      return;
    }

    const newCount = count + 1;
    setCount(newCount);

    if (newCount >= selectedDhikr.targetCount) {
      setCount(0);
      setCycles((prev) => prev + 1);
      if (WebApp.HapticFeedback) {
        WebApp.HapticFeedback.notificationOccurred("success");
      }
    } else {
      if (WebApp.HapticFeedback) {
        WebApp.HapticFeedback.impactOccurred("light");
      }
    }
  };

  const resetCount = () => {
    if (window.confirm("Are you sure you want to reset the count?")) {
      setCount(0);
      setCycles(0);
    }
  };

  return (
    <div className="card p-4 mt-4">
      <div className="text-center mb-6">
        <h1 className="text-6xl font-bold text-primary">{count}</h1>
        {selectedDhikr && (
          <div className="mt-2 text-gray-600 dark:text-gray-400">
            <p>Target: {selectedDhikr.targetCount}</p>
            <p>Cycles: {cycles}</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <button
          onClick={incrementCount}
          className="btn btn-primary w-full py-4 text-xl"
        >
          Tap to Count
        </button>

        <button onClick={resetCount} className="btn btn-secondary w-full">
          Reset
        </button>
      </div>
    </div>
  );
}
