'use client'

import React from 'react';
import { motion } from 'framer-motion';

const VIOLET = "#6025f5";
const CORAL = "#ff5555";

interface FeatureCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FeatureCard = ({ title, description, children, className = "", delay = 0 }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={`bg-white rounded-[40px] border border-black/[0.04] overflow-hidden flex flex-col shadow-[0_16px_40px_-12px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:scale-[1.01] transition-all duration-700 ${className}`}
  >
    <div className="p-10 pb-6 relative">
      <div className="absolute top-10 right-10 w-12 h-12 bg-black/[0.02] rounded-full flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-black/10 rounded-full" />
      </div>
      <h3 className="text-2xl font-semibold text-[#111] mb-4 font-sans">{title}</h3>
      <p className="text-lg text-black/40 leading-relaxed max-w-[85%] font-sans font-medium">{description}</p>
    </div>
    <div className="flex-1 px-10 pb-10 flex items-center justify-center overflow-hidden">
      {children}
    </div>
  </motion.div>
);

export const SocialFeatures = () => {
  return (
    <section className="py-32 md:py-48 bg-[#fff] overflow-hidden relative font-sans">
      {/* Background Density Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute top-1/4 left-1/4 w-[1000px] h-[1000px] border border-black rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-black rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header - Denser and Higher Focus */}
        <div className="text-center mb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-violet-500/5 via-coral-500/5 to-transparent blur-[120px] pointer-events-none" />
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-light tracking-tighter text-[#111] mb-5 leading-[0.9] font-sans"
          >
            Digital presence. <br />
            <span className="gradient-text italic font-medium font-alpina pr-4">Amplified</span> 
            <span>at scale.</span>
          </motion.h2>
          
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
            className="text-black/40 max-w-2xl mx-auto text-xl md:text-sm leading-relaxed font-sans font-light"
          >
            All the social features you love, now with a built-in economy. 
            Connect with your audience in real-time, secured by Bitcoin.
          </motion.p>
        </div>

        {/* Dense Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Card 1: Streaming (Extended) */}
          <FeatureCard 
            title="Live Streaming & Gifting" 
            description="Broadcast in high definition with zero latency. Support creators with immediate on-chain settlement."
            className="md:col-start-1 md:col-end-13 lg:col-start-1 lg:col-end-9"
            delay={0.1}
          >
            <div className="w-full relative rounded-3xl overflow-hidden bg-black aspect-video lg:aspect-auto lg:h-[400px] shadow-2xl border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Streamer" />
              
              <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                <div className="bg-[#ff5555] text-white text-[11px] font-black px-3 py-1 rounded-lg uppercase tracking-widest animate-pulse">LIVE</div>
                <div className="bg-white/10 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-lg flex items-center gap-2 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> 24,042
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between">
                <div className="space-y-3 max-w-[65%]">
                  <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="bg-black/40 backdrop-blur-xl p-3 rounded-2xl text-[12px] text-white border border-white/10 shadow-2xl">
                    <span className="font-black text-[#6025f5] uppercase tracking-tighter mr-2">@AriaLabs</span> The latency is practically zero. Bitcoin L2 is wild... ⚡
                  </motion.div>
                  <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-black/40 backdrop-blur-xl p-3 rounded-2xl text-[12px] text-white border border-white/10 shadow-2xl">
                    <span className="font-black text-[#facc15] uppercase tracking-tighter mr-2">@Rex</span> Send the Diamond Gift! 📈 0.4s settlement confirmed.
                  </motion.div>
                </div>
                
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/10 backdrop-blur-3xl p-6 rounded-[32px] border border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.1)] flex flex-col items-center gap-2"
                >
                  <span className="text-4xl">💎</span>
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Sent</span>
                </motion.div>
              </div>
            </div>
          </FeatureCard>

          {/* Card 2: Messenger */}
          <FeatureCard 
            title="Sovereign Messaging" 
            description="End-to-end encrypted chat with identity powered by Stacks."
            className="md:col-start-1 md:col-end-13 lg:col-start-9 lg:col-end-13"
            delay={0.2}
          >
            <div className="w-full bg-neutral-50 rounded-3xl border border-black/[0.04] p-6 flex flex-col gap-6 min-h-[300px]">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#6025f5]/10 flex items-center justify-center text-sm border border-[#6025f5]/10">👤</div>
                <div className="flex-1 bg-white p-4 rounded-[24px] rounded-tl-none border border-black/[0.04] shadow-sm">
                  <div className="text-[11px] font-black text-[#111] mb-1.5 uppercase tracking-tighter">Alex.btc</div>
                  <div className="text-[13px] text-black/50 leading-relaxed font-medium">Just minted my first Handle on the social curve! 🔥</div>
                </div>
              </div>
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-xs text-white">ME</div>
                <div className="flex-1 bg-[#111] p-4 rounded-[24px] rounded-tr-none text-white shadow-xl">
                  <div className="text-[13px] leading-relaxed font-medium">LFG. This is the way. ⚡</div>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-black/[0.04] flex gap-3">
                <div className="flex-1 h-12 rounded-2xl bg-white border border-black/[0.08] px-5 flex items-center text-[11px] text-black/20 font-bold uppercase tracking-widest">Type a message...</div>
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </div>
              </div>
            </div>
          </FeatureCard>

          {/* Card 3: High-Def Content */}
          <FeatureCard 
            title="Premium Content Feed" 
            description="A high-fidelity social feed where you own the algorithm and the data."
            className="md:col-start-1 md:col-end-13 lg:col-start-1 lg:col-end-7"
            delay={0.3}
          >
            <div className="w-full grid grid-cols-2 gap-4 h-full min-h-[300px]">
                <div className="rounded-[32px] overflow-hidden bg-neutral-100 relative group">
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="post" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex gap-1">
                        {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex-1 rounded-[32px] overflow-hidden bg-neutral-100 relative group">
                         <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="post" />
                         <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-[10px] text-white border border-white/20 font-black tracking-widest uppercase">NFT</div>
                    </div>
                    <div className="h-[40%] rounded-[32px] bg-violet-500 flex flex-col items-center justify-center text-white p-4">
                        <div className="text-2xl font-black italic font-alpina mb-1">98k</div>
                        <div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50">Staked Creators</div>
                    </div>
                </div>
            </div>
          </FeatureCard>

          {/* Card 4: Interactive Metrics */}
          <FeatureCard 
             title="Verified Reputation" 
             description="Your social graph is mapped to the blockchain. Irreversible trust."
             className="md:col-start-1 md:col-end-13 lg:col-start-7 lg:col-end-13"
             delay={0.4}
          >
            <div className="w-full p-8 bg-[#fafafa] border border-black/[0.03] rounded-[40px] flex flex-col justify-center items-center gap-10">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 to-coral-500 p-1">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-2">
                            <div className="w-full h-full rounded-full bg-neutral-50 flex items-center justify-center text-4xl">👑</div>
                        </div>
                    </div>
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-2 border-dashed border-violet-500/20 rounded-full -m-4" 
                    />
                </div>
                <div className="w-full grid grid-cols-3 gap-6 text-center">
                    <div>
                        <div className="text-xl font-black text-[#111] mb-1">4.8k</div>
                        <div className="text-[9px] font-black text-black/20 uppercase tracking-widest">Connects</div>
                    </div>
                    <div>
                        <div className="text-xl font-black text-[#6025f5] mb-1">LVL 92</div>
                        <div className="text-[9px] font-black text-black/20 uppercase tracking-widest">Growth</div>
                    </div>
                    <div>
                        <div className="text-xl font-black text-[#ff5555] mb-1">9.1k</div>
                        <div className="text-[9px] font-black text-black/20 uppercase tracking-widest">Badges</div>
                    </div>
                </div>
            </div>
          </FeatureCard>

        </div>

      </div>
    </section>
  );
};
