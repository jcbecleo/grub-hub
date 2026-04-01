import { type Recipe } from "@/app/types";

const DIFFICULTY_COLORS: Record<Recipe["difficulty"], string> = {
  Easy: "bg-green",
  Medium: "bg-yellow",
  Hard: "bg-pink",
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="rounded-2xl border-3 border-border bg-card p-5 shadow-brutal sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-xl font-black text-text-primary leading-tight">
          {recipe.name}
        </h3>
        <span
          className={`shrink-0 rounded-lg border-2 border-border ${DIFFICULTY_COLORS[recipe.difficulty]} px-3 py-1 text-xs font-black uppercase shadow-brutal-sm`}
        >
          {recipe.difficulty}
        </span>
      </div>

      {/* Meta */}
      <p className="mb-4 text-sm font-bold text-text-secondary">
        {recipe.cookTime}
      </p>

      {/* Ingredients */}
      <div className="mb-4">
        <h4 className="mb-2 text-xs font-black uppercase tracking-widest text-text-secondary">
          Ingredients
        </h4>
        <ul className="flex flex-wrap gap-2">
          {recipe.ingredients.map((ing) => (
            <li
              key={ing.name}
              className={`rounded-lg border-2 border-border px-3 py-1.5 text-xs font-bold ${
                ing.inPantry
                  ? "bg-green/40 text-text-primary"
                  : "bg-pink/30 text-text-primary"
              }`}
            >
              {ing.inPantry ? "\u2713" : "+"} {ing.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div>
        <h4 className="mb-2 text-xs font-black uppercase tracking-widest text-text-secondary">
          Steps
        </h4>
        <ol className="flex flex-col gap-2">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 border-border bg-yellow text-xs font-black shadow-brutal-sm">
                {i + 1}
              </span>
              <span className="text-text-primary font-medium">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
