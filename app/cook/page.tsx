"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { type Recipe } from "@/app/types";
import IngredientDrawer from "@/app/components/IngredientDrawer";
import PreferencesPicker from "@/app/components/PreferencesPicker";
import CookingLoader from "@/app/components/CookingLoader";
import RecipeCarousel from "@/app/components/RecipeCarousel";

const STORAGE_KEY = "grubhub-pantry";

const STEPS = ["Ingredients", "Preferences", "Cooking", "Recipes"];

const CHIP_COLORS = [
  "bg-yellow",
  "bg-pink",
  "bg-green",
  "bg-purple",
  "bg-blue",
  "bg-lime",
];

export default function CookPage() {
  const [step, setStep] = useState(0);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setIngredients(JSON.parse(stored));
    }
    setMounted(true);
  }, []);

  function persistIngredients(next: string[]) {
    setIngredients(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function handleAddIngredient(ingredient: string) {
    if (!ingredients.includes(ingredient)) {
      persistIngredients([...ingredients, ingredient]);
    }
  }

  function handleRemoveIngredient(ingredient: string) {
    persistIngredients(ingredients.filter((i) => i !== ingredient));
  }

  function handleTogglePreference(pref: string) {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref],
    );
  }

  const fetchRecipes = useCallback(async () => {
    setStep(2);
    setError(null);
    setRecipes([]);

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, preferences }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setStep(1);
        return;
      }

      setRecipes(data.recipes);
      setStep(3);
    } catch {
      setError("Failed to fetch recipes. Please try again.");
      setStep(1);
    }
  }, [ingredients, preferences]);

  function handleStartOver() {
    setStep(0);
    setRecipes([]);
    setError(null);
    setPreferences([]);
  }

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-dvh bg-grid">
      {/* Top bar */}
      {step < 3 && (
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <Link
            href="/"
            className="btn-brutal inline-flex items-center gap-2 rounded-xl border-2 border-border bg-card px-3 py-1.5 text-sm font-bold shadow-brutal-sm"
          >
            &larr;
          </Link>

          {/* Step indicator */}
          <div className="flex items-center gap-2">
            {STEPS.slice(0, 3).map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border-2 border-border text-xs font-black ${
                    i === step
                      ? "bg-accent text-white"
                      : i < step
                        ? "bg-green text-text-primary"
                        : "bg-card text-text-secondary"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                {i < 2 && (
                  <div
                    className={`h-0.5 w-4 ${i < step ? "bg-green" : "bg-border/20"}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="w-10" />
        </div>
      )}

      {/* Step content */}
      <div className="flex-1 flex flex-col px-5 py-6">
        {/* Step 1: Ingredients */}
        {step === 0 && (
          <div className="flex flex-1 flex-col gap-6 max-w-md mx-auto w-full">
            <div className="text-center">
              <h1 className="text-2xl font-black text-text-primary">
                What&apos;s in your kitchen? 🛒
              </h1>
              <p className="mt-1 text-sm font-medium text-text-secondary">
                Add whatever you&apos;ve got
              </p>
            </div>

            {/* Ingredient chips */}
            {ingredients.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {ingredients.map((ingredient, i) => (
                  <button
                    key={ingredient}
                    onClick={() => handleRemoveIngredient(ingredient)}
                    className={`chip-brutal rounded-xl border-2 border-border ${CHIP_COLORS[i % CHIP_COLORS.length]} px-4 py-2.5 text-sm font-bold text-text-primary shadow-brutal-sm`}
                  >
                    {ingredient}
                    <span className="ml-2 opacity-50">&times;</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border-3 border-dashed border-border/25 px-6 py-10 text-center">
                <p className="text-3xl mb-2">🧑‍🍳</p>
                <p className="text-text-secondary text-sm font-bold">
                  Tap below to add ingredients
                </p>
              </div>
            )}

            <div className="mt-auto flex flex-col gap-3">
              <IngredientDrawer
                ingredients={ingredients}
                onAdd={handleAddIngredient}
                onRemove={handleRemoveIngredient}
              />
              {ingredients.length > 0 && (
                <button
                  onClick={() => setStep(1)}
                  className="btn-brutal w-full rounded-xl border-3 border-border bg-accent py-4 font-black text-white text-lg shadow-brutal-lg"
                >
                  Next: Preferences &rarr;
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Preferences */}
        {step === 1 && (
          <div className="flex flex-1 flex-col gap-6 max-w-md mx-auto w-full">
            <div className="text-center">
              <h1 className="text-2xl font-black text-text-primary">
                Any preferences? 🎯
              </h1>
              <p className="mt-1 text-sm font-medium text-text-secondary">
                Optional — skip if you&apos;re down for anything
              </p>
            </div>

            {error && (
              <div className="rounded-xl border-3 border-border bg-pink/30 px-5 py-3 text-sm font-bold text-text-primary">
                {error}
              </div>
            )}

            <PreferencesPicker
              selected={preferences}
              onToggle={handleTogglePreference}
            />

            <div className="mt-auto flex flex-col gap-3">
              <button
                onClick={fetchRecipes}
                className="btn-brutal w-full rounded-xl border-3 border-border bg-accent py-4 font-black text-white text-lg shadow-brutal-lg"
              >
                Find Recipes 🍽️
              </button>
              <button
                onClick={() => setStep(0)}
                className="w-full py-2 text-sm font-bold text-text-secondary"
              >
                &larr; Back to ingredients
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Loading */}
        {step === 2 && (
          <div className="flex flex-1 items-center justify-center max-w-md mx-auto w-full">
            <CookingLoader />
          </div>
        )}

        {/* Step 4: Recipes */}
        {step === 3 && (
          <div className="flex-1 max-w-md mx-auto w-full -mx-5 px-0">
            <RecipeCarousel recipes={recipes} onStartOver={handleStartOver} />
          </div>
        )}
      </div>
    </div>
  );
}
