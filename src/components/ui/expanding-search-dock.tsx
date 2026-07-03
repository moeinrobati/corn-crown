"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/lib/data";

type ExpandingSearchDockProps = {
  onSearch?: (query: string) => void;
  placeholder?: string;
};

export function ExpandingSearchDock({
  onSearch,
  placeholder = "Search products...",
}: ExpandingSearchDockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof products>([]);
  const router = useRouter();

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setQuery("");
    setResults([]);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(value.toLowerCase()) ||
          p.category.toLowerCase().includes(value.toLowerCase()) ||
          p.description.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && query) {
      onSearch(query);
    }
  };

  const handleSelect = (id: string) => {
    handleCollapse();
    router.push(`/products/${id}`);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="icon"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleExpand}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#EEEEEE]/70 hover:text-[#FFBF00] transition-colors hover:bg-white/5"
          >
            <Search className="h-5 w-5" />
          </motion.button>
        ) : (
          <motion.div
            key="input"
            initial={{ width: 48, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 48, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="relative"
          >
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(12px)" }}
              className="relative flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-black/80 backdrop-blur-md"
            >
              <div className="ml-4">
                <Search className="h-4 w-4 text-[#EEEEEE]/40" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={placeholder}
                autoFocus
                className="h-10 flex-1 bg-transparent pr-4 text-sm text-[#EEEEEE] outline-none placeholder:text-[#EEEEEE]/40"
              />
              <motion.button
                type="button"
                onClick={handleCollapse}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mr-2 flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
              >
                <X className="h-4 w-4 text-[#EEEEEE]/70" />
              </motion.button>
            </motion.div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-xl max-h-[300px] overflow-y-auto"
                >
                  {results.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelect(product.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#EEEEEE]">
                          {product.name}
                        </p>
                        <p className="text-xs text-[#EEEEEE]/60">
                          {product.category}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-[#FFBF00]">
                        ${product.price.toFixed(2)}
                      </p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* No Results */}
            <AnimatePresence>
              {query && results.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-lg border border-white/10 rounded-2xl p-4 text-center"
                >
                  <p className="text-sm text-[#EEEEEE]/60">No products found</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
