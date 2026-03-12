'use client'

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const EVENTS = [
  { user: "0x2a...b4d", action: "launched", target: "CREATOR COIN", amount: "1.2M", time: "Just now" },
  { user: "garden.terra", action: "minted", target: "REPUTATION BADGE", amount: "LVL 4", time: "2s ago" },
  { user: "luna.btc", action: "sent", target: "GIFT", amount: "💎 1,000", time: "5s ago" },
  { user: "0xf4...e11", action: "deployed", target: "MINI APP", amount: "v1.2", time: "8s ago" },
  { user: "dev.stacks", action: "settled", target: "BLOCK #12041", amount: "BTC", time: "12s ago" },
  { user: "0x91...a2c", action: "bonded", target: "CURVE", amount: "⚡ 500", time: "15s ago" },
];

const EventItem = ({ event, index }: { event: typeof EVENTS[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] p-4 rounded-2xl backdrop-blur-sm hover:border-white/20 transition-colors group"
  >
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6025f5] to-[#ff5555] flex items-center justify-center text-white font-bold text-xs">
      {event.user[0].toUpperCase()}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{event.user}</span>
        <span className="text-[10px] font-bold text-[#6025f5] uppercase">{event.action}</span>
      </div>
      <div className="text-sm text-white font-medium">{event.target} <span className="text-white/40 text-xs ml-2">{event.amount}</span></div>
    </div>
    <div className="text-[9px] font-bold text-white/10 uppercase tracking-tighter group-hover:text-white/30 transition-colors">
      {event.time}
    </div>
  </motion.div>
);

const Statistic = ({ label, value, color }: { label: string, value: string, color?: string }) => (
  <div className="space-y-1">
    <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">{label}</div>
    <div className="text-4xl md:text-5xl font-light text-white tracking-tighter" style={{ color }}>{value}</div>
  </div>
);

export const NetworkActivity = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="py-32 bg-[#050505] overflow-hidden relative font-sans">
      {/* Background Motion Layer */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          style={{ rotate, scale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[0.5px] border-white/10 rounded-full"
        />
        <motion.div
          style={{ rotate: useTransform(rotate, r => -r * 1.5), scale: useTransform(scale, s => s * 0.9) }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border-[0.5px] border-white/5 rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Content */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-light text-white tracking-tighter leading-[0.95] font-alpina italic"
              >
                The Network<br /><span className="text-[#6025f5]">Never Sleeps.</span>
              </motion.h2>
              <p className="text-white/40 text-lg leading-relaxed font-light">
                Real-time visualization of the Terra ecosystem. Every transaction, gift, and coin launch is secured by the Bitcoin blockchain.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <Statistic label="Active Nodes" value="12,042" color="#6025f5" />
              <Statistic label="TPS" value="4,200+" />
              <Statistic label="TVL (BTC)" value="1.2k" color="#ff5555" />
              <Statistic label="Apps" value="150+" />
            </div>

            <div className="pt-8">
              <button className="text-white border border-white/20 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                View Network Stats
              </button>
            </div>
          </div>

          {/* Right Content: Dense Interactive Grid */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-10 bg-gradient-to-tr from-[#6025f5]/10 to-transparent blur-3xl opacity-50" />

            <div className="relative bg-[#0A0A0A] border border-white/[0.06] rounded-[48px] p-8 md:p-12 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>

              <div className="mb-10 flex items-center justify-between">
                <h3 className="text-xl font-medium text-white tracking-tight">Live Activity Feed</h3>
                <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Data Stream v2.1</div>
              </div>

              <div className="space-y-4">
                {EVENTS.map((event, i) => (
                  <EventItem key={i} event={event} index={i} />
                ))}
              </div>

              {/* Matrix-like background effect for density */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
            </div>

            {/* Sub-visuals for extra density */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-12 -right-12 w-32 h-32 bg-[#111] border border-white/5 rounded-3xl p-6 shadow-2xl hidden lg:flex flex-col justify-center"
            >
              <div className="text-[8px] font-bold text-white/10 uppercase mb-2">Block #</div>
              <div className="text-2xl font-light text-white">842k</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-8 -left-8 w-40 h-24 bg-[#111] border border-white/5 rounded-3xl p-6 shadow-2xl hidden lg:flex flex-col justify-center"
            >
              <div className="text-[8px] font-bold text-[#6025f5] uppercase mb-1">Network Health</div>
              <div className="flex gap-1 items-end h-6">
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="flex-1 bg-white/20 rounded-full" style={{ height: `${Math.random() * 100}%` }} />)}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
