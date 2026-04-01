"use client";

import { useState, useEffect } from "react";

const MESSAGES = [
  { text: "Raiding the pantry...", emoji: "🗄️" },
  { text: "Chopping ingredients...", emoji: "🔪" },
  { text: "Asking the AI chef...", emoji: "🤖" },
  { text: "Tasting for flavor...", emoji: "👅" },
  { text: "Plating up...", emoji: "🍽️" },
];

export default function CookingLoader() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2000);

    const progInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 90));
    }, 200);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progInterval);
    };
  }, []);

  const current = MESSAGES[index];

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16">
      {/* Emoji */}
      <span className="text-6xl animate-pop-in" key={index}>
        {current.emoji}
      </span>

      {/* Message */}
      <p className="text-lg font-black text-text-primary animate-slide-up" key={`msg-${index}`}>
        {current.text}
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-xs rounded-full border-3 border-border bg-card h-5 overflow-hidden shadow-brutal-sm">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">
        This might take a few seconds
      </p>
    </div>
  );
}
