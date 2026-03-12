"use client";

import { motion } from "framer-motion";

const tools = [
  "Stacks", "Bitcoin", "Hiro", "Clarity", "LNS", "Stellar",
  "Arka", "Alex", "Vela", "Gamma", "Zest", "Flow",
];

const stats = [
  { value: "500K+", label: "Gardeners" },
  { value: "12M", label: "Posts Minted" },
  { value: "100%", label: "Native BTC" },
  { value: "∞", label: "Ownability" },
];

export function Ecosystem() {
  return (
    <section id="ecosystem" className="py-40 section-padding font-sans">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <span className="text-ink-lighter text-[15px] font-bold tracking-widest uppercase mb-4 block font-display">
            Ecosystem
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-ink mb-10 font-display">
            Deeply rooted in <br />
            <span className="gradient-text italic">the Bitcoin soil.</span>
          </h2>
          <p className="text-xl text-ink-light font-medium max-w-2xl mx-auto text-balance">
            Terra is not just an app. It&apos;s an open social infrastructure built on top of the world&apos;s most secure settlement layer.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="bg-surface-50 rounded-[2.5rem] p-12 text-center border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="text-5xl md:text-6xl font-black gradient-text mb-4 tracking-tighter font-display">
                {stat.value}
              </div>
              <div className="text-lg text-ink font-bold opacity-40 uppercase tracking-widest leading-none font-display">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tool grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-wrap items-center justify-center gap-4 opacity-40 hover:opacity-100 transition-all duration-700"
        >
          {tools.map((name) => (
            <div
              key={name}
              className="px-8 py-3 rounded-full border border-ink/10 hover:border-primary hover:text-primary font-bold transition-all duration-300 font-display uppercase tracking-widest text-sm"
            >
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

