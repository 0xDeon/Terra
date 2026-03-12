'use client'

const footerLinks = {
  Product: ["Garden", "Nodes", "Handles", "Claims"],
  Gardeners: ["Ecosystem", "Stats", "Governance", "DAO"],
  Developers: ["Documentation", "API", "SDKs", "GitHub"],
  Company: ["About", "Blog", "Privacy", "Terms"],
};

export function Footer() {
  return (
    <footer className="pb-12 pt-6 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#111] rounded-[48px] p-12 md:p-20 overflow-hidden relative">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6025f5]/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-20">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <span className="text-black font-black text-xl">T</span>
                  </div>
                  <span className="text-white font-black text-2xl tracking-tighter font-display">Terra</span>
                </div>
                <p className="text-white/40 text-sm font-medium leading-relaxed max-w-[200px]">
                  The social layer for the Bitcoin epoch. Cultivate your digital garden.
                </p>
              </div>

              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-8 font-display">{category}</h4>
                  <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-white/30 hover:text-white font-bold transition-colors text-sm font-display uppercase tracking-widest">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-8">
              <div className="flex items-center gap-6">
                <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] font-display">
                    &copy; {new Date().getFullYear()} Terra Labs. <span className="text-[#6025f5] italic font-alpina">Secured by Bitcoin.</span>
                </p>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/5 border border-green-500/20 rounded-full">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Mainnet Live</span>
                </div>
              </div>
              <div className="flex items-center gap-8 mt-8 md:mt-0">
                <a href="#" className="text-white/20 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="text-white/20 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
