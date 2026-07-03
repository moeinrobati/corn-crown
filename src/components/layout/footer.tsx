"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    products: [
      { href: "/products?category=Sweet+Corn", label: t("sweetCorn") },
      { href: "/products?category=Popcorn", label: t("popcorn") },
      { href: "/products?category=Corn+Flour", label: t("cornFlour") },
      { href: "/products?category=Specialty", label: t("specialty") },
    ],
    company: [
      { href: "/about", label: t("ourStoryLink") },
      { href: "/contact", label: t("contact") },
      { href: "/about#story", label: t("ourStory") },
      { href: "/about#sustainability", label: t("sustainability") },
    ],
    support: [
      { href: "/contact", label: t("helpCenter") },
      { href: "/contact", label: t("shippingInfo") },
      { href: "/contact", label: t("returns") },
      { href: "/contact", label: t("wholesale") },
    ],
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center ">
              <img src="/logo.png" alt="Corn Crown" className="h-15 w-auto" />
            </div>
            <p className="text-sm text-[#EEEEEE]/60 max-w-xs">
              {t("fromFieldToTable")}
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-[#FFBF00] uppercase tracking-wider mb-4">
              {t("products")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#EEEEEE]/60 hover:text-[#FFBF00] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-[#FFBF00] uppercase tracking-wider mb-4">
              {t("company")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#EEEEEE]/60 hover:text-[#FFBF00] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-[#FFBF00] uppercase tracking-wider mb-4">
              {t("support")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#EEEEEE]/60 hover:text-[#FFBF00] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#EEEEEE]/40">
            © {new Date().getFullYear()} Corn Crown. {t("allRightsReserved")}
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-[#EEEEEE]/40 hover:text-[#FFBF00] transition-colors"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href="#"
              className="text-sm text-[#EEEEEE]/40 hover:text-[#FFBF00] transition-colors"
            >
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
