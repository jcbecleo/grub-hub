export interface RecipeIngredient {
  name: string;
  inPantry: boolean;
}

export interface Recipe {
  name: string;
  cookTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: RecipeIngredient[];
  steps: string[];
}
