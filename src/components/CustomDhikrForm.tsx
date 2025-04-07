import { useState } from "react";
import { Dhikr } from "../types/dhikr";
import WebApp from "@twa-dev/sdk";

interface CustomDhikrFormProps {
  onAdd: (dhikr: Dhikr) => void;
  onClose: () => void;
}

export function CustomDhikrForm({ onAdd, onClose }: CustomDhikrFormProps) {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [targetCount, setTargetCount] = useState(33);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim() || !translation.trim()) {
      if (WebApp.HapticFeedback) {
        WebApp.HapticFeedback.notificationOccurred("error");
      }
      return;
    }

    const newDhikr: Dhikr = {
      id: `custom-${Date.now()}`,
      name: text.trim(),
      arabic: translation.trim(),
      targetCount,
      isCustom: true,
    };

    onAdd(newDhikr);
    if (WebApp.HapticFeedback) {
      WebApp.HapticFeedback.notificationOccurred("success");
    }
    onClose();
  };

  return (
    <div className="custom-dhikr-form">
      <h3>Add Custom Dhikr</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Arabic Text</label>
          <input
            id="text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter Arabic text"
            required
            dir="rtl"
          />
        </div>

        <div className="form-group">
          <label htmlFor="translation">Translation</label>
          <input
            id="translation"
            type="text"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            placeholder="Enter translation"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="targetCount">Target Count</label>
          <input
            id="targetCount"
            type="number"
            value={targetCount}
            onChange={(e) => setTargetCount(parseInt(e.target.value) || 33)}
            min="1"
            max="1000"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Add Dhikr
          </button>
        </div>
      </form>
    </div>
  );
}
