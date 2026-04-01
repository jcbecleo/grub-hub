"use client";

import { useState, useRef, FormEvent } from "react";
import { Drawer } from "vaul";

const CHIP_COLORS = [
  "bg-yellow",
  "bg-pink",
  "bg-green",
  "bg-purple",
  "bg-blue",
  "bg-lime",
];

interface IngredientDrawerProps {
  ingredients: string[];
  onAdd: (ingredient: string) => void;
  onRemove: (ingredient: string) => void;
}

export default function IngredientDrawer({
  ingredients,
  onAdd,
  onRemove,
}: IngredientDrawerProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (!trimmed || ingredients.includes(trimmed)) {
      if (!trimmed) return;
      inputRef.current?.classList.add("animate-shake");
      setTimeout(() => inputRef.current?.classList.remove("animate-shake"), 400);
      setInput("");
      return;
    }
    onAdd(trimmed);
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button className="btn-brutal w-full rounded-xl border-3 border-border bg-card px-5 py-4 font-black text-text-primary text-base shadow-brutal">
          Add Ingredients +
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl border-t-3 border-x-3 border-border bg-card">
          <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-border/30" />
          <div className="flex flex-col gap-4 p-5 pb-8 max-h-[70vh] overflow-y-auto">
            <Drawer.Title className="text-lg font-black text-text-primary">
              Add Ingredients
            </Drawer.Title>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="chicken, garlic, soy sauce..."
                autoFocus
                className="flex-1 rounded-xl border-3 border-border bg-bg px-4 py-3 text-text-primary font-bold placeholder:text-text-secondary/40 placeholder:font-medium outline-none shadow-brutal-sm focus:shadow-brutal focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all duration-100"
              />
              <button
                type="submit"
                className="btn-brutal rounded-xl border-3 border-border bg-accent px-5 py-3 font-black text-white shadow-brutal-sm"
              >
                Add
              </button>
            </form>

            {/* Current chips */}
            {ingredients.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, i) => (
                  <button
                    key={ingredient}
                    onClick={() => onRemove(ingredient)}
                    className={`chip-brutal rounded-xl border-2 border-border ${CHIP_COLORS[i % CHIP_COLORS.length]} px-3.5 py-2 text-sm font-bold text-text-primary shadow-brutal-sm`}
                  >
                    {ingredient}
                    <span className="ml-1.5 opacity-50">&times;</span>
                  </button>
                ))}
              </div>
            )}

            {ingredients.length === 0 && (
              <p className="text-sm font-medium text-text-secondary text-center py-4">
                Type an ingredient and tap Add
              </p>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
