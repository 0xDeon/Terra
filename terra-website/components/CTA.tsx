"use client";

import { motion } from "framer-motion";

export function CTA() {
  return (
    <section id="community" className="py-40 section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-gradient-brand rounded-[3rem] p-16 md:p-24 text-center overflow-hidden border border-black/5 shadow-2xl"
        >
          {/* Organic background shapes for texture */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.8] mb-10 font-display italic">
              Start your <br />
              <span className="text-ink">Digital Harvest.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto mb-14 leading-relaxed">
              Join the thousands of creators already growing their own social ecosystems on the Bitcoin blockchain.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <a
                href="#"
                className="w-full sm:w-auto px-12 py-6 bg-ink text-white font-bold rounded-full text-xl hover:bg-black transition-all duration-300 active:scale-95 shadow-xl font-display uppercase tracking-widest"
              >
                Claim your Handle
              </a>
              <a
                href="#"
                className="w-full sm:w-auto px-12 py-6 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full text-xl transition-all duration-300 active:scale-95 border border-white/20 font-display uppercase tracking-widest"
              >
                Learn more
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

