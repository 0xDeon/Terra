'use client'

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassSurface from './GlassSurface';


interface FeatureCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const FeatureCard = ({ title, description, children, className = "", delay = 0 }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={`bg-white rounded-[32px] md:rounded-[40px] border border-black/[0.04] overflow-hidden flex flex-col shadow-[0_16px_40px_-12px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:scale-[1.005] transition-all duration-700 ${className}`}
  >
    <div className="p-6 md:p-10 pb-3 md:pb-5">
      <h3 className="text-xl md:text-2xl font-semibold text-[#111] mb-3 font-sans tracking-tight">{title}</h3>
      <p className="text-sm md:text-base text-black/40 leading-relaxed max-w-[90%] font-sans font-medium">{description}</p>
    </div>
    <div className="flex-1 px-4 md:px-10 pb-4 md:pb-10 flex items-center justify-center overflow-hidden">
      {children}
    </div>
  </motion.div>
);


/* ─── Streaming Scene (Video Only) ─── */
const StreamScene = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  /* Cap video playback at 10 seconds then restart */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleTime = () => {
      if (video.currentTime >= 10) {
        video.currentTime = 0;
      }
    };
    video.addEventListener('timeupdate', handleTime);
    return () => video.removeEventListener('timeupdate', handleTime);
  }, []);

  return (
    <div className="w-full relative rounded-2xl md:rounded-3xl overflow-hidden bg-black aspect-video lg:aspect-auto lg:h-[400px] border border-black/[0.06]">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/streaming.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

/* ─── Messaging Scene (Animated Chat) ─── */
const COLE_AVATAR = '/j-cole.jpg';
const TMINUS_AVATAR = '/t-minus.jpg';
const ALBUM_COVER = '/falloff-album-cover.jpg';

const CHAT_SCRIPT: Array<{ from: 'cole' | 'tminus'; type: 'text' | 'voice' | 'image'; text?: string; voiceDuration?: number; imageSrc?: string }> = [
  { from: 'cole', type: 'text', text: 'Yo you heard The Fall Off yet?' },
  { from: 'tminus', type: 'text', text: 'Nah not yet, it dropped?' },
  { from: 'cole', type: 'image', imageSrc: ALBUM_COVER },
  { from: 'cole', type: 'text', text: 'Just dropped. This one different fr' },
  { from: 'tminus', type: 'text', text: 'BRO. This cover is hard.' },
  { from: 'tminus', type: 'voice', voiceDuration: 3.8 },
  { from: 'cole', type: 'text', text: 'Appreciate that bro, whole album on chain too' },
  { from: 'tminus', type: 'text', text: '🔥🔥🔥🔥🔥' },
];

const VoiceWaveform = ({ duration }: { duration: number }) => {
  const bars = 24;
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-[2px] h-6">
        {Array.from({ length: bars }).map((_, i) => (
          <motion.div
            key={i}
            className="w-[2px] bg-white/60 rounded-full"
            animate={{ height: [`${3 + Math.random() * 4}px`, `${8 + Math.random() * 14}px`, `${3 + Math.random() * 4}px`] }}
            transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.04 }}
          />
        ))}
      </div>
      <span className="text-[10px] text-white/50 font-medium tabular-nums">{duration.toFixed(1)}s</span>
    </div>
  );
};

const ColeAvatar = ({ className = '' }: { className?: string }) => (
  <img src={COLE_AVATAR} alt="J. Cole" className={`w-7 h-7 rounded-full shrink-0 object-cover ${className}`} />
);

const TMinusAvatar = ({ className = '' }: { className?: string }) => (
  <img src={TMINUS_AVATAR} alt="T-Minus" className={`w-7 h-7 rounded-full shrink-0 object-cover ${className}`} />
);

const MessageScene = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingFrom, setTypingFrom] = useState<'cole' | 'tminus'>('cole');
  const [plusOpen, setPlusOpen] = useState(false);
  const [galleryHighlight, setGalleryHighlight] = useState(false);
  const chatRef = React.useRef<HTMLDivElement>(null);

  // The image is at index 2 in CHAT_SCRIPT (cole sends album cover)
  const IMAGE_MSG_INDEX = 2;

  useEffect(() => {
    let idx = 0;
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timeouts.push(t);
      return t;
    };

    const scrollToBottom = () => {
      requestAnimationFrame(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
      });
    };

    const showNext = () => {
      if (cancelled) return;
      if (idx >= CHAT_SCRIPT.length) {
        schedule(() => {
          if (cancelled) return;
          setVisibleCount(0);
          setIsTyping(false);
          setPlusOpen(false);
          setGalleryHighlight(false);
          idx = 0;
          schedule(showNext, 800);
        }, 3000);
        return;
      }

      const msg = CHAT_SCRIPT[idx];

      // Before the image message: animate plus open -> highlight gallery -> then send
      if (idx === IMAGE_MSG_INDEX && msg.type === 'image') {
        // Step 1: Open the plus menu
        setPlusOpen(true);
        schedule(() => {
          if (cancelled) return;
          // Step 2: Highlight gallery icon
          setGalleryHighlight(true);
          schedule(() => {
            if (cancelled) return;
            // Step 3: Close menu, send the image
            setGalleryHighlight(false);
            setPlusOpen(false);
            idx++;
            setVisibleCount(idx);
            scrollToBottom();
            schedule(showNext, 1600);
          }, 800);
        }, 600);
        return;
      }

      setTypingFrom(msg.from);
      setIsTyping(true);

      const typingDelay = msg.type === 'voice' ? 1800 : 800 + Math.random() * 600;
      schedule(() => {
        if (cancelled) return;
        setIsTyping(false);
        idx++;
        setVisibleCount(idx);
        scrollToBottom();
        const nextDelay = msg.type === 'voice' ? 2200 : 1200 + Math.random() * 400;
        schedule(showNext, nextDelay);
      }, typingDelay);
    };

    schedule(showNext, 600);
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const visibleMessages = CHAT_SCRIPT.slice(0, visibleCount);

  return (
    <div className="w-full bg-[#fafafa] rounded-2xl md:rounded-3xl border border-black/[0.04] flex flex-col h-[320px] md:h-[380px]">
      {/* Chat header */}
      <div className="px-4 md:px-5 py-3 border-b border-black/[0.04] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ColeAvatar />
          <div>
            <div className="text-[11px] font-bold text-[#111]">Jermaine Cole</div>
            <div className="text-[9px] text-green-500 font-medium flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Online
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Voice call */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          {/* Video call */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </div>
      </div>

      {/* Messages area */}
      <div ref={chatRef} className="flex-1 px-3 md:px-4 py-3 md:py-4 space-y-3 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <AnimatePresence>
          {visibleMessages.map((msg, i) => {
            const isTminus = msg.from === 'tminus';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`flex gap-2 ${isTminus ? 'flex-row-reverse' : ''}`}
              >
                {!isTminus ? <ColeAvatar className="mt-auto" /> : <TMinusAvatar />}
                {msg.type === 'image' ? (
                  <div className={`max-w-[70%] rounded-[18px] ${isTminus ? 'rounded-br-md' : 'rounded-bl-md'} overflow-hidden shadow-md`}>
                    <img src={msg.imageSrc} alt="Shared" className="w-full h-auto object-cover" />
                  </div>
                ) : (
                  <div className={`max-w-[80%] px-3.5 py-2.5 ${isTminus ? 'bg-[#111] text-white rounded-[18px] rounded-br-md shadow-xl' : 'bg-white rounded-[18px] rounded-bl-md border border-black/[0.04] shadow-sm'}`}>
                    {msg.type === 'voice' ? (
                      <div className="flex items-center gap-2">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isTminus ? 'rgba(255,255,255,0.5)' : '#6025f5'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          <line x1="12" y1="19" x2="12" y2="23" />
                          <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                        <VoiceWaveform duration={msg.voiceDuration!} />
                      </div>
                    ) : (
                      <div className={`text-[11px] md:text-[12px] leading-relaxed font-medium ${isTminus ? '' : 'text-black/60'}`}>
                        {msg.text}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className={`flex gap-2 ${typingFrom === 'tminus' ? 'flex-row-reverse' : ''}`}
            >
              {typingFrom === 'cole' ? <ColeAvatar className="mt-auto" /> : <TMinusAvatar />}
              <div className={`px-4 py-3 rounded-[18px] ${typingFrom === 'tminus' ? 'bg-[#111] rounded-br-md' : 'bg-white rounded-bl-md border border-black/[0.04]'}`}>
                <div className="flex gap-1">
                  {[0, 1, 2].map(j => (
                    <motion.div
                      key={j}
                      className={`w-1.5 h-1.5 rounded-full ${typingFrom === 'tminus' ? 'bg-white/40' : 'bg-black/20'}`}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: j * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom spacer so last message never touches the input */}
        <div className="h-2 shrink-0" />
      </div>

      {/* Input area */}
      <div className="px-3 md:px-4 pb-3 md:pb-4 pt-2 border-t border-black/[0.04]">
        {/* Expandable attachment icons */}
        <AnimatePresence>
          {plusOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 px-1 pb-2">
                {/* Gallery */}
                <motion.div animate={galleryHighlight ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.4 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={galleryHighlight ? '#6025f5' : '#111'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={galleryHighlight ? 'opacity-100' : 'opacity-30'} style={{ transition: 'all 0.2s' }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </motion.div>
                {/* Camera */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                {/* Document */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                {/* Location */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {/* Sticker */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input row: plus + input + mic + send */}
        <div className="flex gap-2 items-center">
          {/* Plus / close button */}
          <motion.div
            animate={{ rotate: plusOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-9 md:w-10 h-9 md:h-10 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center shrink-0 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.div>
          <div className="flex-1 h-9 md:h-10 rounded-xl bg-white border border-black/[0.06] px-3 flex items-center">
            <span className="text-[10px] text-black/20 font-medium">Message...</span>
          </div>
          {/* Mic button */}
          <div className="w-9 md:w-10 h-9 md:h-10 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center shrink-0 cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          {/* Send button */}
          <div className="w-9 md:w-10 h-9 md:h-10 rounded-xl bg-[#111] flex items-center justify-center text-white shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Audio Player Content (inside GlassSurface) ─── */
const AudioPlayerContent = () => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 0.4));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentTime = ((progress / 100) * 230);
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  return (
    <div className="w-full flex flex-col gap-3 p-1">
      {/* Track info */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-black/[0.04] flex items-center justify-center shrink-0 overflow-hidden">
          <motion.div
            className="w-full h-full bg-gradient-to-br from-black/[0.06] to-transparent flex items-center justify-center"
            animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5" opacity={0.5}>
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </motion.div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs md:text-sm font-semibold text-[#111] truncate">Until I Found You</div>
          <div className="text-[10px] md:text-xs text-black/40 font-medium">Stephen Sanchez</div>
        </div>
        <div className="w-6 h-6 rounded-full bg-black/[0.04] flex items-center justify-center shrink-0">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" opacity={0.3}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="w-full h-1 bg-black/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-black/20 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[9px] text-black/30 font-medium tabular-nums">{formatTime(currentTime)}</span>
          <span className="text-[9px] text-black/30 font-medium tabular-nums">3:50</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 md:gap-6">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.15}>
          <polyline points="16 3 21 3 21 8" />
          <line x1="4" y1="20" x2="21" y2="3" />
          <polyline points="21 16 21 21 16 21" />
          <line x1="15" y1="15" x2="21" y2="21" />
          <line x1="4" y1="4" x2="9" y2="9" />
        </svg>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#111" opacity={0.3}>
          <path d="M19 20L9 12l10-8v16zM5 19V5h2v14H5z" />
        </svg>
        <motion.div
          className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          )}
        </motion.div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#111" opacity={0.3}>
          <path d="M5 4l10 8-10 8V4zm14-1h-2v14h2V5z" />
        </svg>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.15}>
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      </div>
    </div>
  );
};

/* ─── Content Feed Scene ─── */
const FeedScene = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['For You', 'Trending', 'Following'];
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(400);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(entries => {
      for (const e of entries) setContainerWidth(e.contentRect.width);
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full rounded-2xl md:rounded-3xl overflow-hidden min-h-[380px] md:min-h-[440px] relative" style={{ background: '#e8e8ec' }}>
      {/* Colored shapes behind — visible through glass distortion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large purple blob */}
        <motion.div
          className="absolute w-[220px] h-[220px] rounded-full"
          style={{ background: 'rgba(96,37,245,0.18)', filter: 'blur(50px)', top: '15%', left: '5%' }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Warm accent blob */}
        <motion.div
          className="absolute w-[180px] h-[180px] rounded-full"
          style={{ background: 'rgba(200,160,100,0.12)', filter: 'blur(60px)', top: '40%', right: '5%' }}
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Small purple accent */}
        <motion.div
          className="absolute w-[140px] h-[140px] rounded-full"
          style={{ background: 'rgba(96,37,245,0.1)', filter: 'blur(40px)', bottom: '5%', left: '35%' }}
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* White highlight */}
        <div className="absolute w-[300px] h-[200px] rounded-full" style={{ background: 'rgba(255,255,255,0.5)', filter: 'blur(80px)', top: '0%', left: '20%' }} />
      </div>

      <div className="relative z-10 p-4 md:p-6 flex flex-col gap-4 md:gap-5 h-full">
        {/* Feed tabs */}
        <div className="flex gap-1 rounded-xl p-1 self-start">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1.5 rounded-lg text-[10px] md:text-[11px] font-semibold transition-all ${
                i === activeTab
                  ? 'bg-white/80 text-[#111] shadow-sm'
                  : 'text-black/30 hover:text-black/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Trending post — also glass */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={16}
            brightness={60}
            opacity={0.95}
            blur={8}
            displace={0}
            distortionScale={-160}
            redOffset={0}
            greenOffset={8}
            blueOffset={16}
            backgroundOpacity={0.08}
            saturation={1.2}
            className="!items-start !justify-start"
          >
            <div className="flex items-center gap-3 w-full p-1">
              <div className="w-9 h-9 rounded-full bg-black/[0.06] flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-black/40">JC</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-[#111] truncate">New drop coming Friday</div>
                <div className="text-[9px] text-black/30 font-medium mt-0.5">2.4k likes &middot; 312 reposts</div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-black/15" />
                <span className="text-[9px] text-black/25 font-medium">12m</span>
              </div>
            </div>
          </GlassSurface>
        </motion.div>

        {/* Glass audio player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={24}
            brightness={55}
            opacity={0.93}
            blur={14}
            displace={0.3}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            backgroundOpacity={0.05}
            saturation={1.3}
          >
            <AudioPlayerContent />
          </GlassSurface>
        </motion.div>

        {/* Bottom stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-auto flex items-center justify-between px-1"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {[0.1, 0.07, 0.04].map((op, i) => (
                <div key={i} className="w-5 h-5 rounded-full border border-[#e8e8ec]" style={{ background: `rgba(0,0,0,${op})` }} />
              ))}
            </div>
            <span className="text-[9px] text-black/25 font-medium">12.4k listening</span>
          </div>
          <div className="flex items-center gap-1">
            {[10, 16, 12, 20, 14, 22, 18].map((h, i) => (
              <motion.div
                key={i}
                className="w-[3px] bg-black/10 rounded-full"
                style={{ height: h }}
                animate={{ height: [h, h + 6, h] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ─── Creator Economy Scene ─── */
const COINS = [
  { name: 'COLE', price: '2.84', change: '+12.4%', holders: '14.2k', mcap: '$4.1M' },
  { name: 'DRAKE', price: '1.92', change: '+8.7%', holders: '22.8k', mcap: '$6.3M' },
  { name: 'RIRI', price: '3.41', change: '+21.2%', holders: '31.5k', mcap: '$9.8M' },
];

const CHART_POINTS = [40, 38, 42, 36, 44, 48, 45, 52, 49, 56, 54, 60, 58, 65, 62, 68, 72, 70, 76, 80];

const CreatorEconomyScene = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % COINS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const coin = COINS[activeIdx];

  // Build SVG path from chart points
  const w = 280;
  const h = 100;
  const stepX = w / (CHART_POINTS.length - 1);
  const pathD = CHART_POINTS.map((y, i) => `${i === 0 ? 'M' : 'L'}${i * stepX},${h - y}`).join(' ');
  const areaD = `${pathD} L${w},${h} L0,${h} Z`;

  return (
    <div className="w-full bg-[#111] rounded-[28px] md:rounded-[40px] p-5 md:p-8 flex flex-col gap-5 md:gap-6 min-h-[320px] md:min-h-[380px]">
      {/* Coin selector tabs */}
      <div className="flex gap-2">
        {COINS.map((c, i) => (
          <motion.button
            key={c.name}
            onClick={() => setActiveIdx(i)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
              i === activeIdx
                ? 'bg-white text-[#111]'
                : 'bg-white/[0.06] text-white/40 hover:text-white/60'
            }`}
            layout
          >
            ${c.name}
          </motion.button>
        ))}
      </div>

      {/* Price + change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={coin.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex items-baseline gap-3"
        >
          <span className="text-3xl md:text-4xl font-black text-white tracking-tight">{coin.price}</span>
          <span className="text-xs font-bold text-white/30">STX</span>
          <span className="text-xs font-bold text-white/50 ml-auto">{coin.change}</span>
        </motion.div>
      </AnimatePresence>

      {/* Animated chart */}
      <div className="flex-1 relative">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.08" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Area fill */}
          <motion.path
            d={areaD}
            fill="url(#chartFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          {/* Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
          {/* Pulse dot at end */}
          <motion.circle
            cx={w}
            cy={h - CHART_POINTS[CHART_POINTS.length - 1]}
            r="3"
            fill="white"
            animate={{ r: [3, 5, 3], opacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <AnimatePresence mode="wait">
          {[
            { label: 'Holders', value: coin.holders },
            { label: 'Market Cap', value: coin.mcap },
            { label: 'Vol 24h', value: '$128k' },
          ].map((stat, i) => (
            <motion.div
              key={`${coin.name}-${stat.label}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="text-center"
            >
              <div className="text-sm md:text-base font-bold text-white tracking-tight">{stat.value}</div>
              <div className="text-[8px] md:text-[9px] font-bold text-white/25 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating coin particles */}
      <div className="relative h-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/10"
            style={{ left: `${20 + i * 20}%`, bottom: 0 }}
            animate={{
              y: [-20, -60 - i * 15, -20],
              opacity: [0, 0.3, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const SocialFeatures = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-white overflow-hidden relative font-sans">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-1/4 left-1/4 w-[1000px] h-[1000px] border border-black rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-black rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-14 md:mb-24 lg:mb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-black/[0.02] via-black/[0.01] to-transparent blur-[120px] pointer-events-none" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-8xl font-light tracking-tighter text-[#111] mb-4 md:mb-5 leading-[0.9] font-sans"
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
            className="text-black/40 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-sans font-light px-4 sm:px-0"
          >
            All the social features you love, now with a built-in economy.
            Connect with your audience in real-time, secured by Bitcoin.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Card 1: Streaming */}
          <FeatureCard
            title="Live Streaming & Gifting"
            description="Broadcast in high definition with zero latency. Support creators with immediate on-chain settlement."
            className="lg:col-span-8"
            delay={0.1}
          >
            <StreamScene />
          </FeatureCard>

          {/* Card 2: Messaging */}
          <FeatureCard
            title="Sovereign Messaging"
            description="End-to-end encrypted chat with identity powered by Stacks."
            className="lg:col-span-4"
            delay={0.2}
          >
            <MessageScene />
          </FeatureCard>

          {/* Card 3: Content Feed */}
          <FeatureCard
            title="Premium Content Feed"
            description="A high-fidelity social feed where you own the algorithm and the data."
            className="lg:col-span-6"
            delay={0.3}
          >
            <FeedScene />
          </FeatureCard>

          {/* Card 4: Creator Economy */}
          <FeatureCard
            title="Creator Coins"
            description="Every creator gets a token. Fans invest, creators earn, value grows on-chain."
            className="lg:col-span-6"
            delay={0.4}
          >
            <CreatorEconomyScene />
          </FeatureCard>

        </div>

      </div>
    </section>
  );
};
