'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VIOLET = "#6025f5";
const G = "linear-gradient(90deg, #6025f5 0%, #ff5555 50%, #facc15 100%)";

// VS Code Tokyo Night palette
const TN = {
  bg: '#1a1b2e',   // editor background
  sidebar: '#16172a',   // sidebar / activity bar
  tabBar: '#13141f',   // tab bar bg
  tabActive: '#1a1b2e',   // active tab
  line: 'rgba(255,255,255,0.04)',
  text: 'rgba(255,255,255,0.75)',
  dim: 'rgba(255,255,255,0.35)',
  ghost: 'rgba(255,255,255,0.12)',
  kw: '#bb9af7',   // purple — keyword
  fn: '#7dcfff',   // cyan — function/type
  str: '#9ece6a',   // green — string
  cmt: 'rgba(255,255,255,0.22)', // comment
};

// ─── macOS window chrome ──────────────────────────────────────────────────────
const MacFrame = ({ children, title = 'terra — deploy.ts' }: { children: React.ReactNode; title?: string }) => (
  <div className="w-full h-full flex flex-col rounded-[14px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.35)]"
    style={{ background: TN.tabBar }}>
    {/* Title bar */}
    <div className="flex-shrink-0 h-9 flex items-center px-4 gap-3 relative select-none"
      style={{ background: TN.tabBar, borderBottom: `1px solid ${TN.line}` }}>
      {/* Traffic lights */}
      <div className="flex gap-[6px] z-10">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_0_0.5px_rgba(0,0,0,0.3)]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_0_0.5px_rgba(0,0,0,0.3)]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_0_0.5px_rgba(0,0,0,0.3)]" />
      </div>
      {/* Centred title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[11px] font-medium" style={{ color: TN.dim }}>{title}</span>
      </div>
      {/* Menu bar faint items */}
      <div className="ml-6 flex gap-4">
        {['File', 'Edit', 'View', 'Terminal', 'Help'].map(m => (
          <span key={m} className="text-[10px]" style={{ color: TN.ghost }}>{m}</span>
        ))}
      </div>
    </div>
    {/* Content */}
    <div className="flex-1 overflow-hidden" style={{ background: TN.bg }}>
      {children}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 1 — SDK Terminal
// ═══════════════════════════════════════════════════════════════════════════════

const CODE_LINES = [
  { n: '01', parts: [{ c: TN.kw, v: 'import' }, { c: TN.text, v: ' { ' }, { c: TN.fn, v: 'Terra' }, { c: TN.text, v: ', ' }, { c: TN.fn, v: 'Identity' }, { c: TN.text, v: ', ' }, { c: TN.fn, v: 'Agent' }, { c: TN.text, v: ' } ' }, { c: TN.kw, v: 'from' }, { c: TN.str, v: " '@terra/sdk'" }, { c: TN.dim, v: ';' }] },
  { n: '02', parts: [] },
  { n: '03', parts: [{ c: TN.cmt, v: '// Bootstrap a sovereign social protocol on Bitcoin' }] },
  { n: '04', parts: [{ c: TN.kw, v: 'const' }, { c: TN.text, v: ' protocol = ' }, { c: TN.kw, v: 'await' }, { c: TN.text, v: ' ' }, { c: TN.fn, v: 'Terra' }, { c: TN.text, v: '.init({' }] },
  { n: '05', parts: [{ c: TN.text, v: '  ticker: ' }, { c: TN.str, v: "'$LUNA'" }, { c: TN.dim, v: ',' }] },
  { n: '06', parts: [{ c: TN.text, v: '  security: ' }, { c: TN.str, v: "'bitcoin'" }, { c: TN.dim, v: ',' }] },
  { n: '07', parts: [{ c: TN.text, v: '  agents: [' }, { c: TN.fn, v: 'AIAgent' }, { c: TN.text, v: '.create()],' }] },
  { n: '08', parts: [{ c: TN.text, v: '  reputation: ' }, { c: TN.kw, v: 'true' }, { c: TN.text, v: ', social: ' }, { c: TN.kw, v: 'true' }] },
  { n: '09', parts: [{ c: TN.text, v: '});' }] },
  { n: '10', parts: [] },
  { n: '11', parts: [{ c: TN.cmt, v: '// Mint a zk-sovereign identity' }] },
  { n: '12', parts: [{ c: TN.kw, v: 'const' }, { c: TN.text, v: ' id = ' }, { c: TN.kw, v: 'await' }, { c: TN.text, v: ' ' }, { c: TN.fn, v: 'Identity' }, { c: TN.text, v: '.mint({ wallet });' }] },
];

const LOG_EVENTS = [
  { msg: 'zk-Identity minted: 0x9f3a…4b2c' },
  { msg: 'Settling to Stacks Block #120,419' },
  { msg: 'AgentDeployed(addr=0xc1f2, stake=100 STX)' },
  { msg: 'SocialGraph.follow(creator=0xa9b3…)', accent: true },
  { msg: 'BTC finality confirmed — block 842,041' },
  { msg: 'CoinBondingCurve deployed @ 0.001 BTC' },
  { msg: 'ReputationScore updated: 94.7 → 96.2', accent: true },
];

const FILES = ['terra-app/', '  sdk/', '    deploy.ts', '    identity.ts', '    agent.ts', '  protocol/', '    social.ts'];

const SDKScene = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [logs, setLogs] = useState<typeof LOG_EVENTS>([]);
  const [progress, setProgress] = useState(0);
  const [toasts, setToasts] = useState<{ id: number; msg: string }[]>([]);

  useEffect(() => {
    const lineT = setInterval(() => setVisibleLines(v => v < CODE_LINES.length ? v + 1 : v), 200);
    let li = 0;
    const logT = setInterval(() => { setLogs(l => [...l.slice(-5), LOG_EVENTS[li++ % LOG_EVENTS.length]]); }, 1100);
    const progT = setInterval(() => setProgress(p => Math.min(p + 2, 100)), 60);
    const msgs = ['Identity verified', 'Agent online', 'Protocol deployed'];
    let ti = 0;
    const toastT = setInterval(() => {
      const id = Date.now();
      setToasts(t => [...t, { id, msg: msgs[ti++ % msgs.length] }]);
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2200);
    }, 2600);
    return () => { clearInterval(lineT); clearInterval(logT); clearInterval(progT); clearInterval(toastT); };
  }, []);

  return (
    <div className="h-full w-full flex font-mono text-[11px] overflow-hidden relative" style={{ background: TN.bg }}>

      {/* Toasts */}
      <div className="absolute top-2 right-2 z-30 flex flex-col gap-1.5 items-end pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div key={t.id}
              initial={{ opacity: 0, x: 16, scale: 0.92 }} animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="px-3 py-1.5 rounded-lg text-[10px] font-medium border"
              style={{ color: TN.text, borderColor: TN.line, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}>
              {t.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Activity bar (icons strip) */}
      <div className="hidden sm:flex w-10 flex-shrink-0 flex-col items-center pt-3 gap-4" style={{ background: TN.sidebar, borderRight: `1px solid ${TN.line}` }}>
        {['⬡', '⊞', '⌕', '⚙'].map((ic, i) => (
          <div key={i} className={`text-[14px] ${i === 0 ? 'opacity-80' : 'opacity-20'}`} style={{ color: TN.text }}>{ic}</div>
        ))}
      </div>

      {/* Sidebar — file tree */}
      <div className="hidden sm:block w-36 flex-shrink-0 pt-3 px-2" style={{ background: TN.sidebar, borderRight: `1px solid ${TN.line}` }}>
        <div className="text-[8px] uppercase tracking-widest px-2 mb-2" style={{ color: TN.ghost }}>Explorer</div>
        {FILES.map((f, i) => (
          <div key={i} className="px-2 py-[3px] rounded text-[10px] cursor-pointer"
            style={{ background: f === '    deploy.ts' ? 'rgba(255,255,255,0.07)' : 'transparent', color: f === '    deploy.ts' ? TN.text : TN.ghost }}>
            {f}
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Tabs */}
        <div className="flex items-end h-9 flex-shrink-0 px-1" style={{ background: TN.tabBar, borderBottom: `1px solid ${TN.line}` }}>
          {['deploy.ts', 'identity.ts'].map((tab, i) => (
            <div key={tab}
              className="px-4 py-1.5 text-[10px] rounded-t-md flex items-center gap-1.5"
              style={{ background: i === 0 ? TN.tabActive : TN.tabBar, color: i === 0 ? TN.text : TN.ghost, borderTop: i === 0 ? `1px solid ${VIOLET}55` : 'none' }}>
              {tab}
            </div>
          ))}
        </div>

        {/* Code */}
        <div className="flex-1 overflow-hidden px-2 pt-3 space-y-0.5">
          {CODE_LINES.slice(0, visibleLines).map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.1 }}
              className="flex gap-3 leading-[1.65]">
              <span className="w-5 text-right flex-shrink-0 select-none text-[10px]" style={{ color: TN.ghost }}>{line.n}</span>
              <span>
                {line.parts.map((p, pi) => <span key={pi} style={{ color: p.c }}>{p.v}</span>)}
                {i === visibleLines - 1 && (
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.75, repeat: Infinity }}
                    className="inline-block w-[2px] h-[12px] ml-px align-middle" style={{ background: TN.text }} />
                )}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Terminal panel */}
        <div className="h-[36%] flex flex-col" style={{ borderTop: `1px solid ${TN.line}`, background: TN.sidebar }}>
          <div className="flex items-center gap-4 px-3 h-7 flex-shrink-0" style={{ borderBottom: `1px solid ${TN.line}` }}>
            <span className="text-[8px] uppercase tracking-widest" style={{ color: TN.text }}>Terminal</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[8px]" style={{ color: TN.ghost }}>Deploy {progress}%</span>
              <div className="w-20 h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <motion.div className="h-full rounded-full" style={{ width: `${progress}%`, background: G }} />
              </div>
              {progress === 100 && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[8px]" style={{ color: TN.str }}>✓</motion.span>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-hidden px-3 pt-2 space-y-1.5">
            <AnimatePresence initial={false}>
              {logs.map((log, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-[10px]">
                  <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: log.accent ? VIOLET : TN.ghost }} />
                  <span style={{ color: log.accent ? TN.text : TN.dim }}>{log.msg}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 h-5 flex items-center px-3 gap-4"
        style={{ background: VIOLET, zIndex: 10 }}>
        <span className="text-[8px] text-white/80">⎇ main</span>
        <span className="text-[8px] text-white/60">TypeScript</span>
        <span className="text-[8px] text-white/60 ml-auto">Ln 12, Col 42</span>
        <span className="text-[8px] text-white/60">UTF-8</span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 2 — Mini Apps
// ═══════════════════════════════════════════════════════════════════════════════

const APPS = [
  { id: 'store', label: 'Merch Store', stat: '$94.2k', sub: 'volume' },
  { id: 'bets', label: 'Prediction', stat: '847 bets', sub: 'open' },
  { id: 'dao', label: 'Governance', stat: '12 props', sub: 'voting' },
  { id: 'nft', label: 'NFT Studio', stat: '3.2k', sub: 'minted' },
  { id: 'tips', label: 'Tip Jar', stat: '220 STX', sub: 'today' },
  { id: 'music', label: 'Audio Drops', stat: '18 drops', sub: 'active' },
];

const TX_FEED = [
  { from: 'MerchStore', to: 'Creator', amount: '0.20 BTC', type: 'sale' },
  { from: 'BetPool', to: 'Winner', amount: '40 STX', type: 'payout' },
  { from: 'DAO', to: 'Treasury', amount: '100 STX', type: 'vote' },
  { from: 'NFTStudio', to: 'Buyer', amount: '0.05 BTC', type: 'mint' },
  { from: 'TipJar', to: 'Streamer', amount: '5 STX', type: 'tip' },
];

const MiniAppsScene = () => {
  const [activeApp, setActiveApp] = useState(0);
  const [txs, setTxs] = useState([TX_FEED[0]]);
  const [balance, setBalance] = useState(94200);

  useEffect(() => {
    const appT = setInterval(() => setActiveApp(a => (a + 1) % APPS.length), 1500);
    let ti = 1;
    const txT = setInterval(() => { setTxs(t => [...t.slice(-4), TX_FEED[ti++ % TX_FEED.length]]); }, 1200);
    const balT = setInterval(() => { setBalance(b => b + Math.floor(Math.random() * 80 + 20)); }, 700);
    return () => { clearInterval(appT); clearInterval(txT); clearInterval(balT); };
  }, []);

  return (
    <div className="h-full w-full flex overflow-hidden" style={{ background: TN.bg }}>
      {/* Sidebar */}
      <div className="hidden sm:block w-10 flex-shrink-0" style={{ background: TN.sidebar, borderRight: `1px solid ${TN.line}` }} />

      {/* App grid */}
      <div className="flex-1 p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-3 grid-rows-3 sm:grid-rows-2 gap-2 sm:gap-2.5 overflow-hidden">
        {APPS.map((app, i) => {
          const isActive = activeApp === i;
          return (
            <motion.div key={app.id}
              animate={{ scale: isActive ? 1.02 : 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl flex flex-col justify-between p-3 relative overflow-hidden border"
              style={{ background: isActive ? 'rgba(96,37,245,0.08)' : 'rgba(255,255,255,0.025)', borderColor: isActive ? `${VIOLET}44` : `${TN.line}` }}
            >
              {isActive && (
                <motion.div layoutId="appGlow" className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 30% 30%, ${VIOLET}12 0%, transparent 70%)` }} />
              )}
              <div className="flex justify-end">
                <motion.div animate={{ opacity: isActive ? 1 : 0, scale: isActive ? [1, 1.5, 1] : 1 }}
                  transition={{ duration: 0.9, repeat: isActive ? Infinity : 0 }}
                  className="w-1.5 h-1.5 rounded-full" style={{ background: VIOLET }} />
              </div>
              <div>
                <div className="text-[9px] mb-1" style={{ color: TN.ghost }}>{app.label}</div>
                <div className="text-[13px] font-bold" style={{ color: TN.text }}>{app.stat}</div>
                <div className="text-[8px] mt-0.5" style={{ color: TN.dim }}>{app.sub}</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden rounded-b-xl"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <motion.div animate={{ width: isActive ? '100%' : '0%' }} transition={{ duration: 1.4, ease: 'linear' }}
                  className="h-full" style={{ background: VIOLET }} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Right panel */}
      <div className="hidden md:flex w-48 flex-col gap-3 py-3 pr-3" style={{ borderLeft: `1px solid ${TN.line}` }}>
        {/* Wallet */}
        <div className="rounded-xl border overflow-hidden" style={{ background: TN.sidebar, borderColor: TN.line }}>
          <div className="px-3 pt-3 pb-2">
            <div className="text-[8px] uppercase tracking-widest mb-1" style={{ color: TN.ghost }}>Terra Wallet</div>
            <motion.div className="text-xl font-black tabular-nums" style={{ color: TN.text }}>
              ${(balance / 1000).toFixed(1)}k
            </motion.div>
            <div className="text-[8px] mt-0.5" style={{ color: TN.dim }}>+2.4% today</div>
          </div>
          <div className="mx-3 h-px" style={{ background: TN.line }} />
          <div className="px-3 py-1.5 flex justify-between">
            {['Send', 'Recv', 'Apps'].map(a => (
              <button key={a} className="text-[8px] uppercase tracking-wider transition-opacity hover:opacity-100 opacity-50"
                style={{ color: TN.text }}>{a}</button>
            ))}
          </div>
        </div>

        {/* Live txs */}
        <div className="flex-1 rounded-xl border flex flex-col overflow-hidden" style={{ background: TN.sidebar, borderColor: TN.line }}>
          <div className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: `1px solid ${TN.line}` }}>
            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full" style={{ background: VIOLET }} />
            <span className="text-[8px] uppercase tracking-widest" style={{ color: TN.ghost }}>Live Txs</span>
          </div>
          <div className="flex-1 overflow-hidden p-2 space-y-1.5">
            <AnimatePresence initial={false}>
              {txs.map((tx, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-lg p-2 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: TN.line }}>
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] truncate" style={{ color: TN.dim }}>{tx.from} → {tx.to}</span>
                    <span className="text-[8px] font-semibold ml-1 flex-shrink-0" style={{ color: TN.text }}>{tx.amount}</span>
                  </div>
                  <div className="text-[7px] mt-0.5 capitalize" style={{ color: TN.ghost }}>{tx.type}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Volume */}
        <div className="rounded-xl border px-3 py-2 flex items-center justify-between"
          style={{ background: TN.sidebar, borderColor: TN.line }}>
          <div>
            <div className="text-[8px] uppercase tracking-widest" style={{ color: TN.ghost }}>Total Volume</div>
            <div className="text-sm font-black" style={{ color: TN.text }}>$2.4M</div>
          </div>
          <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.8, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full" style={{ background: VIOLET }} />
        </div>
      </div>

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 h-5 flex items-center px-3 gap-4"
        style={{ background: VIOLET, zIndex: 10 }}>
        <span className="text-[8px] text-white/80">⎇ main</span>
        <span className="text-[8px] text-white/60">6 apps active</span>
        <span className="text-[8px] text-white/60 ml-auto">${(balance / 1000).toFixed(1)}k total vol</span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 3 — Social Speed
// ═══════════════════════════════════════════════════════════════════════════════

const CHAINS = [
  { name: 'Terra L2', label: '10,000 TPS', pct: 100, highlight: true },
  { name: 'Solana', label: '4,000 TPS', pct: 40, highlight: false },
  { name: 'Ethereum', label: '30 TPS', pct: 3, highlight: false },
  { name: 'Bitcoin L1', label: '7 TPS', pct: 1, highlight: false },
];

const BLOCK_STEPS = ['Broadcast', 'L2 Confirm', 'Stacks Settle', 'BTC Final'];

const SpeedScene = () => {
  const [txCount, setTxCount] = useState(0);
  const [blockStep, setBlockStep] = useState(0);
  const [blockMs, setBlockMs] = useState(0);
  const [heatmap, setHeatmap] = useState(() => Array.from({ length: 56 }, () => Math.random()));

  useEffect(() => {
    const txT = setInterval(() => setTxCount(c => c + Math.floor(Math.random() * 14 + 4)), 50);
    const stepT = setInterval(() => setBlockStep(s => (s + 1) % BLOCK_STEPS.length), 900);
    const msT = setInterval(() => setBlockMs(t => t >= 400 ? 0 : t + 10), 10);
    const htT = setInterval(() => setHeatmap(() => Array.from({ length: 56 }, () => Math.random())), 300);
    return () => { clearInterval(txT); clearInterval(stepT); clearInterval(msT); clearInterval(htT); };
  }, []);

  return (
    <div className="h-full w-full flex overflow-hidden" style={{ background: TN.bg }}>
      {/* Activity bar */}
      <div className="hidden sm:block w-10 flex-shrink-0" style={{ background: TN.sidebar, borderRight: `1px solid ${TN.line}` }} />

      {/* Main */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 gap-4 sm:gap-5 overflow-hidden pb-5">

        {/* TX counter */}
        <div>
          <div className="text-[8px] uppercase tracking-widest mb-1" style={{ color: TN.ghost }}>Transactions Processed</div>
          <div className="text-5xl font-black leading-none tabular-nums" style={{ color: TN.text }}>
            {txCount.toLocaleString()}
          </div>
          <div className="text-[9px] mt-1" style={{ color: TN.dim }}>live counter</div>
        </div>

        {/* Block time gauge */}
        <div>
          <div className="flex justify-between text-[8px] mb-1.5" style={{ color: TN.ghost }}>
            <span className="uppercase tracking-widest">Block Time</span>
            <span style={{ color: TN.text }}>{blockMs}ms</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div className="h-full rounded-full" style={{ width: `${blockMs / 4}%`, background: G }} transition={{ duration: 0.01 }} />
          </div>
        </div>

        {/* Pipeline */}
        <div>
          <div className="text-[8px] uppercase tracking-widest mb-3" style={{ color: TN.ghost }}>Confirmation Pipeline</div>
          <div className="flex items-center">
            {BLOCK_STEPS.map((step, i) => {
              const done = i < blockStep, active = i === blockStep;
              return (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center flex-1">
                    <motion.div
                      animate={{ background: done || active ? VIOLET : 'rgba(255,255,255,0.07)', scale: active ? 1.2 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-7 h-7 rounded-full flex items-center justify-center relative">
                      {done && <span className="text-[10px] font-bold text-white/80">✓</span>}
                      {active && (
                        <>
                          <motion.div animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="absolute inset-0 rounded-full" style={{ background: VIOLET }} />
                          <div className="w-2 h-2 rounded-full bg-white/80" />
                        </>
                      )}
                    </motion.div>
                    <div className="text-[7px] mt-1.5 text-center leading-tight" style={{ color: TN.ghost }}>{step}</div>
                  </div>
                  {i < BLOCK_STEPS.length - 1 && (
                    <motion.div animate={{ background: i < blockStep ? `${VIOLET}90` : 'rgba(255,255,255,0.06)' }}
                      transition={{ duration: 0.3 }} className="flex-1 h-px mt-[-14px]" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* BTC finality */}
        <motion.div animate={{ borderColor: blockStep === 3 ? `${VIOLET}55` : 'rgba(255,255,255,0.06)' }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border px-3 py-2 flex items-center gap-3"
          style={{ background: 'rgba(255,255,255,0.02)' }}>
          <motion.div animate={{ opacity: blockStep === 3 ? [1, 0.2, 1] : 0.2 }} transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: VIOLET }} />
          <div>
            <div className="text-[8px]" style={{ color: TN.ghost }}>Bitcoin Finality</div>
            <motion.div animate={{ color: blockStep === 3 ? TN.text : 'rgba(255,255,255,0.2)' }} className="text-[9px] font-semibold">
              {blockStep === 3 ? 'Confirmed — Block #842,041' : 'Settling to L1…'}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="hidden md:flex w-52 flex-col justify-center gap-4 pr-4 py-4" style={{ borderLeft: `1px solid ${TN.line}` }}>
        <div className="text-[8px] uppercase tracking-widest" style={{ color: TN.ghost }}>Speed Comparison</div>
        {CHAINS.map((chain, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-[10px]" style={{ color: chain.highlight ? TN.text : TN.dim }}>{chain.name}</span>
              <span className="text-[9px] font-semibold" style={{ color: chain.highlight ? TN.text : 'rgba(255,255,255,0.3)' }}>{chain.label}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <motion.div initial={{ width: '0%' }} animate={{ width: `${chain.pct}%` }}
                transition={{ duration: 1.4, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full"
                style={{ background: chain.highlight ? VIOLET : 'rgba(255,255,255,0.15)' }} />
            </div>
          </div>
        ))}

        {/* Heatmap */}
        <div>
          <div className="text-[8px] uppercase tracking-widest mb-2" style={{ color: TN.ghost }}>Network Activity</div>
          <div className="grid grid-cols-8 gap-[3px]">
            {heatmap.map((v, i) => (
              <motion.div key={i} animate={{ opacity: v }} transition={{ duration: 0.3 }}
                className="aspect-square rounded-[2px]" style={{ background: VIOLET }} />
            ))}
          </div>
        </div>

        {/* Sparkline */}
        <div className="rounded-xl border p-2.5" style={{ background: TN.sidebar, borderColor: TN.line }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[8px] uppercase tracking-widest" style={{ color: TN.ghost }}>Throughput</span>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full" style={{ background: VIOLET }} />
          </div>
          <div className="flex gap-[2px] items-end h-8">
            {Array.from({ length: 32 }).map((_, i) => (
              <motion.div key={i}
                animate={{ height: [`${Math.random() * 70 + 30}%`, `${Math.random() * 70 + 30}%`] }}
                transition={{ duration: 0.6 + Math.random() * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.03 }}
                className="flex-1 rounded-full"
                style={{ background: `linear-gradient(to top, transparent, ${VIOLET}bb)` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 h-5 flex items-center px-3 gap-4"
        style={{ background: VIOLET, zIndex: 10 }}>
        <span className="text-[8px] text-white/80">⎇ main</span>
        <span className="text-[8px] text-white/60">10,000 TPS</span>
        <span className="text-[8px] text-white/60 ml-auto">BTC: 842,041</span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// Feature config
// ═══════════════════════════════════════════════════════════════════════════════

const FEATURES = [
  {
    id: 'sdk', subtitle: 'Foundation', title: 'The Terra SDK.',
    description: 'Everything you need to deploy identities, social layers, and AI agents in a single library. Optimized for performance and scale.',
    visual: <SDKScene />, macTitle: 'terra — deploy.ts — Visual Studio Code',
  },
  {
    id: 'mini-apps', subtitle: 'Utility', title: 'Mini App Ecosystem.',
    description: 'Build merch stores, prediction markets, and governance tools that integrate natively into the Terra wallet experience.',
    visual: <MiniAppsScene />, macTitle: 'terra — mini-apps — Visual Studio Code',
  },
  {
    id: 'speed', subtitle: 'Architecture', title: 'Social Speed.',
    description: 'Sub-second block times on Stacks L2, settling directly to Bitcoin. The ultimate combination of speed and security.',
    visual: <SpeedScene />, macTitle: 'terra — network — Visual Studio Code',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Main section
// ═══════════════════════════════════════════════════════════════════════════════

const IDE_VH = 58;

export const DeveloperSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const f = FEATURES[activeIndex];

  return (
    <section className="relative font-sans" style={{ background: '#F3F4F4' }}>

      {/* ── Mobile / Tablet: stacked cards (IDE + text below each) ── */}
      <div className="lg:hidden px-4 md:px-14 max-w-[1600px] mx-auto py-16 md:py-20 space-y-12 md:space-y-16">
        {FEATURES.map((feat, i) => (
          <div key={feat.id} className="space-y-6">
            {/* IDE */}
            <div className="h-[45vh] md:h-[50vh] w-full">
              <MacFrame title={feat.macTitle}>
                {feat.visual}
              </MacFrame>
            </div>
            {/* Text below */}
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-neutral-400 block">
                {feat.subtitle}
              </span>
              <h3 className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight leading-[0.92]">
                {feat.title.split('.')[0]}
                <span style={{ background: G, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>.</span>
              </h3>
              <p className="text-neutral-500 text-base leading-relaxed font-light">
                {feat.description}
              </p>
            </div>
          </div>
        ))}
        {/* CTA after all cards */}
        <div className="flex items-center gap-6 pt-4">
          <button className="group relative bg-neutral-900 text-white px-7 py-3.5 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] overflow-hidden hover:scale-105 active:scale-95 transition-all">
            <span className="relative z-10">Start Building</span>
            <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ background: G }} />
          </button>
          <div className="flex flex-col">
            <span className="text-neutral-900 text-[13px] font-bold">4.2k Builders</span>
            <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">Integrating now</span>
          </div>
        </div>
      </div>

      {/* ── Desktop: sticky left text + scrolling right IDEs ── */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 lg:px-20 max-w-[1600px] mx-auto">

        {/* Left: sticky text */}
        <div className="lg:col-span-4 lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center">
          <div className="max-w-md">
            <div key={f.id} className="space-y-8">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-neutral-400 block">
                  {f.subtitle}
                </span>
                <h2 className="text-6xl xl:text-7xl font-light text-neutral-900 tracking-tight leading-[0.92]">
                  {f.title.split('.')[0]}
                  <span style={{ background: G, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>.</span>
                </h2>
              </div>
              <p className="text-neutral-500 text-lg leading-relaxed font-light max-w-[88%]">
                {f.description}
              </p>
              <div className="flex items-center gap-8 pt-2">
                <button className="group relative bg-neutral-900 text-white px-8 py-4 rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] overflow-hidden hover:scale-105 active:scale-95 transition-all">
                  <span className="relative z-10">Start Building</span>
                  <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ background: G }} />
                </button>
                <div className="flex flex-col">
                  <span className="text-neutral-900 text-[13px] font-bold">4.2k Builders</span>
                  <span className="text-neutral-400 text-[10px] uppercase font-bold tracking-widest">Integrating now</span>
                </div>
              </div>

              {/* Step dots */}
              <div className="flex gap-2 pt-4">
                {FEATURES.map((_, i) => (
                  <motion.div key={i}
                    animate={{ width: i === activeIndex ? 20 : 5, background: i === activeIndex ? VIOLET : 'rgba(0,0,0,0.15)' }}
                    transition={{ duration: 0.3 }}
                    className="h-1 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: naturally scrolling IDE panels — each centered in viewport */}
        <div className="lg:col-span-8">
          {FEATURES.map((feat, i) => (
            <div key={feat.id} className="min-h-screen flex items-center">
              <motion.div
                onViewportEnter={() => setActiveIndex(i)}
                viewport={{ once: false, amount: 0.5 }}
                className="h-[58vh] w-full"
              >
                <MacFrame title={feat.macTitle}>
                  {feat.visual}
                </MacFrame>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
