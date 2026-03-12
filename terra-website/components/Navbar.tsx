"use client";

import { motion } from "framer-motion";

const navLinks = [
  { label: "Products", href: "#" },
  { label: "Solutions", href: "#", hasDropdown: true },
  { label: "Integration", href: "#" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "#" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-6 left-0 right-0 z-50 px-6"
    >
      <nav className="mx-auto max-w-7xl bg-white/70 backdrop-blur-xl rounded-full px-8 py-3 flex items-center justify-between border border-black/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center">
            <span className="text-white font-black text-sm">T</span>
          </div>
          <span className="text-ink font-black text-xl tracking-tighter font-display">Terra</span>
        </a>

        {/* Center Links */}
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
                  <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
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
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

