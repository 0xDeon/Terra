'use client'

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────────── */
const G = "linear-gradient(90deg, #6025f5 0%, #ff5555 50%, #facc15 100%)";
const GA = "linear-gradient(135deg, #6025f5, #ff5555)";

/* ─────────────────────────────────────────────────────────────────
   TYPEWRITER
───────────────────────────────────────────────────────────────── */
interface TypewriterProps {
  text: string;
  active: boolean;
  speed?: number;
}

function Typewriter({ text, active, speed = 24 }: TypewriterProps) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (!active) { setShown(""); return; }
    let i = 0; setShown("");
    const iv = setInterval(() => { i++; setShown(text.slice(0, i)); if (i >= text.length) clearInterval(iv); }, speed);
    return () => clearInterval(iv);
  }, [active, text, speed]);
  return <>{shown}</>;
}

/* ─────────────────────────────────────────────────────────────────
   CURSOR
───────────────────────────────────────────────────────────────── */
interface CursorProps {
  x: number;
  y: number;
  clicking: boolean;
}

function Cursor({ x, y, clicking }: CursorProps) {
  return (
    <motion.div className="absolute pointer-events-none z-30"
      animate={{ left: x, top: y }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      style={{ left: x, top: y, position: "absolute" }}
    >
      <motion.svg width="18" height="22" viewBox="0 0 18 22" fill="none"
        animate={{ scale: clicking ? 0.8 : 1 }} transition={{ duration: 0.1 }}
      >
        <path d="M2 1.5L2 16.5L6.5 12L9.2 18.2L11.5 17.2L8.8 11H14.5L2 1.5Z"
          fill="white" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
      </motion.svg>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCENE 1 — BONDING CURVE (detailed SVG chart with live ticker)
───────────────────────────────────────────────────────────────── */
interface SceneProps {
  playing: boolean;
}

function BondingCurveScene({ playing }: SceneProps) {
  const [phase, setPhase] = useState(0);
  const [price, setPrice] = useState(1.20);
  const [cursorSeq, setCursorSeq] = useState(0);

  useEffect(() => {
    if (!playing) { setPhase(0); setPrice(1.20); setCursorSeq(0); return; }
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 1400);
    const t3 = setTimeout(() => setPhase(3), 2600);
    const t4 = setTimeout(() => setCursorSeq(1), 3000);
    // price ticker
    const prices = [1.20, 2.45, 4.80, 8.30, 14.50, 22.10, 35.60, 61.20];
    let idx = 0;
    const iv = setInterval(() => {
      idx = (idx + 1) % prices.length;
      setPrice(prices[idx]);
    }, 700);
    return () => { [t1, t2, t3, t4].forEach(clearTimeout); clearInterval(iv); };
  }, [playing]);

  // cursor: starts top-right, moves to early-buyer dot
  const cursorPos = [{ x: 290, y: 20 }, { x: 55, y: 152 }];
  const cPos = cursorPos[Math.min(cursorSeq, 1)];

  // 8 buyers along the curve
  const buyers = [
    { cx: 48, cy: 165, price: "$1", size: 14, alpha: 1.0, early: true },
    { cx: 88, cy: 138, price: "$3", size: 12, alpha: 0.85, early: false },
    { cx: 128, cy: 108, price: "$9", size: 11, alpha: 0.7, early: false },
    { cx: 165, cy: 80, price: "$18", size: 11, alpha: 0.6, early: false },
    { cx: 198, cy: 58, price: "$34", size: 10, alpha: 0.5, early: false },
    { cx: 228, cy: 40, price: "$61", size: 10, alpha: 0.4, early: false },
  ];

  return (
    <div className="relative w-full select-none" style={{ minHeight: 220 }}>
      <Cursor x={cPos.x} y={cPos.y} clicking={false} />

      {/* Live price ticker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : -8 }}
        className="absolute top-2 right-3 flex items-center gap-2 z-10"
        style={{
          background: "rgba(96,37,245,0.08)",
          border: "1px solid rgba(96,37,245,0.2)",
          borderRadius: "8px", padding: "6px 12px",
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6025f5", animation: "pulse 1.4s infinite" }} />
        <span style={{ fontSize: "9px", fontWeight: "700", color: "#6025f5", letterSpacing: "0.15em", textTransform: "uppercase" }}>LIVE</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={price}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: "13px", fontWeight: "800", color: "#111", minWidth: 44, textAlign: "right" }}
          >
            ${price.toFixed(2)}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <svg viewBox="0 0 300 210" className="w-full" style={{ height: 'auto', maxHeight: 260 }}>
        <defs>
          <linearGradient id="curveG" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6025f5" />
            <stop offset="50%" stopColor="#ff5555" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
          <linearGradient id="areaG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6025f5" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#6025f5" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="axisG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#111" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#111" stopOpacity="0.06" />
          </linearGradient>
          <filter id="nodeShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#6025f5" floodOpacity="0.25" />
          </filter>
          <filter id="glowG">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Axis lines */}
        <line x1="30" y1="10" x2="30" y2="185" stroke="url(#axisG)" strokeWidth="1.5" />
        <line x1="30" y1="185" x2="270" y2="185" stroke="url(#axisG)" strokeWidth="1.5" />

        {/* Y-axis ticks + labels */}
        {[185, 150, 115, 80, 45].map((y, i) => (
          <g key={y}>
            <line x1="26" y1={y} x2="30" y2={y} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
            <text x="22" y={y + 4} textAnchor="end" fontSize="6.5" fill="rgba(0,0,0,0.3)" fontFamily="var(--font-inter), monospace">
              {["$0", "$15", "$30", "$50", "$70"][i]}
            </text>
          </g>
        ))}

        {/* Horizontal grid */}
        {[150, 115, 80, 45].map((y: number) => (
          <line key={y} x1="30" y1={y} x2="268" y2={y} stroke="rgba(0,0,0,0.05)" strokeWidth="1" strokeDasharray="4 5" />
        ))}

        {/* X-axis labels */}
        {[50, 100, 150, 200, 250].map((x, i) => (
          <text key={x} x={x + 30} y="196" textAnchor="middle" fontSize="6.5" fill="rgba(0,0,0,0.25)" fontFamily="var(--font-inter), monospace">
            {["200", "400", "600", "800", "1K"][i]}
          </text>
        ))}
        <text x="155" y="207" textAnchor="middle" fontSize="6.5" fill="rgba(0,0,0,0.3)" fontFamily="var(--font-inter), monospace">Supply</text>

        {/* Area fill */}
        <motion.path
          d="M 30 185 C 55 178, 80 162, 108 138 C 135 114, 162 88, 195 62 C 218 44, 238 30, 258 20 L 258 185 Z"
          fill="url(#areaG)"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 1 }}
        />

        {/* Main curve */}
        <motion.path
          d="M 30 185 C 55 178, 80 162, 108 138 C 135 114, 162 88, 195 62 C 218 44, 238 30, 258 20"
          fill="none" stroke="url(#curveG)" strokeWidth="2.5" strokeLinecap="round"
          filter="url(#glowG)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />

        {/* Buyer nodes */}
        {buyers.map((b, i) => (
          <motion.g key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={phase >= 2 ? { scale: 1, opacity: b.alpha } : {}}
            transition={{ delay: i * 0.12 + 0.2, type: "spring", stiffness: 250, damping: 16 }}
            style={{ transformOrigin: `${b.cx}px ${b.cy}px` }}
          >
            {/* Drop line to x-axis */}
            <motion.line
              x1={b.cx} y1={b.cy} x2={b.cx} y2={185}
              stroke="rgba(96,37,245,0.12)" strokeWidth="1" strokeDasharray="2 3"
              initial={{ scaleY: 0 }}
              animate={phase >= 2 ? { scaleY: 1 } : {}}
              transition={{ delay: i * 0.12 + 0.4, duration: 0.4 }}
              style={{ transformOrigin: `${b.cx}px ${b.cy}px` }}
            />
            {/* Outer glow ring for early adopter */}
            {b.early && (
              <>
                <motion.circle cx={b.cx} cy={b.cy} r={22}
                  fill="none" stroke="#6025f5" strokeWidth="1"
                  animate={{ r: [22, 30, 22], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <motion.circle cx={b.cx} cy={b.cy} r={18}
                  fill="none" stroke="#6025f5" strokeWidth="0.5" strokeDasharray="3 3"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: `${b.cx}px ${b.cy}px` }}
                />
              </>
            )}
            {/* Node circle */}
            <circle cx={b.cx} cy={b.cy} r={b.size}
              fill="white"
              stroke={b.early ? "#6025f5" : "rgba(0,0,0,0.12)"}
              strokeWidth={b.early ? 2 : 1.5}
              filter="url(#nodeShadow)"
            />
            <text x={b.cx} y={b.cy + 3.5} textAnchor="middle"
              fontSize={b.early ? "7" : "6.5"} fontWeight="800"
              fill={b.early ? "#6025f5" : "rgba(0,0,0,0.55)"}
              fontFamily="var(--font-inter), monospace"
            >
              {b.price}
            </text>
          </motion.g>
        ))}

        {/* "You are here" annotation for early buyer */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={phase >= 3 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <line x1="70" y1="142" x2="48" y2="155" stroke="#6025f5" strokeWidth="1" strokeDasharray="3 2" />
          <rect x="72" y="132" width="62" height="16" rx="4" fill="#6025f5" />
          <text x="103" y="143" textAnchor="middle" fontSize="7" fontWeight="700" fill="white" fontFamily="var(--font-inter), sans-serif">
            Early → 61× upside
          </text>
        </motion.g>
      </svg>

      {/* Bottom stats row */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
        className="flex items-center gap-2 mt-1"
      >
        {[
          { label: "Early Price", value: "$1.20" },
          { label: "Current", value: "$61.20" },
          { label: "Upside", value: "51×", highlight: true },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: "8px", padding: "8px 10px",
            background: s.highlight ? "linear-gradient(135deg, rgba(96,37,245,0.08), rgba(255,85,85,0.06))" : "rgba(0,0,0,0.04)",
            border: s.highlight ? "1px solid rgba(96,37,245,0.2)" : "1px solid rgba(0,0,0,0.07)",
          }}>
            <div style={{ fontSize: "8px", fontWeight: "600", color: "rgba(0,0,0,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: "14px", fontWeight: "800", color: s.highlight ? "#6025f5" : "#111" }}>{s.value}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCENE 2 — AI AGENT (rich chat UI with context cards)
───────────────────────────────────────────────────────────────── */
const CONVO = [
  { role: "user", text: "Will you be dropping any exclusive coins this week?" },
  { role: "ai", text: "Friday drop confirmed — restricted batch. You'll need 10+ $LUNA to unlock access. Want me to set a reminder?" },
  { role: "user", text: "Yes please, and what's my current holding worth?" },
  { role: "ai", text: "Your 42 $LUNA is worth $184.80 at current price. Up 22% this week 📈" },
];

function AIAgentScene({ playing }: SceneProps) {
  const [visCount, setVisCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [contextVis, setContextVis] = useState(false);

  useEffect(() => {
    if (!playing) { setVisCount(0); setTyping(false); setContextVis(false); return; }
    const seq: [number, () => void][] = [
      [400, () => { setVisCount(1); setTyping(true); }],
      [1600, () => { setVisCount(2); setTyping(false); }],
      [2600, () => { setVisCount(3); setTyping(true); }],
      [3600, () => { setVisCount(4); setTyping(false); setContextVis(true); }],
    ];
    const ts = seq.map(([t, fn]) => setTimeout(fn, t));
    return () => ts.forEach(clearTimeout);
  }, [playing]);

  return (
    <div className="w-full select-none flex flex-col gap-3" style={{ minHeight: 'clamp(220px, 35vw, 300px)' }}>
      {/* Agent header card */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "10px 14px", borderRadius: "12px",
        background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.07)",
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: "10px",
          background: G,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "17px", fontWeight: "900", color: "#fff",
          fontFamily: "var(--font-cormorant), serif",
          flexShrink: 0,
          boxShadow: "0 4px 12px rgba(96,37,245,0.35)",
        }}>L</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#111" }}>Luna</span>
            <span style={{
              fontSize: "7.5px", fontWeight: "700", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#6025f5",
              border: "1px solid rgba(96,37,245,0.3)", borderRadius: "4px",
              padding: "1px 5px",
            }}>Agent</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }}
            />
            <span style={{ fontSize: "9px", color: "rgba(0,0,0,0.35)", letterSpacing: "0.05em" }}>Always active · 12,483 fans served</span>
          </div>
        </div>
        {/* Mini waveform */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px", height: 20 }}>
          {[3, 6, 9, 5, 7, 4, 8, 6, 3, 5].map((h, i) => (
            <motion.div key={i}
              animate={{ height: [h, h * 1.8, h] }}
              transition={{ duration: 0.6 + i * 0.08, repeat: Infinity, delay: i * 0.06 }}
              style={{ width: 2, borderRadius: "2px", background: "rgba(96,37,245,0.35)" }}
            />
          ))}
        </div>
      </div>

      {/* Chat messages */}
      <div style={{
        borderRadius: "12px", border: "1px solid rgba(0,0,0,0.07)",
        background: "rgba(255,255,255,0.6)", overflow: "hidden",
      }}>
        {/* Chat header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "8px 14px", borderBottom: "1px solid rgba(0,0,0,0.06)",
          background: "rgba(0,0,0,0.02)",
        }}>
          <span style={{ fontSize: "9px", fontWeight: "600", color: "rgba(0,0,0,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            DM · Fan @ARIA
          </span>
          <div style={{ display: "flex", gap: "4px" }}>
            {["#ff5f57", "#febc2e", "#28c840"].map(c => (
              <div key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
            ))}
          </div>
        </div>

        <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px", minHeight: 160 }}>
          {CONVO.slice(0, visCount).map((msg, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
            >
              <div style={{
                maxWidth: "80%",
                padding: "8px 12px",
                borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                background: msg.role === "user"
                  ? "linear-gradient(135deg, #6025f5, #8b5cf6)"
                  : "white",
                border: msg.role === "ai" ? "1px solid rgba(0,0,0,0.08)" : "none",
                boxShadow: msg.role === "user" ? "0 2px 12px rgba(96,37,245,0.25)" : "0 1px 4px rgba(0,0,0,0.06)",
                fontSize: "11.5px", lineHeight: "1.55",
                color: msg.role === "user" ? "white" : "#111",
                fontWeight: "450",
              }}>
                {msg.role === "ai" && i === visCount - 1
                  ? <Typewriter text={msg.text} active={true} speed={20} />
                  : msg.text
                }
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", gap: "4px", padding: "4px 0" }}>
              {[0, 1, 2].map(i => (
                <motion.div key={i}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }}
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(0,0,0,0.2)" }}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Context intelligence card */}
      <AnimatePresence>
        {contextVis && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              borderRadius: "10px", padding: "10px 14px",
              background: "linear-gradient(135deg, rgba(96,37,245,0.06), rgba(255,85,85,0.04))",
              border: "1px solid rgba(96,37,245,0.15)",
              display: "flex", alignItems: "center", gap: "10px",
            }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: "7px",
              background: "linear-gradient(135deg, rgba(96,37,245,0.15), rgba(255,85,85,0.1))",
              border: "1px solid rgba(96,37,245,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "13px",
            }}>⚡</div>
            <div>
              <div style={{ fontSize: "9px", fontWeight: "700", color: "#6025f5", letterSpacing: "0.1em", textTransform: "uppercase" }}>Agent Context</div>
              <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.5)", marginTop: "1px" }}>Responded to 3,241 fans today · avg 0.4s</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCENE 3 — REPUTATION (detailed constellation with badges)
───────────────────────────────────────────────────────────────── */
const REP_NODES = [
  { id: "hub", x: 185, y: 108, isHub: true, label: "LUNA", delay: 0, rank: null, badge: null },
  { id: "f1", x: 72, y: 52, isHub: false, label: "ARIA", delay: 0.3, rank: "Gold", badge: "🥇" },
  { id: "f2", x: 298, y: 52, isHub: false, label: "REX", delay: 0.5, rank: "Gold", badge: "🥇" },
  { id: "f3", x: 52, y: 168, isHub: false, label: "KAI", delay: 0.7, rank: "Silv", badge: "🥈" },
  { id: "f4", x: 318, y: 168, isHub: false, label: "SOL", delay: 0.9, rank: "Silv", badge: "🥈" },
  { id: "f5", x: 185, y: 210, isHub: false, label: "NOVO", delay: 1.1, rank: "Brnz", badge: "🥉" },
  { id: "f6", x: 122, y: 32, isHub: false, label: "VELA", delay: 1.3, rank: null, badge: null },
  { id: "f7", x: 248, y: 32, isHub: false, label: "MIRA", delay: 1.5, rank: null, badge: null },
];

function ReputationScene({ playing }: SceneProps) {
  const [show, setShow] = useState(false);
  const [pulseNode, setPulseNode] = useState(-1);

  useEffect(() => {
    if (!playing) { setShow(false); setPulseNode(-1); return; }
    const t = setTimeout(() => setShow(true), 300);
    // cycle through nodes pulsing
    let idx = 0;
    const iv = setInterval(() => {
      setPulseNode(idx % (REP_NODES.length - 1) + 1);
      idx++;
    }, 800);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [playing]);

  return (
    <div className="w-full select-none" style={{ height: 280 }}>
      <svg viewBox="0 0 370 240" className="w-full h-full">
        <defs>
          <linearGradient id="hubG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6025f5" />
            <stop offset="50%" stopColor="#ff5555" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="hubGlow">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Edges with animated signal pulses */}
        {REP_NODES.filter(n => !n.isHub).map((n, i) => {
          const hub = REP_NODES[0];
          const isActive = pulseNode === i + 1;
          return (
            <g key={n.id}>
              <motion.line
                x1={hub.x} y1={hub.y} x2={n.x} y2={n.y}
                stroke={isActive ? "rgba(96,37,245,0.4)" : "rgba(0,0,0,0.08)"}
                strokeWidth={isActive ? 2 : 1.5}
                strokeDasharray={isActive ? "none" : "4 5"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 0 }}
                transition={{ delay: n.delay, duration: 0.7 }}
              />
              {/* signal dot */}
              {show && isActive && (
                <motion.circle r="3" fill="#6025f5"
                  animate={{ cx: [hub.x, n.x], cy: [hub.y, n.y], opacity: [1, 1, 0] }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              )}
            </g>
          );
        })}

        {/* Fan nodes */}
        {REP_NODES.filter(n => !n.isHub).map((n, i) => {
          const isActive = pulseNode === i + 1;
          return (
            <motion.g key={n.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={show ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: n.delay, type: "spring", stiffness: 220, damping: 16 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              {isActive && (
                <motion.circle cx={n.x} cy={n.y} r={22}
                  fill="none" stroke="#6025f5" strokeWidth="1.5"
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.7 }}
                />
              )}
              <circle cx={n.x} cy={n.y} r={18}
                fill="white"
                stroke={isActive ? "#6025f5" : "rgba(0,0,0,0.1)"}
                strokeWidth={isActive ? 2 : 1}
                filter={isActive ? "url(#nodeGlow)" : "none"}
              />
              {/* Rank badge */}
              {n.rank && (
                <circle cx={n.x + 12} cy={n.y - 12} r={8}
                  fill="white" stroke="rgba(0,0,0,0.1)" strokeWidth="1"
                />
              )}
              {n.badge && (
                <text x={n.x + 12} y={n.y - 9} textAnchor="middle" fontSize="8">{n.badge}</text>
              )}
              <text x={n.x} y={n.y + 3} textAnchor="middle"
                fontSize="7" fontWeight="700"
                fill={isActive ? "#6025f5" : "rgba(0,0,0,0.45)"}
                fontFamily="var(--font-inter), monospace"
              >
                @{n.label}
              </text>
            </motion.g>
          );
        })}

        {/* Hub */}
        <motion.g
          initial={{ scale: 0 }}
          animate={show ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 160, damping: 14 }}
          style={{ transformOrigin: "185px 108px" }}
        >
          {/* Outer pulse rings */}
          {[1, 2, 3].map(i => (
            <motion.circle key={i} cx={185} cy={108} r={30 + i * 10}
              fill="none" stroke="rgba(96,37,245,0.12)" strokeWidth="1"
              animate={{ r: [30 + i * 10, 42 + i * 10, 30 + i * 10], opacity: [0.15, 0, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
          <circle cx={185} cy={108} r={32} fill="url(#hubG)" filter="url(#hubGlow)" />
          <circle cx={185} cy={108} r={30} fill="white" />
          <circle cx={185} cy={108} r={26} fill="url(#hubG)" fillOpacity="0.12" />
          <text x={185} y={104} textAnchor="middle" fontSize="9" fontWeight="800"
            fill="#6025f5" fontFamily="var(--font-inter), monospace" letterSpacing="0.08em">
            LUNA
          </text>
          <text x={185} y={116} textAnchor="middle" fontSize="6.5" fontWeight="600"
            fill="rgba(0,0,0,0.35)" fontFamily="var(--font-inter), sans-serif">
            Creator
          </text>
        </motion.g>
      </svg>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
        className="flex items-center justify-center gap-4 mt-1"
      >
        {[{ icon: "🥇", label: "Gold · 2 fans" }, { icon: "🥈", label: "Silver · 2 fans" }, { icon: "🥉", label: "Bronze · 1 fan" }].map(b => (
          <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "10px" }}>{b.icon}</span>
            <span style={{ fontSize: "9px", color: "rgba(0,0,0,0.35)", fontWeight: "600" }}>{b.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCENE 4 — WALLET CARD (kept, light theme version)
───────────────────────────────────────────────────────────────── */
function WalletScene({ playing }: SceneProps) {
  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState(0);
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    if (!playing) { setShow(false); setBalance(0); setTicker(0); return; }
    const t = setTimeout(() => {
      setShow(true);
      const end = 12450; const dur = 2200;
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        setBalance(Math.floor(p * end));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 500);
    const iv = setInterval(() => setTicker(p => p + 1), 2600);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [playing]);

  const ticks = ["+2.4%", "+0.8%", "+3.1%", "-0.3%", "+1.7%"];
  const currentTick = ticks[ticker % ticks.length];
  const isPos = currentTick.startsWith("+");

  // Asset rows
  const assets = [
    { name: "$LUNA", amount: "42.0", value: "$184.80", change: "+22%", color: "#6025f5" },
    { name: "ETH", amount: "1.2", value: "$4,102", change: "+3.4%", color: "#627EEA" },
    { name: "USDC", amount: "8,163", value: "$8,163", change: "0%", color: "#2775CA" },
  ];

  return (
    <div className="w-full select-none flex flex-col gap-3" style={{ minHeight: 'clamp(220px, 35vw, 300px)' }}>
      {/* Card */}
      <motion.div
        initial={{ rotateY: -22, rotateX: 12, scale: 0.84, opacity: 0 }}
        animate={show ? { rotateY: 0, rotateX: 0, scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", damping: 16, stiffness: 110 }}
        style={{
          width: "100%", maxWidth: 300, margin: "0 auto",
          aspectRatio: "1.7 / 1", borderRadius: "18px",
          position: "relative", overflow: "hidden",
          boxShadow: "0 20px 50px rgba(96,37,245,0.2), 0 0 0 1px rgba(96,37,245,0.15)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #1a0533 0%, #0d0122 50%, #180b35 100%)" }} />
        <div style={{
          position: "absolute", top: "-30%", right: "-10%", width: "60%", height: "70%",
          background: "radial-gradient(circle, rgba(96,37,245,0.5), transparent 70%)", borderRadius: "50%"
        }} />
        <div style={{
          position: "absolute", bottom: "-20%", left: "5%", width: "40%", height: "50%",
          background: "radial-gradient(circle, rgba(255,85,85,0.3), transparent 70%)", borderRadius: "50%"
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "18px 18px"
        }} />
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{
              width: 30, height: 30, borderRadius: "8px",
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: G }} />
            </div>
            <span style={{ fontSize: "8px", fontWeight: "700", color: "rgba(255,255,255,0.3)", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "var(--font-inter), monospace" }}>
              Terra Wallet
            </span>
          </div>
          <div>
            <div style={{ fontSize: "8px", fontWeight: "600", color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "var(--font-inter), monospace", marginBottom: 4 }}>
              Total Assets
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "26px", fontWeight: "800", color: "#fff", letterSpacing: "-0.03em", fontFamily: "var(--font-inter), monospace" }}>
                ${balance.toLocaleString()}
              </span>
              <AnimatePresence mode="wait">
                <motion.span key={currentTick}
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                  style={{ fontSize: "10px", fontWeight: "700", color: isPos ? "#4ade80" : "#f87171" }}
                >
                  {currentTick}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.18em", fontFamily: "var(--font-inter), monospace" }}>
              •••• •••• 1282
            </span>
            <div style={{
              fontSize: "7px", fontWeight: "800", color: "#facc15",
              border: "1px solid rgba(250,204,21,0.35)", borderRadius: "4px",
              padding: "2px 8px", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-inter), monospace"
            }}>
              Premium
            </div>
          </div>
        </div>
      </motion.div>

      {/* Asset breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        style={{ display: "flex", flexDirection: "column", gap: "6px" }}
      >
        {assets.map((a, i) => (
          <motion.div key={a.name}
            initial={{ opacity: 0, x: -12 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.2 + i * 0.1 }}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "8px 12px", borderRadius: "10px",
              background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.07)",
            }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: "8px",
              background: a.color + "18", border: `1px solid ${a.color}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "9px", fontWeight: "800", color: a.color, fontFamily: "var(--font-inter), monospace"
            }}>
              {a.name.replace("$", "")}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#111" }}>{a.name}</span>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#111" }}>{a.value}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2px" }}>
                <span style={{ fontSize: "9px", color: "rgba(0,0,0,0.35)" }}>{a.amount} held</span>
                <span style={{ fontSize: "9px", fontWeight: "700", color: a.change.startsWith("+") ? "#22c55e" : a.change === "0%" ? "rgba(0,0,0,0.3)" : "#ef4444" }}>{a.change}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCENE 5 — MINI APPS (spatial grid with detail preview)
───────────────────────────────────────────────────────────────── */
const APPS = [
  { name: "Store", icon: "↗", sub: "Merch drops", stat: "14 items", color: "#6025f5" },
  { name: "Watch", icon: "▶", sub: "Live events", stat: "3 live now", color: "#ff5555" },
  { name: "Quests", icon: "◆", sub: "Earn rewards", stat: "2 active", color: "#f59e0b" },
  { name: "Markets", icon: "▲", sub: "Predict outcomes", stat: "$2.1K pool", color: "#10b981" },
  { name: "Clubs", icon: "★", sub: "Access tiers", stat: "3 tiers", color: "#8b5cf6" },
  { name: "Drops", icon: "◉", sub: "NFT releases", stat: "Friday", color: "#ec4899" },
];

function MiniAppsScene({ playing }: SceneProps) {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(1); // start with Watch hovered

  useEffect(() => {
    if (!playing) { setShow(false); setHovered(1); return; }
    const t = setTimeout(() => setShow(true), 200);
    let idx = 1;
    const iv = setInterval(() => { idx = (idx + 1) % APPS.length; setHovered(idx); }, 1200);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [playing]);

  return (
    <div className="w-full select-none flex flex-col gap-3" style={{ minHeight: 'clamp(220px, 35vw, 300px)' }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
        {APPS.map((app, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={show ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: i * 0.07, type: "spring", stiffness: 260, damping: 18 }}
            onMouseEnter={() => setHovered(i)}
            style={{
              aspectRatio: "1",
              borderRadius: "14px",
              background: hovered === i ? `${app.color}0f` : "rgba(0,0,0,0.03)",
              border: `1px solid ${hovered === i ? app.color + "35" : "rgba(0,0,0,0.08)"}`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: "5px", cursor: "pointer", position: "relative", overflow: "hidden",
              transition: "all 0.25s ease",
            }}
          >
            {/* Top accent line */}
            <motion.div
              animate={{ scaleX: hovered === i ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: G, transformOrigin: "left", borderRadius: "2px 2px 0 0",
              }}
            />
            <span style={{
              fontSize: "20px", lineHeight: 1,
              color: hovered === i ? app.color : "rgba(0,0,0,0.25)",
              transition: "color 0.2s",
            }}>{app.icon}</span>
            <span style={{
              fontSize: "9px", fontWeight: "800", letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: hovered === i ? "#111" : "rgba(0,0,0,0.35)",
              transition: "color 0.2s",
            }}>{app.name}</span>
            <span style={{
              fontSize: "8px", fontWeight: "600",
              color: hovered === i ? app.color : "rgba(0,0,0,0.2)",
              transition: "color 0.2s",
            }}>{app.stat}</span>
          </motion.div>
        ))}
      </div>

      {/* Active app detail */}
      <AnimatePresence mode="wait">
        <motion.div key={hovered}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          style={{
            borderRadius: "12px", padding: "12px 16px",
            background: `${APPS[hovered]?.color}08`,
            border: `1px solid ${APPS[hovered]?.color}25`,
            display: "flex", alignItems: "center", gap: "12px",
          }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: "10px",
            background: `${APPS[hovered]?.color}18`,
            border: `1px solid ${APPS[hovered]?.color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "17px",
          }}>
            {APPS[hovered]?.icon}
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "#111" }}>{APPS[hovered]?.name}</div>
            <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.4)", marginTop: "2px" }}>{APPS[hovered]?.sub} · {APPS[hovered]?.stat}</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <div style={{
              fontSize: "9px", fontWeight: "700", color: APPS[hovered]?.color,
              border: `1px solid ${APPS[hovered]?.color}35`,
              borderRadius: "6px", padding: "4px 10px", letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              Open →
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCENE 6 — BITCOIN (layered architecture with live tx feed)
───────────────────────────────────────────────────────────────── */
const TX_FEED = [
  "0x3f…a1b2 · 42 $LUNA · ✓ settled",
  "0x9c…d4e5 · 180 $LUNA · ✓ settled",
  "0x7a…f8c3 · 12 $LUNA · ✓ settled",
  "0x2b…3d91 · 300 $LUNA · ✓ settled",
];

function BitcoinScene({ playing }: SceneProps) {
  const [seq, setSeq] = useState(0);
  const [txIdx, setTxIdx] = useState(0);

  useEffect(() => {
    if (!playing) { setSeq(0); setTxIdx(0); return; }
    const ts = [400, 1000, 1700, 2400].map((t, i) => setTimeout(() => setSeq(i + 1), t));
    const iv = setInterval(() => setTxIdx(p => p + 1), 1100);
    return () => { ts.forEach(clearTimeout); clearInterval(iv); };
  }, [playing]);

  const layers = [
    {
      idx: 1, label: "₿  Bitcoin Settlement", sub: "Immutable · 500 EH/s hashrate",
      bg: "linear-gradient(135deg, rgba(247,147,26,0.1), rgba(247,147,26,0.04))",
      border: "rgba(247,147,26,0.5)", labelColor: "#f7931a",
      tag: null,
    },
    {
      idx: 2, label: "Stacks L2", sub: "sBTC · Clarity contracts · BTC-anchored",
      bg: "linear-gradient(135deg, rgba(96,37,245,0.08), rgba(96,37,245,0.03))",
      border: "rgba(96,37,245,0.35)", labelColor: "#6025f5",
      tag: null,
    },
    {
      idx: 3, label: "Terra Application", sub: "Social speed · creator economy",
      bg: "rgba(0,0,0,0.03)",
      border: "rgba(0,0,0,0.15)", labelColor: "#111",
      tag: "Live",
    },
  ];

  return (
    <div className="w-full select-none flex flex-col gap-3" style={{ minHeight: 'clamp(220px, 35vw, 300px)' }}>
      {/* Stack — bottom to top visually = bottom rendered first */}
      <div style={{ display: "flex", flexDirection: "column-reverse", gap: "8px" }}>
        {layers.map(l => (
          <motion.div key={l.idx}
            initial={{ opacity: 0, scaleX: 0.88, y: 10 }}
            animate={seq >= l.idx ? { opacity: 1, scaleX: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            style={{
              height: 60, borderRadius: "12px",
              background: l.bg,
              border: `1px solid ${l.border}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 18px", position: "relative", overflow: "hidden",
            }}
          >
            {/* Shimmer for Bitcoin layer */}
            {l.idx === 1 && seq >= 1 && (
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(90deg, transparent, rgba(247,147,26,0.12), transparent)",
                  width: "50%",
                }}
              />
            )}
            <div>
              <div style={{ fontSize: "12px", fontWeight: "800", color: l.labelColor, letterSpacing: "0.04em" }}>{l.label}</div>
              <div style={{ fontSize: "9px", color: "rgba(0,0,0,0.35)", marginTop: "2px", fontFamily: "var(--font-inter), monospace" }}>{l.sub}</div>
            </div>
            {l.tag && seq >= 3 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
                style={{
                  fontSize: "8px", fontWeight: "800",
                  background: "linear-gradient(135deg, #6025f5, #ff5555)",
                  color: "white",
                  borderRadius: "5px", padding: "3px 10px",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                {l.tag}
              </motion.div>
            )}
            {/* Layer index */}
            <div style={{
              position: "absolute", right: l.tag ? 60 : 16, top: "50%", transform: "translateY(-50%)",
              width: 20, height: 20, borderRadius: "5px",
              background: l.idx === 1 ? "rgba(247,147,26,0.12)" : l.idx === 2 ? "rgba(96,37,245,0.1)" : "rgba(0,0,0,0.05)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "9px", fontWeight: "800", color: l.labelColor, opacity: 0.6,
            }}>
              L{l.idx}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Connector arrow between layers */}
      {seq >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: "center", fontSize: "11px",
            color: "rgba(0,0,0,0.2)", letterSpacing: "0.1em", marginTop: "-4px",
          }}
        >
        </motion.div>
      )}

      {/* Live tx feed */}
      {seq >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            borderRadius: "10px", border: "1px solid rgba(0,0,0,0.07)",
            background: "rgba(0,0,0,0.02)", overflow: "hidden",
          }}
        >
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "7px 12px", borderBottom: "1px solid rgba(0,0,0,0.05)",
          }}>
            <span style={{ fontSize: "8px", fontWeight: "700", color: "rgba(0,0,0,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Live settlement feed
            </span>
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }}
              style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: "8px", color: "#22c55e", fontWeight: "700" }}>Live</span>
            </motion.div>
          </div>
          <div style={{ padding: "6px 12px", height: 56, overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div key={txIdx % TX_FEED.length}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3 }}
              >
                {[0, 1].map(offset => {
                  const idx = (txIdx + offset) % TX_FEED.length;
                  return (
                    <div key={idx} style={{
                      fontSize: "9.5px", color: "rgba(0,0,0,0.5)",
                      fontFamily: "var(--font-inter), monospace",
                      padding: "3px 0",
                      borderBottom: offset === 0 ? "1px solid rgba(0,0,0,0.05)" : "none",
                    }}>
                      {TX_FEED[idx]}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   STAGE CONFIG
───────────────────────────────────────────────────────────────── */
const STAGES = [
  { id: "coins", step: "01", label: "Creator Coins", headline: "Buy early.\nEarn as your\ncreator grows.", body: "Bonding curves ensure the first believers pay the least. Every new supporter drives the price — and your position — higher.", tab: "Early believers earn the most upside." },
  { id: "agents", step: "02", label: "AI Agents", headline: "Your creator,\nalways online\nvia AI.", body: "Every creator deploys an AI Agent trained in their voice. Fans get real, personalised responses 24/7 — no creator required.", tab: "Personalised fan interactions, always on." },
  { id: "reputation", step: "03", label: "Reputation", headline: "Your loyalty,\non-chain and\nverifiable.", body: "Every action builds your on-chain identity. Earn badges, unlock access tiers, and prove your standing in any community.", tab: "On-chain identity built from every interaction." },
  { id: "wallet", step: "04", label: "Terra Wallet", headline: "One wallet.\nCoins, NFTs,\nbadges. Yours.", body: "No seed phrases. No gas fees. A wallet that feels like a bank account — holding creator coins, NFTs, and badges in one place.", tab: "No keys. No gas. Just yours." },
  { id: "miniapps", step: "05", label: "Mini Apps", headline: "A platform\ninside the\nplatform.", body: "Creators launch mini apps — merch stores, watch parties, quest systems, prediction markets — all natively inside Terra.", tab: "The complete creator ecosystem." },
  { id: "bitcoin", step: "06", label: "Built on Bitcoin", headline: "Bitcoin's\nsecurity.\nTerra's speed.", body: "Stacks settles every transaction to Bitcoin. Terra runs at social speed while inheriting the security of the most battle-tested chain.", tab: "Settled to Bitcoin. Every time." },
];

const STEP_DURATION = 8000;

interface ScenePanelProps {
  stageId: string;
  playing: boolean;
}

function ScenePanel({ stageId, playing }: ScenePanelProps) {
  switch (stageId) {
    case "coins": return <BondingCurveScene playing={playing} />;
    case "agents": return <AIAgentScene playing={playing} />;
    case "reputation": return <ReputationScene playing={playing} />;
    case "wallet": return <WalletScene playing={playing} />;
    case "miniapps": return <MiniAppsScene playing={playing} />;
    case "bitcoin": return <BitcoinScene playing={playing} />;
    default: return null;
  }
}

/* ─────────────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────────────── */
export default function TerraShowcase() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  useEffect(() => {
    setPlaying(false);
    const t = setTimeout(() => setPlaying(true), 80);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setActive(p => (p + 1) % STAGES.length), STEP_DURATION);
    return () => clearInterval(id);
  }, [isInView]);

  const stage = STAGES[active];

  return (
    <section ref={sectionRef} className="w-full py-12 md:py-24 bg-[#F3F4F4] overflow-hidden font-[family-name:var(--font-inter)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          style={{ marginBottom: 32 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 18,
            padding: "4px 12px", borderRadius: "100px",
            background: "rgba(96,37,245,0.08)",
            border: "1px solid rgba(96,37,245,0.18)",
          }}>
            <span style={{ fontSize: "10px", fontWeight: "700", color: "#6025f5", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              The Ecosystem
            </span>
          </div>
          <h2 style={{
            fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: "300",
            color: "#111", lineHeight: "1.08", letterSpacing: "-0.03em", margin: 0,
          }}>
            Built for the new economy.{" "}
            <em style={{ fontWeight: "500", fontStyle: "italic", fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", background: "linear-gradient(90deg, #6025f5 0%, #ff5555 50%, #facc15 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Secured by Bitcoin.
            </em>
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderRadius: "28px 28px 0 0", overflow: "hidden",
            background: "F7F7F7",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05), 0 12px 48px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {/* Chrome bar */}
          <div className="flex-shrink-0 h-9 flex items-center px-3 md:px-6 gap-2 md:gap-3 relative" style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 22px", borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}>
            <div style={{ display: "flex", gap: 7 }}>
              {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "8px", padding: "5px 16px",
              }}>
                <span style={{ fontSize: "9px", color: "rgba(0,0,0,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: "600" }}>
                  terra.app
                </span>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ width: 5, height: 5, borderRadius: "50%", background: "#6025f5" }} />
                <span style={{ fontSize: "9px", fontWeight: "700", color: "rgba(0,0,0,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {stage.step} / {STAGES.length}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Body */}
          <div className="flex flex-col md:flex-row" style={{ minHeight: 'clamp(380px, 50vh, 500px)' }}>
            {/* Left */}
            <div className="w-full md:w-[40%] md:flex-shrink-0 p-6 md:p-11 border-b md:border-b-0 md:border-r border-black/[0.06] flex flex-col justify-center relative overflow-hidden">
              <div style={{
                position: "absolute", left: "-60px", top: "-40px",
                width: 220, height: 220,
                background: "radial-gradient(circle, rgba(96,37,245,0.06), transparent 70%)",
                pointerEvents: "none",
              }} />
              <AnimatePresence mode="wait">
                <motion.div key={active}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 14 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <div style={{
                    fontSize: "9px", fontWeight: "800", color: "#6025f5",
                    letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 20,
                  }}>
                    Step {stage.step}
                  </div>
                  <h3 style={{
                    fontSize: "clamp(1.7rem, 2.5vw, 2.5rem)", fontWeight: "300",
                    color: "#111", lineHeight: "1.08", letterSpacing: "-0.025em",
                    margin: "0 0 20px", whiteSpace: "pre-line",
                  }}>
                    {stage.headline}
                  </h3>
                  <p style={{
                    fontSize: "13.5px", color: "rgba(0,0,0,0.42)", lineHeight: "1.75",
                    margin: "0 0 32px", maxWidth: 300,
                  }}>
                    {stage.body}
                  </p>
                  <motion.div whileHover={{ x: 4 }}
                    style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <span style={{ fontSize: "10px", fontWeight: "700", color: "rgba(0,0,0,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      Learn more
                    </span>
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M1 5h12M8 1l4 4-4 4" stroke="rgba(0,0,0,0.3)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right scene */}
            <div className="w-full md:flex-1 flex items-start justify-center relative overflow-hidden p-4 md:p-9">
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(55% 55% at 50% 50%, rgba(255,255,255,0.6), transparent)",
              }} />
              <div className="relative w-full max-w-[300px] md:max-w-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div key={active}
                    initial={{ opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <ScenePanel stageId={stage.id} playing={playing} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 2, background: "rgba(0,0,0,0.06)" }}>
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: STEP_DURATION / 1000, ease: "linear" }}
                style={{ height: "100%", background: G, transformOrigin: "left" }}
              />
            </AnimatePresence>
          </div>
        </motion.div>


      </div>
    </section>
  );
}
