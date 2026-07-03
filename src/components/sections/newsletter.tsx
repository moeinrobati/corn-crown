"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/i18n";

export default function Newsletter() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#467235]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="text-sm font-semibold text-[#FFBF00] uppercase tracking-wider">
            {t("stayConnected")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {t("joinTheHarvest")}
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {t("newsletterDesc")}
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder={t("enterYourEmail")}
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#FFBF00] focus:ring-[#FFBF00]"
            />
            <button
              type="submit"
              className="px-8 py-2 bg-[#FFBF00] text-black font-semibold rounded-full hover:bg-[#FFBF00]/90 transition-colors"
            >
              {t("subscribe")}
            </button>
          </form>
          <p className="text-sm text-white/50">
            {t("noSpam")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
