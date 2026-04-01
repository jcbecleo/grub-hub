"use client";

import { useRef, useState, useEffect } from "react";
import { type Recipe } from "@/app/types";
import RecipeCard from "@/app/components/RecipeCard";

interface RecipeCarouselProps {
  recipes: Recipe[];
  onStartOver: () => void;
}

export default function RecipeCarousel({
  recipes,
  onStartOver,
}: RecipeCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) setActiveIndex(index);
          }
        }
      },
      { root: container, threshold: 0.6 },
    );

    const cards = container.querySelectorAll("[data-index]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [recipes]);

  return (
    <div className="flex flex-col h-full">
      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 py-3">
        {recipes.map((_, i) => (
          <div
            key={i}
            className={`h-2.5 rounded-full border-2 border-border transition-all duration-200 ${
              i === activeIndex ? "w-8 bg-accent" : "w-2.5 bg-card"
            }`}
          />
        ))}
      </div>

      {/* Snap scroll container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto snap-y snap-mandatory"
      >
        {recipes.map((recipe, i) => (
          <div
            key={i}
            data-index={i}
            className="snap-start min-h-full flex flex-col justify-center px-1 py-4"
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}

        {/* Start over card */}
        <div className="snap-start min-h-full flex flex-col items-center justify-center gap-5 px-1 py-4">
          <p className="text-4xl">🔄</p>
          <p className="text-lg font-black text-text-primary">
            Want different recipes?
          </p>
          <button
            onClick={onStartOver}
            className="btn-brutal rounded-xl border-3 border-border bg-accent px-8 py-4 font-black text-white text-base shadow-brutal-lg"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
