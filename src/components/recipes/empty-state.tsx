"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

export default function EmptyState({ query }: { query?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.06] mb-6"
      >
        <SearchX className="w-10 h-10 text-[#EEEEEE]/30" />
      </motion.div>
      <h3 className="text-xl font-bold text-[#EEEEEE] mb-2">No recipes found</h3>
      <p className="text-[#EEEEEE]/50 max-w-md mx-auto">
        {query
          ? `We couldn't find any recipes matching "${query}". Try adjusting your search or filters.`
          : "No recipes match your current filters. Try changing your selection."}
      </p>
    </motion.div>
  );
}
