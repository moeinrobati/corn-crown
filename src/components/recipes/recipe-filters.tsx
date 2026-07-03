"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { filterCategories, difficultyFilters, timeFilters, tagFilters } from "@/lib/recipes-data";

interface RecipeFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (d: string) => void;
  selectedTime: string;
  setSelectedTime: (t: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
}

export default function RecipeFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedTime,
  setSelectedTime,
  selectedTags,
  toggleTag,
}: RecipeFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const categoryEmojis: Record<string, string> = {
    All: "\u2728",
    "Street Corn": "\ud83c\udf3d",
    Popcorn: "\ud83c\udf7f",
    Salads: "\ud83e\udd57",
    Soups: "\ud83c\udf72",
    Mexican: "\ud83c\udf2e",
    "Main Dishes": "\ud83c\udf55",
    Bakery: "\ud83c\udf5e",
    Desserts: "\ud83c\udf70",
    Drinks: "\ud83e\uddc3",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFBF00]/20 via-transparent to-[#FFBF00]/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-sm">
            <Search className="w-5 h-5 text-[#EEEEEE]/40 ml-5" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-4 bg-transparent text-[#EEEEEE] placeholder:text-[#EEEEEE]/30 outline-none text-sm"
            />
            {searchQuery && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => setSearchQuery("")}
                className="mr-4 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-[#EEEEEE]/60" />
              </motion.button>
            )}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`mr-3 p-2.5 rounded-xl transition-all duration-300 ${
                showAdvanced
                  ? "bg-[#FFBF00] text-black"
                  : "bg-white/5 text-[#EEEEEE]/60 hover:bg-white/10"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {filterCategories.map((category, i) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            onClick={() => setSelectedCategory(category)}
            className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "text-black"
                : "text-[#EEEEEE]/70 hover:text-[#EEEEEE] bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12]"
            }`}
          >
            {selectedCategory === category && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-[#FFBF00] rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{categoryEmojis[category]}</span>
            <span className="relative z-10">{category}</span>
          </motion.button>
        ))}
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="max-w-3xl mx-auto p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Difficulty */}
                <div>
                  <label className="text-xs font-medium text-[#EEEEEE]/40 uppercase tracking-wider mb-3 block">
                    Difficulty
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {difficultyFilters.map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          selectedDifficulty === diff
                            ? "bg-[#FFBF00] text-black"
                            : "bg-white/5 text-[#EEEEEE]/60 hover:bg-white/10 border border-white/[0.06]"
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cooking Time */}
                <div>
                  <label className="text-xs font-medium text-[#EEEEEE]/40 uppercase tracking-wider mb-3 block">
                    Cooking Time
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {timeFilters.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          selectedTime === time
                            ? "bg-[#FFBF00] text-black"
                            : "bg-white/5 text-[#EEEEEE]/60 hover:bg-white/10 border border-white/[0.06]"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-xs font-medium text-[#EEEEEE]/40 uppercase tracking-wider mb-3 block">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tagFilters.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          selectedTags.includes(tag)
                            ? "bg-[#FFBF00] text-black"
                            : "bg-white/5 text-[#EEEEEE]/60 hover:bg-white/10 border border-white/[0.06]"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reset button */}
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex justify-end">
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedDifficulty("All");
                    setSelectedTime("All");
                    toggleTag("Popular");
                    toggleTag("New");
                    toggleTag("Vegetarian");
                    toggleTag("Healthy");
                    setSearchQuery("");
                  }}
                  className="text-xs text-[#EEEEEE]/40 hover:text-[#FFBF00] transition-colors"
                >
                  Reset all filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
