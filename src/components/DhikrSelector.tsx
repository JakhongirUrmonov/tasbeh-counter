import { useState } from "react";
import { Dhikr, DEFAULT_DHIKR_LIST } from "../types/dhikr";

interface DhikrSelectorProps {
  selectedDhikr: Dhikr | null;
  onSelectDhikr: (dhikr: Dhikr) => void;
}

export function DhikrSelector({
  selectedDhikr,
  onSelectDhikr,
}: DhikrSelectorProps) {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customDhikr, setCustomDhikr] = useState<Partial<Dhikr>>({
    name: "",
    arabic: "",
    targetCount: 33,
  });

  const handleAddCustomDhikr = () => {
    if (!customDhikr.name || !customDhikr.arabic) {
      return;
    }

    const newDhikr: Dhikr = {
      id: Date.now().toString(),
      name: customDhikr.name,
      arabic: customDhikr.arabic,
      targetCount: customDhikr.targetCount || 33,
    };

    onSelectDhikr(newDhikr);
    setShowCustomForm(false);
    setCustomDhikr({ name: "", arabic: "", targetCount: 33 });
  };

  return (
    <div className="card p-3">
      <h2 className="text-xl font-bold mb-2">Select Dhikr</h2>

      <div className="space-y-2">
        {DEFAULT_DHIKR_LIST.map((dhikr) => (
          <button
            key={dhikr.id}
            onClick={() => onSelectDhikr(dhikr)}
            className={`w-full text-left p-2 rounded-lg btn-secondary transition-colors ${
              selectedDhikr?.id === dhikr.id
                ? "bg-primary/10 text-primary dark:bg-primary/20"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <div className="font-bold">{dhikr.name}</div>
            <div className="text-2xl text-right">{dhikr.arabic}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Target: {dhikr.targetCount}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowCustomForm(true)}
        className="mt-4 w-full btn btn-secondary"
      >
        Add Custom Dhikr
      </button>

      {showCustomForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="card w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add Custom Dhikr</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={customDhikr.name}
                  onChange={(e) =>
                    setCustomDhikr({ ...customDhikr, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., SubhanAllah"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Arabic</label>
                <input
                  type="text"
                  value={customDhikr.arabic}
                  onChange={(e) =>
                    setCustomDhikr({ ...customDhikr, arabic: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg text-right"
                  placeholder="e.g., سُبْحَانَ اللَّهِ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Target Count
                </label>
                <input
                  type="number"
                  value={customDhikr.targetCount}
                  onChange={(e) =>
                    setCustomDhikr({
                      ...customDhikr,
                      targetCount: parseInt(e.target.value),
                    })
                  }
                  className="w-full p-2 border rounded-lg"
                  min="1"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowCustomForm(false)}
                className="btn flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomDhikr}
                className="btn btn-primary flex-1"
                disabled={!customDhikr.name || !customDhikr.arabic}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
