"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-screen max-h-screen pt-32 flex flex-col items-center overflow-hidden bg-white border-b rounded-b-[4rem] shadow-md shadow-black/1">
      {/* Background patterns: Extremely Subtle & Localized Grid */}
      <div className="absolute inset-x-0 top-0 h-[600px] z-0 pointer-events-none flex justify-center">
        <div
          className="w-full h-full opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 2px, transparent 2px)`,
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(circle at 50% 40%, black 15%, transparent 60%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 15%, transparent 60%)'
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.012)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center flex-1 min-h-0">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 bg-white border border-black/[0.08] rounded-full px-5 py-1.5 shadow-sm mb-6"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`w-6 h-6 rounded-full border-2 border-white bg-surface-${i * 100}`} />
            ))}
          </div>
          <p className="text-xs font-bold text-ink-light tracking-tight">
            Loved by <span className="text-ink">4,000+</span> gardeners
          </p>
          <div className="flex gap-0.5 ml-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} width="10" height="10" viewBox="0 0 12 12" fill="#fdcf58">
                <path d="M6 0L7.34708 4.1459L11.7063 4.1459L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459L4.65292 4.1459L6 0Z" />
              </svg>
            ))}
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-[5rem] font-sans font-light tracking-tight leading-[0.85] mb-6"
        >
          Open Social <br /><span className="inline-block -mt-2 italic font-medium gradient-text text-[7rem]" style={{ fontFamily: "var(--font-cormorant, serif)" }}>Infrastructure</span> <span className="block lg:inline text-center">for <span className="relative inline-block">Stacks<img src="/stacks.png" alt="Stacks" className="absolute -top-4 -right-12 w-12 h-12 object-contain" /></span></span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base md:text-lg text-ink-lighter max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Terra is the sovereign social layer for creators, secured by Bitcoin and powered by Stacks.
          Empowering social apps with ZK-privacy and full content ownership.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-10"
        >
          <a
            href="#"
            className="bg-ink text-white text-base font-bold px-10 py-4 rounded-2xl hover:bg-black transition-all flex items-center gap-3 shadow-lg hover:scale-105 active:scale-95"
          >
            Join the waitlist
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 19L19 5M19 5H9M19 5V15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* Mockup Section - Fills the rest of the screen */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative w-full max-w-6xl px-4 md:px-0 flex-1 flex flex-col min-h-0"
        >
          <div className="relative flex-1 min-h-0 w-full mx-auto rounded-t-[2.5rem] border-x border-t border-black/[0.08] shadow-[0_-20px_80px_rgba(0,0,0,0.05)] bg-white overflow-hidden">
            <img
              src="/terra_dashboard_mockup.png"
              alt="Terra Dashboard Mockup"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
