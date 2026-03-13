"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Products", href: "#" },
  { label: "Solutions", href: "#", hasDropdown: true },
  { label: "Integration", href: "#" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "#" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-6 left-0 right-0 z-50 px-4 md:px-6"
    >
      <nav className="mx-auto max-w-7xl bg-white/70 backdrop-blur-xl rounded-full px-4 md:px-8 py-3 flex items-center justify-between border border-black/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center">
            <span className="text-white font-black text-sm">T</span>
          </div>
          <span className="text-ink font-black text-xl tracking-tighter font-display hidden sm:block">Terra</span>
        </a>

        {/* Center Links - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-ink-light hover:text-ink transition-colors flex items-center gap-1"
            >
              {link.label}
              {link.hasDropdown && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </a>
          ))}
        </div>

        {/* Right Actions - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="#"
            className="text-sm font-bold text-ink hover:bg-black/5 px-4 py-2 rounded-full transition-colors"
          >
            Log in
          </a>
          <a
            href="#"
            className="bg-ink text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-ink/90 transition-all flex items-center gap-2"
          >
            Join the waitlist
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-ink"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-auto max-w-7xl mt-2 bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-4 border border-black/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-base font-medium text-ink-light hover:text-ink transition-colors flex items-center justify-between py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-black/[0.05]">
                <a
                  href="#"
                  className="text-base font-bold text-ink hover:bg-black/5 px-4 py-2 rounded-full transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </a>
                <a
                  href="#"
                  className="bg-ink text-white text-base font-bold px-5 py-2 rounded-full hover:bg-ink/90 transition-all text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join the waitlist
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

