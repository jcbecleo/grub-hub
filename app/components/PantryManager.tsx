"use client";

import { useState, useEffect, FormEvent } from "react";

const STORAGE_KEY = "grubhub-pantry";

const CHIP_COLORS = [
  "bg-yellow",
  "bg-pink",
  "bg-green",
  "bg-purple",
  "bg-blue",
];

function getChipColor(index: number) {
  return CHIP_COLORS[index % CHIP_COLORS.length];
}

export default function PantryManager() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setIngredients(JSON.parse(stored));
    }
    setMounted(true);
  }, []);

  function persist(next: string[]) {
    setIngredients(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (!trimmed || ingredients.includes(trimmed)) {
      setInput("");
      return;
    }
    persist([...ingredients, trimmed]);
    setInput("");
  }

  function handleRemove(ingredient: string) {
    persist(ingredients.filter((i) => i !== ingredient));
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Input */}
      <form onSubmit={handleAdd} className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. chicken, garlic, soy sauce..."
          className="flex-1 rounded-xl border-3 border-border bg-bg px-4 py-3.5 text-text-primary font-medium placeholder:text-text-secondary/50 outline-none shadow-brutal-sm focus:shadow-brutal focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-100"
        />
        <button
          type="submit"
          className="btn-brutal rounded-xl border-3 border-border bg-accent px-5 py-3.5 font-bold text-white shadow-brutal-sm"
        >
          Add
        </button>
      </form>

      {/* Ingredient chips */}
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2.5">
          {ingredients.map((ingredient, i) => (
            <button
              key={ingredient}
              onClick={() => handleRemove(ingredient)}
              className={`chip-brutal animate-pop-in rounded-xl border-2 border-border ${getChipColor(i)} px-3.5 py-2 text-sm font-bold text-text-primary shadow-brutal-sm`}
            >
              {ingredient}
              <span className="ml-1.5 opacity-60">&times;</span>
            </button>
          ))}
        </div>
      )}

      {/* Empty state */}
      {ingredients.length === 0 && (
        <div className="animate-slide-up rounded-xl border-2 border-dashed border-border/30 px-6 py-8 text-center">
          <p className="text-4xl mb-3">🧑‍🍳</p>
          <p className="text-text-secondary text-sm font-medium">
            Your pantry is empty! Add some ingredients to get started.
          </p>
        </div>
      )}

      {/* Find Recipes button */}
      {ingredients.length > 0 && (
        <button className="btn-brutal animate-slide-up mt-1 w-full rounded-xl border-3 border-border bg-accent py-4 font-black text-white text-lg shadow-brutal-lg">
          Find Recipes 🍽️
        </button>
      )}
    </div>
  );
}
