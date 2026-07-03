import { notFound } from "next/navigation";
import { recipeCategories, allRecipes } from "@/lib/recipes-data";
import RecipeDetailClient from "./recipe-detail-client";

export function generateStaticParams() {
  return allRecipes.map((recipe) => ({ id: recipe.id }));
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = allRecipes.find((r) => r.id === id);

  if (!recipe) {
    notFound();
  }

  const relatedRecipes = allRecipes
    .filter((r) => r.category === recipe.category && r.id !== recipe.id)
    .slice(0, 4);

  return (
    <RecipeDetailClient recipe={recipe} relatedRecipes={relatedRecipes} />
  );
}
