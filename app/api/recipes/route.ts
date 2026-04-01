import { gemini } from "@/app/lib/gemini";
import { type Recipe } from "@/app/types";

export async function POST(request: Request) {
  const body = await request.json();
  const ingredients: string[] = body.ingredients;
  const preferences: string[] = body.preferences || [];

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return Response.json(
      { error: "At least one ingredient is required." },
      { status: 400 },
    );
  }

  const preferenceLine =
    preferences.length > 0
      ? `\nThe user has these dietary preferences: ${preferences.join(", ")}. Prioritize recipes that match these preferences.`
      : "";

  const prompt = `You are a helpful recipe assistant.

  The user has these ingredients in their pantry:
  ${ingredients.join(", ")}${preferenceLine}

  Suggest 3 recipes they can make. For each recipe return:
  - name
  - cookTime (e.g. "25 min")
  - difficulty ("Easy", "Medium", or "Hard")
  - ingredients: an array of { name, inPantry } where inPantry is true if the user already has it, false if they'd need to buy it
  - steps: an array of step-by-step instructions as strings

  Return ONLY a JSON array of 3 recipe objects. No extra text, no markdown, no code fences.`;

  const result = await gemini.generateContent(prompt);
  const text = result.response.text();

  // Strip any markdown code fences the model might add
  const cleaned = text
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();

  let recipes: Recipe[];
  try {
    recipes = JSON.parse(cleaned);
  } catch {
    return Response.json(
      { error: "Failed to parse recipe response." },
      { status: 500 },
    );
  }

  return Response.json({ recipes });
}
