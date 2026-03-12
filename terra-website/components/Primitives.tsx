"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const nodes = [
  {
    name: "Handles",
    description: "Your unique identity in the garden. Multi-chain and forever yours.",
    color: "bg-surface-50",
  },
  {
    name: "Posts",
    description: "Every thought, shared and owned. Composable social fragments.",
    color: "bg-surface-100",
  },
  {
    name: "Collect",
    description: "Fans can own your content. Direct-to-creator monetization.",
    color: "bg-surface-50",
  },
  {
    name: "Mirror",
    description: "Curate the best thoughts and grow the community with mirrors.",
    color: "bg-surface-100",
  },
  {
    name: "Follow",
    description: "On-chain relationships that build your social capital over time.",
    color: "bg-surface-50",
  },
  {
    name: "Tokens",
    description: "Creator coins that bind communities through shared ownership.",
    color: "bg-ink text-surface",
  },
];

export function Primitives() {
  return (
    <section id="nodes" className="py-40 bg-white section-padding font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="text-ink-lighter text-[15px] font-bold tracking-widest uppercase mb-4 block font-display">
              The Ecosystem
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-ink leading-[0.9] font-display">
              Built with <br />
              <span className="gradient-text italic">Modular Nodes.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-ink-light font-medium max-w-sm"
          >
            Modular, composable building blocks that let you grow your digital garden exactly how you want.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((node, i) => (
            <motion.div
              key={node.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className={`group ${node.color} rounded-[2.5rem] p-10 border border-black/5 transition-colors duration-500 shadow-sm hover:shadow-xl`}
            >
              <div className="space-y-6">
                <div className={`w-12 h-12 rounded-full ${node.name === "Tokens" ? "bg-white text-ink" : "bg-ink text-white"} flex items-center justify-center shadow-sm`}>
                  <span className="font-bold text-lg">{i + 1}</span>
                </div>
                <h3 className="text-3xl font-black font-display uppercase tracking-tight">{node.name}</h3>
                <p className={`text-lg ${node.name === "Tokens" ? "text-surface/80" : "text-ink-light"} font-medium leading-relaxed`}>
                  {node.description}
                </p>
                <div className="pt-4">
                  <button className={`font-bold flex items-center gap-2 group-hover:gap-4 transition-all duration-300 ${node.name === "Tokens" ? "text-primary-light" : "text-primary"}`}>
                    Learn more
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

