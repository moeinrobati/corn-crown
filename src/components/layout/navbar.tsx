"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Equal, X, ShoppingCart, User, Globe } from "lucide-react";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { ExpandingSearchDock } from "@/components/ui/expanding-search-dock";
import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage, languages } from "@/lib/i18n";
import { useCart } from "@/lib/cart-context";

export const Navbar = () => {
  const { currentLang, setLang, t } = useLanguage();
  const { totalItems } = useCart();
  const pathname = usePathname();
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [langOpen, setLangOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/chef-specials") return null;

  const menuItems = [
    { name: t("home"), href: "/" },
    { name: t("shop"), href: "/products" },
    { name: t("recipes"), href: "/recipes" },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
  ];

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed left-0 w-full z-50 px-4"
      >
        <div
          className={cn(
            "mx-auto mt-3 max-w-7xl px-6 transition-all duration-300 lg:px-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl",
            isScrolled && "bg-black/80 max-w-5xl mt-2 lg:px-6"
          )}
        >
          <div className="relative flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link
              href="/"
              aria-label="home"
              className="flex gap-2 items-center shrink-0"
            >
              <img src="/logo.png" alt="Corn Crown" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-[#FFBF00] tracking-tight leading-none">
                  Corn Crown
                </span>
                <span className="text-[9px] text-[#EEEEEE]/60 tracking-wider uppercase">
                  {t("premiumCorn")}
                </span>
              </div>
            </Link>

            {/* Desktop menu - center */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <ul className="flex gap-6 text-sm">
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block duration-150 px-2 py-1",
                          isActive
                            ? "text-[#FFBF00]"
                            : "text-[#EEEEEE]/70 hover:text-[#FFBF00]"
                        )}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right side icons - desktop */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* Search */}
              <ExpandingSearchDock />

              {/* Language switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 p-2.5 text-[#EEEEEE]/70 hover:text-[#FFBF00] transition-colors rounded-full hover:bg-white/5"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-xs">{currentLang.flag}</span>
                </button>

                {langOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-black/90 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden min-w-[160px] shadow-xl">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLang(lang);
                          setLangOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                          currentLang.code === lang.code
                            ? "bg-[#FFBF00]/20 text-[#FFBF00]"
                            : "text-[#EEEEEE]/70 hover:bg-white/10 hover:text-[#FFBF00]"
                        )}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 text-[#EEEEEE]/70 hover:text-[#FFBF00] transition-colors rounded-full hover:bg-white/5"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#FFBF00] text-black text-[10px] rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* User / Login */}
              <Link
                href="/auth/login"
                className="p-2.5 text-[#EEEEEE]/70 hover:text-[#FFBF00] transition-colors rounded-full hover:bg-white/5"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Divider */}
              <div className="w-px h-8 bg-white/10 mx-1" />

              {/* Shop Now CTA */}
              <Link href="/products">
                <LiquidGlassButton variant="primary" size="sm">
                  {t("shopNow")}
                </LiquidGlassButton>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              className="relative z-20 block cursor-pointer p-2.5 lg:hidden"
            >
              <Equal className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200 text-[#EEEEEE]" />
              <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 text-[#EEEEEE]" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "fixed inset-0 top-0 z-10 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center transition-all duration-300 lg:hidden",
            menuState
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          {/* Close button inside mobile menu */}
          <button
            onClick={() => setMenuState(false)}
            className="absolute top-6 right-6 p-2 text-[#EEEEEE] hover:text-[#FFBF00] transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <ul className="flex flex-col items-center gap-8 text-2xl">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuState(false)}
                    className={cn(
                      "duration-150",
                      isActive
                        ? "text-[#FFBF00]"
                        : "text-[#EEEEEE] hover:text-[#FFBF00]"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile icons */}
          <div className="flex items-center gap-6 mt-10">
            <Link
              href="/cart"
              onClick={() => setMenuState(false)}
              className="relative p-3 text-[#EEEEEE] hover:text-[#FFBF00] transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFBF00] text-black text-xs rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link
              href="/auth/login"
              onClick={() => setMenuState(false)}
              className="p-3 text-[#EEEEEE] hover:text-[#FFBF00] transition-colors"
            >
              <User className="w-6 h-6" />
            </Link>
          </div>

          {/* Mobile language */}
          <div className="flex gap-3 mt-6">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLang(lang);
                  setMenuState(false);
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-colors",
                  currentLang.code === lang.code
                    ? "bg-[#FFBF00] text-black"
                    : "bg-white/10 text-[#EEEEEE] hover:bg-white/20"
                )}
              >
                {lang.flag} {lang.code.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/products" onClick={() => setMenuState(false)}>
              <LiquidGlassButton variant="primary" size="lg">
                {t("shopNow")}
              </LiquidGlassButton>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
