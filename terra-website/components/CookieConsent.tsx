"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const G = "linear-gradient(90deg, #6025f5 0%, #ff5555 50%, #facc15 100%)";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (!isMounted) return;
    const consent = localStorage.getItem("terra-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isMounted]);

  const handleAccept = () => {
    localStorage.setItem("terra-cookie-consent", "accepted");
    setIsVisible(false);
    setHasInteracted(true);
  };

  const handleDecline = () => {
    localStorage.setItem("terra-cookie-consent", "declined");
    setIsVisible(false);
    setHasInteracted(true);
  };

  if (!isMounted || hasInteracted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 z-50 sm:w-[340px]"
        >
          <div className="rounded-[20px] overflow-hidden bg-white border border-black/[0.07] shadow-[0_8px_40px_rgba(0,0,0,0.1)]">

            {/* Gradient top strip */}
            <div className="h-[3px] w-full" style={{ background: G }} />

            <div className="p-5">
              {/* Title row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* Cookie + Stacks eclipse icon */}
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Cookie — half-eaten circle */}
                    <defs>
                      <clipPath id="cookie-bite">
                        {/* Full rect minus the Stacks circle bite */}
                        <path fillRule="evenodd" d="M0 0H40V40H0V0ZM29 11m-10.5 0a10.5 10.5 0 1 0 21 0a10.5 10.5 0 1 0 -21 0" />
                      </clipPath>
                    </defs>
                    <circle cx="17" cy="24" r="14" fill="#D4913D" clipPath="url(#cookie-bite)" />
                    {/* Cookie edge */}
                    <circle cx="17" cy="24" r="14" fill="none" stroke="#B8752A" strokeWidth="0.75" clipPath="url(#cookie-bite)" />
                    {/* Chocolate chips */}
                    <circle cx="12" cy="21" r="2" fill="#7A4210" clipPath="url(#cookie-bite)" />
                    <circle cx="19" cy="29" r="2" fill="#7A4210" clipPath="url(#cookie-bite)" />
                    <circle cx="10" cy="30" r="1.6" fill="#7A4210" clipPath="url(#cookie-bite)" />
                    <circle cx="20" cy="19" r="1.6" fill="#7A4210" clipPath="url(#cookie-bite)" />
                    <circle cx="14" cy="33" r="1.4" fill="#7A4210" clipPath="url(#cookie-bite)" />
                    {/* Stacks logo — eclipse overlay */}
                    <circle cx="29" cy="11" r="10.5" fill="#FC6432" />
                    {/* Stacks "S" — 3 horizontal bars */}
                    <rect x="24" y="7.5" width="10" height="2.2" rx="1.1" fill="white" />
                    <rect x="26" y="11.4" width="6.5" height="2.2" rx="1.1" fill="white" />
                    <rect x="24" y="15.3" width="10" height="2.2" rx="1.1" fill="white" />
                  </svg>
                  <span className="text-[13px] font-bold text-neutral-900 tracking-tight">Cookie Preferences</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-400">Privacy</span>
              </div>

              {/* Body */}
              <p className="text-[12px] leading-relaxed text-neutral-500 mb-4">
                We use cookies to improve your experience and analyse platform usage.
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleDecline}
                  className="flex-1 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 transition-colors duration-200"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] rounded-xl text-white bg-[#1a1a1a] hover:bg-black transition-colors duration-200 active:scale-95"
                >
                  Accept All
                </button>
              </div>

              {/* Privacy link */}
              <p className="text-center mt-3 text-[10px] text-neutral-400">
                Read our{' '}
                <a href="#" className="underline underline-offset-2 hover:text-neutral-700 transition-colors">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
