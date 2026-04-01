"use client";

const PREFERENCES = [
  { label: "High Protein", emoji: "💪" },
  { label: "Low Fat", emoji: "🥗" },
  { label: "Low Carb", emoji: "🥩" },
  { label: "Quick (< 30 min)", emoji: "⚡" },
  { label: "Vegetarian", emoji: "🌱" },
  { label: "Spicy", emoji: "🌶️" },
  { label: "Budget Friendly", emoji: "💰" },
  { label: "Kid Friendly", emoji: "👶" },
];

interface PreferencesPickerProps {
  selected: string[];
  onToggle: (pref: string) => void;
}

export default function PreferencesPicker({
  selected,
  onToggle,
}: PreferencesPickerProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {PREFERENCES.map(({ label, emoji }) => {
        const active = selected.includes(label);
        return (
          <button
            key={label}
            onClick={() => onToggle(label)}
            className={`btn-brutal flex items-center gap-2 rounded-xl border-3 border-border px-4 py-3 text-left text-sm font-bold transition-colors ${
              active
                ? "bg-accent text-white shadow-none translate-x-[2px] translate-y-[2px]"
                : "bg-card text-text-primary shadow-brutal-sm"
            }`}
          >
            <span className="text-lg">{emoji}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
