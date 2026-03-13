"use client";

import { motion, Variants } from "framer-motion";
import { Database, Coins, Sparkles } from "lucide-react";

const pillars = [
  {
    tag: "Open Data",
    title: "Graph Roots",
    description:
      "All your social data is open and accessible. No single company owns your social graph. It's stored on-chain, forever yours.",
    icon: <Database className="w-8 h-8" />,
  },
  {
    tag: "Creator First",
    title: "Cultivate Coins",
    description:
      "Monetize your growth with built-in creator tokens. Fans become stakeholders in your success as you build your digital patch.",
    icon: <Coins className="w-8 h-8" />,
  },
  {
    tag: "Native AI",
    title: "Eco Intelligence",
    description:
      "Hyper-personalized feeds and AI companions that help you find the best blossoms in the garden. Automated but human.",
    icon: <Sparkles className="w-8 h-8" />,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  },
};

export function Features() {
  return (
    <section id="garden" className="py-16 md:py-24 lg:py-40 bg-[#FAFAFA] section-padding font-sans">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-24"
        >
          <span className="text-ink-lighter text-[15px] font-bold tracking-widest uppercase mb-6 block font-display">
            A New Paradigm
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-ink leading-tight mb-6 md:mb-8 font-display">
            The social layer <br />
            <span className="gradient-text italic">you actually own.</span>
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-ink-light font-medium max-w-2xl">
            No more walled gardens. Terra is a public infrastructure for social interaction, built where it belongs: on Bitcoin.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-surface-50 hover:bg-surface-100 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 transition-all duration-500 border border-black/5"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-[1.5rem] bg-ink text-surface flex items-center justify-center group-hover:scale-110 transition-transform duration-500 mb-10">
                  {pillar.icon}
                </div>
                <span className="text-sm font-bold text-ink-lighter tracking-wider uppercase mb-3 block font-display">
                  {pillar.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-ink mb-4 md:mb-6 font-display">
                  {pillar.title}
                </h3>
                <p className="text-lg text-ink-light font-medium leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

