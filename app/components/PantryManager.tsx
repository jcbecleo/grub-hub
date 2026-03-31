"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

const STORAGE_KEY = "grubhub-pantry";

const CHIP_COLORS = [
  "bg-yellow",
  "bg-pink",
  "bg-green",
  "bg-purple",
  "bg-blue",
  "bg-lime",
];

function getChipColor(index: number) {
  return CHIP_COLORS[index % CHIP_COLORS.length];
}

export default function PantryManager() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      if (!trimmed) return;
      inputRef.current?.classList.add("animate-shake");
      setTimeout(() => inputRef.current?.classList.remove("animate-shake"), 400);
      setInput("");
      return;
    }
    persist([...ingredients, trimmed]);
    setJustAdded(trimmed);
    setTimeout(() => setJustAdded(null), 400);
    setInput("");
  }

  function handleRemove(ingredient: string) {
    persist(ingredients.filter((i) => i !== ingredient));
  }

  if (!mounted) {
    return (
      <div className="flex flex-col gap-4">
        <div className="h-14 rounded-xl border-3 border-border/20 bg-bg" />
        <div className="h-24 rounded-xl border-2 border-dashed border-border/20" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Input */}
      <form onSubmit={handleAdd} className="flex gap-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="chicken, garlic, soy sauce..."
          className="flex-1 rounded-xl border-3 border-border bg-bg px-4 py-3.5 text-text-primary font-bold placeholder:text-text-secondary/40 placeholder:font-medium outline-none shadow-brutal-sm focus:shadow-brutal focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-100"
        />
        <button
          type="submit"
          className="btn-brutal rounded-xl border-3 border-border bg-accent px-6 py-3.5 font-black text-white shadow-brutal-sm"
        >
          Add +
        </button>
      </form>

      {/* Ingredient count */}
      {ingredients.length > 0 && (
        <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">
          {ingredients.length} ingredient{ingredients.length !== 1 && "s"} ready
        </p>
      )}

      {/* Ingredient chips */}
      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2.5">
          {ingredients.map((ingredient, i) => (
            <button
              key={ingredient}
              onClick={() => handleRemove(ingredient)}
              className={`chip-brutal rounded-xl border-2 border-border ${getChipColor(i)} px-4 py-2.5 text-sm font-bold text-text-primary shadow-brutal-sm ${justAdded === ingredient ? "animate-pop-in" : ""}`}
            >
              {ingredient}
              <span className="ml-2 opacity-50">&times;</span>
            </button>
          ))}
        </div>
      )}

      {/* Empty state */}
      {ingredients.length === 0 && (
        <div className="animate-slide-up rounded-xl border-3 border-dashed border-border/25 px-6 py-10 text-center">
          <p className="text-3xl mb-2">🧑‍🍳</p>
          <p className="text-text-secondary text-sm font-bold">
            Your pantry is empty — start adding ingredients!
          </p>
        </div>
      )}

      {/* Find Recipes button */}
      {ingredients.length > 0 && (
        <button className="btn-brutal animate-slide-up mt-2 w-full rounded-xl border-3 border-border bg-accent py-4 font-black text-white text-lg shadow-brutal-lg">
          Find Recipes 🍽️
        </button>
      )}
    </div>
  );
}
