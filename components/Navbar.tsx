"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Features",  href: "#features"  },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing",   href: "#pricing"   },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-midnight/80 backdrop-blur-md border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <nav className="section-container flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-full bg-amber flex items-center justify-center text-midnight font-bold text-sm animate-pulse-glow group-hover:scale-110 transition-transform duration-200">
            F
          </span>
          <span className="font-serif text-xl text-cream tracking-tight">
            Flash<span className="text-amber">Mind</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-cream-muted hover:text-cream text-sm font-medium transition-colors duration-150 relative group">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-sm py-2 px-5">Log in</Link>
          <Link href="/generate" className="btn-primary text-sm py-2 px-5">Try for Free →</Link>
        </div>

        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 rounded-md hover:bg-midnight-light transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span className={`block w-5 h-0.5 bg-cream transition-all duration-300 origin-center ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-cream transition-all duration-200 ${isMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-cream transition-all duration-300 origin-center ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-midnight-light border-t border-border px-5 pb-5 pt-3">
          <ul className="flex flex-col gap-1 mb-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="block py-3 text-cream-muted hover:text-cream text-base font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <Link href="/login" className="btn-ghost text-center" onClick={() => setIsMenuOpen(false)}>Log in</Link>
            <Link href="/generate" className="btn-primary text-center" onClick={() => setIsMenuOpen(false)}>Try for Free →</Link>
          </div>
        </div>
      </div>
    </header>
  );
}