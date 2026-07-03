"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecipeHero from "@/components/recipes/recipe-hero";
import RecipeFilters from "@/components/recipes/recipe-filters";
import RecipeCard from "@/components/recipes/recipe-card";
import RecipeCategorySection from "@/components/recipes/recipe-category-section";
import ChefSpecials from "@/components/recipes/chef-specials";
import BackToTop from "@/components/recipes/back-to-top";
import EmptyState from "@/components/recipes/empty-state";
import { recipeCategories, allRecipes } from "@/lib/recipes-data";
import Emoji from "@/components/ui/emoji";

function parseTime(timeStr: string): number {
  return parseInt(timeStr.replace(/\D/g, ""), 10);
}

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTime, setSelectedTime] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const recipesRef = useRef<HTMLDivElement>(null);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "All" ||
    selectedDifficulty !== "All" ||
    selectedTime !== "All" ||
    selectedTags.length > 0;

  const filteredRecipes = useMemo(() => {
    if (!hasActiveFilters) return null;

    return allRecipes.filter((recipe) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          recipe.title.toLowerCase().includes(q) ||
          recipe.description.toLowerCase().includes(q) ||
          recipe.category.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (selectedCategory !== "All" && recipe.category !== selectedCategory) return false;

      if (selectedDifficulty !== "All" && recipe.difficulty !== selectedDifficulty) return false;

      if (selectedTime !== "All") {
        const mins = parseTime(recipe.cookingTime);
        if (selectedTime === "Under 15 min" && mins >= 15) return false;
        if (selectedTime === "15-30 min" && (mins < 15 || mins > 30)) return false;
        if (selectedTime === "30+ min" && mins <= 30) return false;
      }

      if (selectedTags.length > 0) {
        for (const tag of selectedTags) {
          if (tag === "Popular" && !recipe.isPopular) return false;
          if (tag === "New" && !recipe.isNew) return false;
          if (tag === "Vegetarian" && !recipe.isVegetarian) return false;
          if (tag === "Healthy" && !recipe.isHealthy) return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedTime, selectedTags, hasActiveFilters]);

  const filteredCategories = useMemo(() => {
    if (!hasActiveFilters) return recipeCategories;

    if (selectedCategory !== "All") {
      return recipeCategories.filter((cat) => cat.name === selectedCategory);
    }

    return recipeCategories
      .map((cat) => ({
        ...cat,
        recipes: cat.recipes.filter((recipe) => filteredRecipes?.some((r) => r.id === recipe.id)),
      }))
      .filter((cat) => cat.recipes.length > 0);
  }, [selectedCategory, filteredRecipes, hasActiveFilters]);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <RecipeHero />

      {/* Recipes Section */}
      <div id="recipes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters */}
        <RecipeFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          selectedTags={selectedTags}
          toggleTag={toggleTag}
        />

        {/* Results count */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <p className="text-sm text-[#EEEEEE]/40">
              Showing{" "}
              <span className="text-[#FFBF00] font-medium">
                {filteredRecipes?.length}
              </span>{" "}
              {filteredRecipes?.length === 1 ? "recipe" : "recipes"}
            </p>
          </motion.div>
        )}

        <div ref={recipesRef}>
          <AnimatePresence mode="wait">
            {hasActiveFilters ? (
              filteredRecipes && filteredRecipes.length > 0 ? (
                <motion.div
                  key="filtered"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Chef Specials (filtered) */}
                  {filteredRecipes.some((r) => r.isChefSpecial) && (
                    <section className="mb-16">
                      <div className="flex items-center gap-3 mb-8">
                        <Emoji size={28}>⭐</Emoji>
                        <h2 className="text-2xl font-bold text-[#EEEEEE]">Chef Specials</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filteredRecipes
                          .filter((r) => r.isChefSpecial)
                          .map((recipe, i) => (
                            <RecipeCard key={recipe.id} recipe={recipe} index={i} />
                          ))}
                      </div>
                    </section>
                  )}

                  {/* All filtered results */}
                  <section>
                    <div className="flex items-center gap-3 mb-8">
                      <Emoji size={28}>🍳</Emoji>
                      <h2 className="text-2xl font-bold text-[#EEEEEE]">All Recipes</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {filteredRecipes
                        .filter((r) => !r.isChefSpecial)
                        .map((recipe, i) => (
                          <RecipeCard key={recipe.id} recipe={recipe} index={i} />
                        ))}
                    </div>
                  </section>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EmptyState query={searchQuery} />
                </motion.div>
              )
            ) : (
              <motion.div
                key="all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Chef Specials */}
                <ChefSpecials />

                {/* Category Sections */}
                {recipeCategories.map((category, i) => (
                  <RecipeCategorySection key={category.id} category={category} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Back to Top */}
      <BackToTop />

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}

function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-0 bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 min-w-[200px]"
          >
            <div className="space-y-2">
              {[
                { icon: "🌽", label: "Street Corn", id: "street-corn" },
                { icon: "🍿", label: "Popcorn", id: "popcorn" },
                { icon: "🥗", label: "Salads", id: "salads" },
                { icon: "🍲", label: "Soups", id: "soups" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-[#EEEEEE]/80 hover:text-[#FFBF00]"
                >
                  <Emoji size={20}>{item.icon}</Emoji>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] flex items-center justify-center text-[#EEEEEE] hover:text-[#FFBF00] hover:border-[#FFBF00]/30 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <Emoji size={28}>🌽</Emoji>
      </motion.button>
    </div>
  );
}
