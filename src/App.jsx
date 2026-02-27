import React, { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

/* ─── SUPABASE ─────────────────────────────────────────── */
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ─── SOCIAL ICONS ─────────────────────────────────────── */
const SOCIAL_ICONS = {
  instagram: { label:"Instagram", color:"#E1306C", svg:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  twitter:   { label:"X / Twitter", color:"#e5e5e5", svg:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  youtube:   { label:"YouTube", color:"#FF0000", svg:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  tiktok:    { label:"TikTok", color:"#e5e5e5", svg:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
  facebook:  { label:"Facebook", color:"#1877F2", svg:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  linkedin:  { label:"LinkedIn", color:"#0A66C2", svg:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  github:    { label:"GitHub", color:"#e5e5e5", svg:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
  spotify:   { label:"Spotify", color:"#1DB954", svg:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg> },
  twitch:    { label:"Twitch", color:"#9146FF", svg:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg> },
  discord:   { label:"Discord", color:"#5865F2", svg:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.11 18.1.128 18.113a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg> },
  website:   { label:"Website", color:"#94a3b8", svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  email:     { label:"Email", color:"#94a3b8", svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
  custom:    { label:"Custom", color:"#94a3b8", svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> },
};
const ICON_KEYS = Object.keys(SOCIAL_ICONS);

const THEMES = [
  { id:"midnight", name:"Midnight", bg:"#080b14", accent:"#6366f1" },
  { id:"obsidian", name:"Obsidian", bg:"#09090b", accent:"#e4e4e7" },
  { id:"ocean",    name:"Ocean",    bg:"linear-gradient(135deg,#020b18 0%,#041830 100%)", accent:"#38bdf8" },
  { id:"aurora",   name:"Aurora",   bg:"linear-gradient(135deg,#04100d 0%,#041a15 100%)", accent:"#34d399" },
  { id:"dusk",     name:"Dusk",     bg:"linear-gradient(135deg,#0f0a1a 0%,#1a0a2e 100%)", accent:"#a78bfa" },
  { id:"ember",    name:"Ember",    bg:"linear-gradient(135deg,#120804 0%,#1e0c02 100%)", accent:"#f97316" },
];
const ACCENTS = ["#6366f1","#e4e4e7","#38bdf8","#34d399","#a78bfa","#f97316","#ec4899","#facc15"];
const LINK_STYLES = [
  { id:"bordered", name:"Bordered" },
  { id:"solid",    name:"Solid" },
  { id:"ghost",    name:"Ghost" },
  { id:"minimal",  name:"Minimal" },
];

function getRoute() {
  const path = window.location.pathname;
  if (path === "/" || path === "") return { page:"landing" };
  if (path === "/login") return { page:"auth" };
  if (path === "/demo") return { page:"demo" };
  // dashboard removed — redirect to landing
  if (path === "/dashboard") return { page:"landing" };
  const username = path.replace(/^\//, "");
  if (username) return { page:"profile", username };
  return { page:"landing" };
}
function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("popstate"));
}

/* ─── TOAST ─────────────────────────────────────────────── */
function Toast({ msg, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  const isErr = type === "error";
  return (
    <div style={{
      position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)",
      background: isErr ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.06)",
      backdropFilter:"blur(24px)",
      border:`1px solid ${isErr ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.1)"}`,
      borderRadius:10, padding:"11px 20px",
      fontSize:13, fontFamily:"'JetBrains Mono',monospace",
      color: isErr ? "#fca5a5" : "rgba(255,255,255,0.88)",
      zIndex:9999, boxShadow:"0 20px 60px rgba(0,0,0,0.6)",
      whiteSpace:"nowrap", animation:"lnyqToastIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      letterSpacing:"0.01em", display:"flex", alignItems:"center", gap:8
    }}>
      <span style={{fontSize:15}}>{isErr ? "⚠" : "✓"}</span>
      {msg}
    </div>
  );
}
function useToast() {
  const [toast, setToast] = useState(null);
  const show = useCallback((msg, type="success") => setToast({ msg, type, key:Date.now() }), []);
  const el = toast ? <Toast key={toast.key} msg={toast.msg} type={toast.type} onDone={() => setToast(null)} /> : null;
  return [el, show];
}


/* ─── SCROLL REVEAL HOOK ─────────────────────────────── */
function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── SCROLL REVEAL WRAPPER ─────────────────────────── */
function SR({ children, dir = "up", delay = 0, style = {} }) {
  const [ref, visible] = useScrollReveal(0.1);
  const base = { opacity: 0, transition: `opacity 0.75s ${delay * 0.1}s cubic-bezier(0.4,0,0.2,1), transform 0.75s ${delay * 0.1}s cubic-bezier(0.4,0,0.2,1)` };
  const hidden = { up: { transform: "translateY(40px)" }, left: { transform: "translateX(-40px)" }, right: { transform: "translateX(40px)" }, scale: { transform: "scale(0.9)" } };
  const shown = { opacity: 1, transform: "none" };
  return (
    <div ref={ref} style={{ ...base, ...(!visible ? hidden[dir] : {}), ...(visible ? shown : {}), ...style }}>
      {children}
    </div>
  );
}

/* ─── GLOBAL CSS ─────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&display=swap');

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth;height:100%}
  body{
    background:#000;
    color:#f1f5f9;
    font-family:'Outfit',sans-serif;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
    min-height:100%;
  }
  input,button,select,textarea{font-family:'JetBrains Mono',monospace}
  a{text-decoration:none;color:inherit}

  ::-webkit-scrollbar{width:5px;height:5px}
  ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:10px}
  ::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.15)}

  :root{
    --bg:#000000;
    --surface:#0a0a0a;
    --surface2:#111111;
    --surface3:#1a1a1a;
    --border:rgba(255,255,255,0.06);
    --border2:rgba(255,255,255,0.1);
    --border3:rgba(255,255,255,0.16);
    --text:rgba(255,255,255,0.95);
    --text2:rgba(255,255,255,0.5);
    --text3:rgba(255,255,255,0.22);
    --accent:#fff;
    --accent-glow:rgba(255,255,255,0.12);
    --mono:'JetBrains Mono',monospace;
    --display:'Orbitron',sans-serif;
    --sans:'Outfit',sans-serif;
    --radius:10px;
    --radius-sm:7px;
    --radius-lg:14px;
  }

  /* ── ANIMATIONS ── */
  @keyframes lnyqHeroWordIn{
    0%{opacity:0;transform:translateY(60px) skewY(3deg);filter:blur(6px)}
    100%{opacity:1;transform:translateY(0) skewY(0deg);filter:blur(0)}
  }
  @keyframes lnyqMarquee{
    0%{transform:translateX(0)}
    100%{transform:translateX(-50%)}
  }
  @keyframes lnyqGlowPulse{
    0%,100%{text-shadow:0 0 20px rgba(255,255,255,0.05)}
    50%{text-shadow:0 0 60px rgba(255,255,255,0.2),0 0 100px rgba(255,255,255,0.06)}
  }
  @keyframes lnyqScrollBounce{
    0%,100%{transform:translateX(-50%) translateY(0)}
    50%{transform:translateX(-50%) translateY(5px)}
  }
  @keyframes lnyqBorderFlow{
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
  }
  @keyframes lnyqFlicker{
    0%,95%,100%{opacity:1}
    97%{opacity:0.7}
  }
  @keyframes lnyqScanDown{
    0%{top:-2px;opacity:0}
    5%{opacity:1}
    95%{opacity:0.4}
    100%{top:100%;opacity:0}
  }

  @keyframes lnyqFadeUp{
    from{opacity:0;transform:translateY(20px)}
    to{opacity:1;transform:translateY(0)}
  }
  @keyframes lnyqFadeIn{from{opacity:0}to{opacity:1}}
  @keyframes lnyqSpin{to{transform:rotate(360deg)}}
  @keyframes lnyqToastIn{
    from{opacity:0;transform:translateX(-50%) translateY(8px) scale(0.95)}
    to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}
  }
  @keyframes lnyqSlideIn{
    from{opacity:0;transform:translateY(-8px)}
    to{opacity:1;transform:translateY(0)}
  }
  @keyframes lnyqShimmer{
    0%{background-position:-200% center}
    100%{background-position:200% center}
  }
  @keyframes lnyqPulse{
    0%,100%{opacity:1}50%{opacity:0.4}
  }
  @keyframes lnyqOrb1{
    0%,100%{transform:translate(0,0) scale(1)}
    33%{transform:translate(60px,-40px) scale(1.1)}
    66%{transform:translate(-30px,50px) scale(0.95)}
  }
  @keyframes lnyqOrb2{
    0%,100%{transform:translate(0,0) scale(1)}
    33%{transform:translate(-50px,30px) scale(0.9)}
    66%{transform:translate(40px,-60px) scale(1.05)}
  }
  @keyframes lnyqOrb3{
    0%,100%{transform:translate(0,0) scale(1)}
    50%{transform:translate(30px,20px) scale(1.08)}
  }
  @keyframes lnyqGridFlow{
    0%{opacity:0;transform:translateY(0)}
    10%{opacity:1}
    90%{opacity:1}
    100%{opacity:0;transform:translateY(-80px)}
  }
  @keyframes lnyqLineReveal{
    from{width:0}
    to{width:100%}
  }
  @keyframes lnyqLogoGlitch{
    0%,100%{clip-path:inset(0 0 100% 0);transform:translateY(-2px)}
    20%{clip-path:inset(20% 0 60% 0);transform:translateX(2px)}
    40%{clip-path:inset(50% 0 30% 0);transform:translateX(-2px)}
    60%{clip-path:inset(70% 0 10% 0);transform:translateY(2px)}
    80%{clip-path:inset(0 0 0 0);transform:none}
  }
  @keyframes lnyqTypewriter{
    from{width:0}
    to{width:100%}
  }
  @keyframes lnyqBlink{
    0%,100%{opacity:1}
    50%{opacity:0}
  }
  @keyframes lnyqCountUp{
    from{opacity:0;transform:translateY(10px)}
    to{opacity:1;transform:translateY(0)}
  }
  @keyframes lnyqRingRotate{
    from{transform:rotate(0deg)}
    to{transform:rotate(360deg)}
  }
  @keyframes lnyqRingRotateReverse{
    from{transform:rotate(0deg)}
    to{transform:rotate(-360deg)}
  }
  @keyframes lnyqDotFloat{
    0%,100%{transform:translateY(0)}
    50%{transform:translateY(-6px)}
  }
  @keyframes lnyqScanline{
    0%{top:-10%}
    100%{top:110%}
  }

  /* ── BUTTONS ── */
  .lnyq-btn{
    display:inline-flex;align-items:center;justify-content:center;gap:7px;
    padding:9px 18px;border-radius:var(--radius-sm);
    font-family:var(--mono);font-size:12px;font-weight:500;
    letter-spacing:0.04em;cursor:pointer;border:none;
    transition:all 0.2s cubic-bezier(0.4,0,0.2,1);
    white-space:nowrap;user-select:none;outline:none;
  }
  .lnyq-btn:active{transform:scale(0.96)}
  .lnyq-btn:disabled{opacity:0.35;cursor:not-allowed;transform:none!important;pointer-events:none}
  .lnyq-btn-primary{
    background:#fff;color:#000;
    box-shadow:0 0 0 0 rgba(255,255,255,0.15);
  }
  .lnyq-btn-primary:hover{
    background:rgba(255,255,255,0.88);
    box-shadow:0 0 24px rgba(255,255,255,0.15);
  }
  .lnyq-btn-secondary{
    background:rgba(255,255,255,0.06);
    border:1px solid var(--border2);
    color:var(--text);
  }
  .lnyq-btn-secondary:hover{background:rgba(255,255,255,0.1);border-color:var(--border3)}
  .lnyq-btn-ghost{
    background:transparent;border:1px solid transparent;color:var(--text2)
  }
  .lnyq-btn-ghost:hover{background:rgba(255,255,255,0.05);color:var(--text)}
  .lnyq-btn-danger{
    background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);color:#fca5a5
  }
  .lnyq-btn-danger:hover{background:rgba(239,68,68,0.14);border-color:rgba(239,68,68,0.35)}
  .lnyq-btn-sm{padding:7px 14px;font-size:11px;border-radius:6px}
  .lnyq-btn-xs{padding:5px 11px;font-size:10px;border-radius:5px}

  /* ── INPUTS ── */
  .lnyq-input{
    width:100%;
    background:var(--surface2);
    border:1px solid var(--border);
    border-radius:var(--radius-sm);
    padding:11px 14px;
    font-family:var(--mono);
    font-size:12.5px;
    color:var(--text);
    outline:none;
    letter-spacing:0.01em;
    transition:border-color 0.2s,box-shadow 0.2s;
    -webkit-appearance:none;
  }
  .lnyq-input:focus{
    border-color:rgba(255,255,255,0.3);
    box-shadow:0 0 0 3px rgba(255,255,255,0.05);
  }
  .lnyq-input::placeholder{color:var(--text3)}
  .lnyq-input:disabled{opacity:0.35;cursor:not-allowed}
  .lnyq-textarea{resize:vertical;min-height:90px;line-height:1.6}
  .lnyq-label{
    display:block;
    font-family:var(--mono);font-size:10.5px;font-weight:500;
    color:var(--text3);letter-spacing:0.1em;text-transform:uppercase;
    margin-bottom:7px;
  }

  /* ── CARDS ── */
  .lnyq-card{
    background:var(--surface);
    border:1px solid var(--border);
    border-radius:var(--radius-lg);
    transition:border-color 0.2s;
  }
  .lnyq-card:hover{border-color:var(--border2)}
  .lnyq-card-body{padding:22px}

  /* ── BADGE ── */
  .lnyq-badge{
    display:inline-flex;align-items:center;gap:5px;
    font-family:var(--mono);font-size:10px;font-weight:500;
    letter-spacing:0.08em;text-transform:uppercase;
    color:var(--text2);
    border:1px solid var(--border2);
    border-radius:20px;padding:4px 11px;
  }

  /* ── NAV ── */
  .lnyq-nav{
    position:fixed;top:0;left:0;right:0;z-index:100;
    display:flex;align-items:center;justify-content:space-between;
    padding:0 32px;height:60px;
    border-bottom:1px solid rgba(255,255,255,0.04);
    background:rgba(0,0,0,0.7);
    backdrop-filter:blur(20px);
    -webkit-backdrop-filter:blur(20px);
  }
  .lnyq-nav-logo{
    font-family:var(--display);font-size:22px;font-weight:800;
    letter-spacing:-0.02em;color:#fff;
    position:relative;
  }

  /* ── DASH LAYOUT ── */
  .lnyq-dash{display:flex;min-height:100vh;background:var(--bg)}
  .lnyq-sidebar{
    width:232px;flex-shrink:0;
    background:var(--surface);
    border-right:1px solid var(--border);
    display:flex;flex-direction:column;
    position:sticky;top:0;height:100vh;
    overflow-y:auto;
  }
  .lnyq-sidebar-logo{
    padding:0 20px;height:60px;
    display:flex;align-items:center;
    border-bottom:1px solid var(--border);
    font-family:var(--display);font-size:20px;font-weight:800;
    letter-spacing:-0.02em;color:#fff;
  }
  .lnyq-nav-section{padding:16px 12px 0}
  .lnyq-nav-section-label{
    font-family:var(--mono);font-size:9.5px;font-weight:500;
    color:var(--text3);letter-spacing:0.12em;text-transform:uppercase;
    padding:0 8px 10px;
  }
  .lnyq-nav-item{
    display:flex;align-items:center;gap:10px;
    padding:9px 10px;border-radius:var(--radius-sm);
    font-family:var(--sans);font-size:13px;font-weight:500;
    color:var(--text2);cursor:pointer;
    transition:all 0.15s ease;
    margin-bottom:2px;
    position:relative;
  }
  .lnyq-nav-item:hover{background:rgba(255,255,255,0.04);color:var(--text)}
  .lnyq-nav-item.lnyq-active{
    background:rgba(255,255,255,0.07);
    color:var(--text);
  }
  .lnyq-nav-item.lnyq-active::before{
    content:'';position:absolute;left:0;top:20%;bottom:20%;
    width:2.5px;border-radius:10px;background:#fff;
  }
  .lnyq-nav-icon{
    width:30px;height:30px;border-radius:7px;
    display:flex;align-items:center;justify-content:center;
    font-size:14px;flex-shrink:0;
    background:rgba(255,255,255,0.04);
    border:1px solid var(--border);
  }
  .lnyq-nav-item.lnyq-active .lnyq-nav-icon{
    background:rgba(255,255,255,0.1);
    border-color:rgba(255,255,255,0.2);
  }
  .lnyq-sidebar-foot{
    margin-top:auto;padding:16px;
    border-top:1px solid var(--border);
  }
  .lnyq-sidebar-avatar{
    width:32px;height:32px;border-radius:8px;
    background:var(--surface3);border:1px solid var(--border2);
    display:flex;align-items:center;justify-content:center;
    font-family:var(--mono);font-size:13px;font-weight:600;
    color:var(--text);flex-shrink:0;overflow:hidden;
  }
  .lnyq-sidebar-avatar img{width:100%;height:100%;object-fit:cover}

  /* ── MAIN CONTENT ── */
  .lnyq-main{
    flex:1;min-width:0;padding:28px 32px;
    max-width:740px;
  }
  .lnyq-page-title{
    font-family:var(--display);font-size:22px;font-weight:700;
    color:var(--text);letter-spacing:-0.02em;margin-bottom:4px;
  }
  .lnyq-page-sub{
    font-family:var(--mono);font-size:11px;color:var(--text3);
    letter-spacing:0.04em;margin-bottom:24px;
  }
  .lnyq-url-banner{
    display:flex;align-items:center;gap:10px;
    background:var(--surface);border:1px solid var(--border);
    border-radius:var(--radius-sm);padding:9px 14px;
    margin-bottom:24px;
  }
  .lnyq-url-dot{
    width:7px;height:7px;border-radius:50%;
    background:#34d399;flex-shrink:0;
    box-shadow:0 0 6px #34d399;
    animation:lnyqPulse 2s ease infinite;
  }
  .lnyq-url-text{
    font-family:var(--mono);font-size:11.5px;
    color:var(--text2);flex:1;min-width:0;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
    letter-spacing:0.02em;
  }

  /* ── LINK ROWS ── */
  .lnyq-link-row{
    background:var(--surface);border:1px solid var(--border);
    border-radius:var(--radius);margin-bottom:8px;
    overflow:hidden;transition:border-color 0.15s;
  }
  .lnyq-link-row:hover{border-color:var(--border2)}
  .lnyq-link-row-view{
    display:flex;align-items:center;gap:12px;
    padding:13px 16px;cursor:pointer;
  }
  .lnyq-link-row-edit{
    padding:16px;border-top:1px solid var(--border);
    background:var(--surface2);
  }
  .lnyq-link-drag{
    cursor:grab;color:var(--text3);
    user-select:none;flex-shrink:0;
    transition:color 0.15s;padding:4px;
  }
  .lnyq-link-drag:active{cursor:grabbing;color:var(--text2)}
  .lnyq-link-ico{
    width:36px;height:36px;border-radius:8px;
    border:1px solid var(--border);
    background:var(--surface2);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;
  }
  .lnyq-link-info{flex:1;min-width:0}
  .lnyq-link-title{
    font-family:var(--sans);font-size:14.5px;font-weight:600;
    color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
    margin-bottom:2px;
  }
  .lnyq-link-url{
    font-family:var(--mono);font-size:10.5px;color:var(--text3);
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;letter-spacing:0.01em;
  }
  .lnyq-link-clicks{
    font-family:var(--mono);font-size:10px;color:var(--text3);
    flex-shrink:0;letter-spacing:0.03em;
    background:var(--surface2);border:1px solid var(--border);
    padding:3px 9px;border-radius:20px;
  }

  /* ── ADD PANEL ── */
  .lnyq-add-panel{
    background:var(--surface);border:1px solid var(--border);
    border-radius:var(--radius);padding:20px;margin-top:8px;
    animation:lnyqSlideIn 0.2s ease;
  }
  .lnyq-add-panel-title{
    font-family:var(--sans);font-size:14px;font-weight:600;
    color:var(--text);margin-bottom:16px;
  }

  /* ── ICON PICKER ── */
  .lnyq-icon-grid{
    display:grid;grid-template-columns:repeat(auto-fill,minmax(42px,1fr));gap:6px;
  }
  .lnyq-icon-opt{
    aspect-ratio:1;border-radius:8px;background:var(--surface2);
    border:1px solid transparent;
    display:flex;align-items:center;justify-content:center;
    cursor:pointer;transition:all 0.15s ease;
  }
  .lnyq-icon-opt:hover{border-color:var(--border2);background:var(--surface3)}
  .lnyq-icon-opt.lnyq-sel{
    border-color:rgba(255,255,255,0.4);
    background:rgba(255,255,255,0.08);
    box-shadow:0 0 0 1px rgba(255,255,255,0.1);
  }

  /* ── STAT CARDS ── */
  .lnyq-stat-grid{
    display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));
    gap:10px;margin-bottom:24px;
  }
  .lnyq-stat-card{
    background:var(--surface);border:1px solid var(--border);
    border-radius:var(--radius);padding:18px;
    transition:border-color 0.2s,transform 0.2s;
  }
  .lnyq-stat-card:hover{border-color:var(--border2);transform:translateY(-1px)}
  .lnyq-stat-num{
    font-family:var(--display);font-size:34px;font-weight:700;
    letter-spacing:-2px;color:var(--text);line-height:1;margin-bottom:6px;
  }
  .lnyq-stat-label{
    font-family:var(--mono);font-size:10px;color:var(--text3);
    text-transform:uppercase;letter-spacing:0.08em;
  }

  /* ── BAR ROW ── */
  .lnyq-bar-row{
    display:flex;align-items:center;padding:12px 0;
    border-bottom:1px solid var(--border);gap:12px;
  }
  .lnyq-bar-row:last-child{border-bottom:none}
  .lnyq-bar-wrap{flex:1;height:2px;background:var(--surface2);border-radius:10px;overflow:hidden}
  .lnyq-bar-fill{height:100%;border-radius:10px;transition:width 0.8s cubic-bezier(0.4,0,0.2,1)}

  /* ── THEME GRID ── */
  .lnyq-theme-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px}
  .lnyq-theme-opt{
    border-radius:var(--radius);padding:10px;cursor:pointer;
    border:1px solid var(--border);background:var(--surface2);
    transition:all 0.15s;text-align:center;
  }
  .lnyq-theme-opt:hover{border-color:var(--border2);transform:translateY(-1px)}
  .lnyq-theme-opt.lnyq-sel{border-color:rgba(255,255,255,0.4);box-shadow:0 0 0 1px rgba(255,255,255,0.1)}
  .lnyq-theme-preview{height:38px;border-radius:6px;margin-bottom:8px;border:1px solid var(--border)}
  .lnyq-theme-name{font-family:var(--mono);font-size:10px;color:var(--text2);text-transform:uppercase;letter-spacing:0.06em}

  /* ── ACCENT DOTS ── */
  .lnyq-accent-row{display:flex;gap:9px;flex-wrap:wrap;align-items:center}
  .lnyq-accent-dot{
    width:26px;height:26px;border-radius:50%;cursor:pointer;
    border:2px solid transparent;transition:all 0.15s;
  }
  .lnyq-accent-dot:hover{transform:scale(1.15)}
  .lnyq-accent-dot.lnyq-sel{border-color:rgba(255,255,255,0.7);transform:scale(1.2)}

  /* ── LINK STYLE PICKER ── */
  .lnyq-link-style-opt{
    padding:8px 16px;border-radius:6px;cursor:pointer;
    border:1px solid var(--border);
    font-family:var(--mono);font-size:11px;letter-spacing:0.05em;
    text-transform:uppercase;transition:all 0.15s;color:var(--text2);
  }
  .lnyq-link-style-opt:hover{border-color:var(--border2);color:var(--text)}
  .lnyq-link-style-opt.lnyq-sel{
    border-color:rgba(255,255,255,0.35);color:var(--text);
    background:rgba(255,255,255,0.07);
  }

  /* ── AUTH ── */
  .lnyq-auth{
    min-height:100vh;background:var(--bg);
    display:flex;align-items:center;justify-content:center;padding:24px;
    position:relative;overflow:hidden;
  }
  .lnyq-auth::before{
    content:'';position:absolute;
    width:600px;height:600px;border-radius:50%;
    background:radial-gradient(circle,rgba(255,255,255,0.03) 0%,transparent 70%);
    top:-100px;left:50%;transform:translateX(-50%);
    pointer-events:none;
  }
  .lnyq-auth-card{
    width:100%;max-width:400px;position:relative;z-index:1;
    animation:lnyqFadeUp 0.4s ease;
  }
  .lnyq-auth-tabs{
    display:flex;background:var(--surface2);
    border:1px solid var(--border);border-radius:var(--radius-sm);
    overflow:hidden;margin-bottom:24px;padding:4px;gap:4px;
  }
  .lnyq-auth-tab{
    flex:1;text-align:center;padding:9px;
    font-family:var(--mono);font-size:11px;text-transform:uppercase;
    letter-spacing:0.06em;color:var(--text3);cursor:pointer;
    border-radius:5px;transition:all 0.15s;
  }
  .lnyq-auth-tab.lnyq-active{
    background:var(--surface3);color:var(--text);
    box-shadow:0 1px 3px rgba(0,0,0,0.3);
  }
  .lnyq-auth-err{
    background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);
    color:#fca5a5;font-family:var(--mono);font-size:11.5px;
    padding:11px 14px;border-radius:var(--radius-sm);
    margin-bottom:16px;letter-spacing:0.01em;
    animation:lnyqSlideIn 0.2s ease;
  }
  .lnyq-auth-ok{
    background:rgba(52,211,153,0.08);border:1px solid rgba(52,211,153,0.2);
    color:#6ee7b7;font-family:var(--mono);font-size:11.5px;
    padding:11px 14px;border-radius:var(--radius-sm);
    margin-bottom:16px;letter-spacing:0.01em;
  }

  /* ── SECTION LABEL ── */
  .lnyq-sec-label{
    font-family:var(--mono);font-size:10px;color:var(--text3);
    letter-spacing:0.12em;text-transform:uppercase;
    margin:24px 0 10px;
  }

  /* ── DIVIDER ── */
  .lnyq-divider{border:none;border-top:1px solid var(--border);margin:20px 0}

  /* ── 2-COL FORM ── */
  .lnyq-form-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px}

  /* ── PROFILE LINK BTN (public page) ── */
  .lnyq-profile-btn{
    width:100%;padding:14px 18px;border-radius:var(--radius);
    cursor:pointer;display:flex;align-items:center;gap:13px;
    transition:all 0.2s cubic-bezier(0.4,0,0.2,1);
    font-family:var(--sans);font-size:15px;font-weight:500;
    border:none;text-align:left;
  }

  /* ── LANDING SPECIFIC ── */
  .lnyq-landing-hero-text{
    font-family:var(--display);
    font-size:clamp(52px,9vw,110px);
    font-weight:900;
    line-height:0.95;
    letter-spacing:-0.04em;
    color:#fff;
  }
  .lnyq-landing-sub{
    font-family:var(--mono);
    font-size:14px;
    color:rgba(255,255,255,0.35);
    line-height:1.8;
    letter-spacing:0.01em;
  }
  .lnyq-grid-line{
    position:absolute;
    background:rgba(255,255,255,0.03);
    pointer-events:none;
  }
  .lnyq-feature-card{
    background:rgba(255,255,255,0.02);
    border:1px solid rgba(255,255,255,0.06);
    border-radius:16px;
    padding:28px;
    transition:border-color 0.3s, background 0.3s, transform 0.3s;
    cursor:default;
  }
  .lnyq-feature-card:hover{
    border-color:rgba(255,255,255,0.12);
    background:rgba(255,255,255,0.04);
    transform:translateY(-2px);
  }
  .lnyq-number-ticker{
    font-family:var(--display);
    font-size:clamp(36px,5vw,56px);
    font-weight:900;
    color:#fff;
    letter-spacing:-0.04em;
    line-height:1;
  }


  /* ── LANDING ENHANCED ── */
  .lnyq-nav-links{display:flex;align-items:center;gap:36px}
  .lnyq-nav-link{font-family:var(--mono);font-size:10px;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);cursor:pointer;transition:color 0.2s}
  .lnyq-nav-link:hover{color:rgba(255,255,255,0.75)}
  .lnyq-nav-logo{font-family:var(--display);font-size:18px;font-weight:900;letter-spacing:0.1em;color:#fff;text-transform:uppercase;animation:lnyqFlicker 10s ease infinite}
  .lnyq-btn-cta{
    display:inline-flex;align-items:center;justify-content:center;gap:10px;
    padding:16px 40px;border-radius:3px;
    font-family:var(--display);font-size:10px;font-weight:700;
    letter-spacing:0.14em;cursor:pointer;border:none;
    background:#fff;color:#000;text-transform:uppercase;
    position:relative;overflow:hidden;transition:all 0.25s ease;
  }
  .lnyq-btn-cta:hover{background:rgba(255,255,255,0.88);box-shadow:0 0 40px rgba(255,255,255,0.2),0 0 80px rgba(255,255,255,0.06);transform:translateY(-1px)}
  .lnyq-btn-cta:active{transform:scale(0.97)}
  .lnyq-btn-outline{
    display:inline-flex;align-items:center;justify-content:center;gap:10px;
    padding:15px 36px;border-radius:3px;
    font-family:var(--display);font-size:10px;font-weight:600;
    letter-spacing:0.14em;cursor:pointer;
    background:transparent;border:1px solid rgba(255,255,255,0.18);
    color:rgba(255,255,255,0.6);text-transform:uppercase;transition:all 0.25s ease;
  }
  .lnyq-btn-outline:hover{border-color:rgba(255,255,255,0.45);color:#fff;background:rgba(255,255,255,0.03)}
  .lnyq-section-tag{
    display:inline-flex;align-items:center;gap:8px;
    font-family:var(--mono);font-size:9px;letter-spacing:0.2em;
    text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:20px;
  }
  .lnyq-section-tag::before{content:'';display:inline-block;width:18px;height:1px;background:rgba(255,255,255,0.2)}
  .lnyq-section-heading{
    font-family:var(--display);font-size:clamp(26px,4vw,46px);
    font-weight:800;letter-spacing:0.04em;text-transform:uppercase;
    line-height:1.1;color:#fff;
  }
  .lnyq-grid-bg{
    position:fixed;inset:0;pointer-events:none;z-index:0;
    background-image:linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),
      linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
    background-size:80px 80px;
  }
  .lnyq-scan-line{
    position:fixed;left:0;right:0;height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent);
    pointer-events:none;z-index:1;top:-1px;
    animation:lnyqScanDown 10s linear infinite;
  }
  .lnyq-feature-card{
    background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.07);
    border-radius:2px;padding:32px;position:relative;overflow:hidden;
    transition:border-color 0.3s,background 0.3s;
  }
  .lnyq-feature-card::before{
    content:'';position:absolute;top:0;left:0;right:0;height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent);
    opacity:0;transition:opacity 0.3s;
  }
  .lnyq-feature-card:hover{border-color:rgba(255,255,255,0.13);background:rgba(255,255,255,0.03)}
  .lnyq-feature-card:hover::before{opacity:1}
  .lnyq-marquee-track{display:flex;gap:3px;animation:lnyqMarquee 32s linear infinite;width:max-content}
  .lnyq-testimonial-card{
    background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);
    border-radius:2px;padding:28px 32px;min-width:310px;max-width:340px;flex-shrink:0;
  }
  .lnyq-pricing-card{
    border:1px solid rgba(255,255,255,0.08);border-radius:2px;padding:40px 36px;
    background:rgba(255,255,255,0.01);position:relative;overflow:hidden;flex:1;
  }
  .lnyq-pricing-card.lnyq-featured{border-color:rgba(255,255,255,0.22);background:rgba(255,255,255,0.035)}
  .lnyq-step-num{
    font-family:var(--display);font-size:clamp(60px,8vw,90px);font-weight:900;
    letter-spacing:0.04em;color:rgba(255,255,255,0.04);line-height:1;
    position:absolute;top:-6px;right:20px;user-select:none;pointer-events:none;
  }

  /* ── RESPONSIVE ── */
  @media(max-width:768px){
    .lnyq-dash{flex-direction:column}
    .lnyq-sidebar{
      width:100%;height:auto;position:static;
      flex-direction:row;border-right:none;
      border-bottom:1px solid var(--border);
    }
    .lnyq-sidebar-logo{display:none}
    .lnyq-nav-section{
      display:flex;flex-direction:row;gap:4px;
      padding:8px;overflow-x:auto;width:100%;
    }
    .lnyq-nav-section-label{display:none}
    .lnyq-nav-item{
      flex-direction:column;gap:4px;min-width:64px;
      padding:8px 6px;font-size:9px;text-align:center;
    }
    .lnyq-nav-item::before{display:none!important}
    .lnyq-nav-icon{width:26px;height:26px;font-size:12px}
    .lnyq-sidebar-foot{display:none}
    .lnyq-main{padding:16px}
    .lnyq-form-2col{grid-template-columns:1fr}
    .lnyq-stat-grid{grid-template-columns:repeat(2,1fr)}
    .lnyq-nav{padding:0 16px}
  }
  @media(max-width:480px){
    .lnyq-stat-grid{grid-template-columns:repeat(2,1fr)}
    .lnyq-theme-grid{grid-template-columns:repeat(3,1fr)}
  }
`;

/* ─── ANIMATED CANVAS BACKGROUND ─────────────────────────── */
function AnimatedBackground() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // Particles
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.4 + 0.05,
    }));

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      frame++;

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.08;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0, zIndex: 0,
        pointerEvents: "none", opacity: 0.7
      }}
    />
  );
}

/* ─── TICKER (animated number) ───────────────────────────── */
function Ticker({ target, suffix = "", duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = Date.now();
      const tick = () => {
        const progress = Math.min((Date.now() - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setVal(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ─── LANDING ────────────────────────────────────────────── */
function MiniPreview() {
  const links = ["instagram", "youtube", "twitter", "spotify"];
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        width:64,height:64,borderRadius:6,
        background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
        margin:"0 auto 14px",display:"flex",alignItems:"center",justifyContent:"center",
        fontFamily:"var(--display)",fontSize:20,fontWeight:900,color:"#fff",letterSpacing:"0.1em"
      }}>J</div>
      <div style={{fontFamily:"var(--display)",fontSize:13,fontWeight:700,letterSpacing:"0.08em",marginBottom:4,color:"#fff",textTransform:"uppercase"}}>JANE.CREATES</div>
      <div style={{fontFamily:"var(--mono)",fontSize:8,color:"rgba(255,255,255,0.22)",marginBottom:22,letterSpacing:"0.1em",textTransform:"uppercase"}}>Digital creator</div>
      {links.map((key,i)=>{
        const ic=SOCIAL_ICONS[key];
        return(
          <div key={key} style={{
            background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:3,padding:"11px 14px",marginBottom:8,
            display:"flex",alignItems:"center",gap:10,
            animation:`lnyqFadeUp 0.4s ${i*0.07}s ease both`,transition:"all 0.2s"
          }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)";e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}}
          >
            <span style={{color:ic.color,display:"flex",flexShrink:0}}>{React.cloneElement(ic.svg,{width:15,height:15})}</span>
            <span style={{fontFamily:"var(--sans)",fontSize:13,fontWeight:500,color:"#fff"}}>{ic.label}</span>
            <span style={{marginLeft:"auto",fontSize:9,color:"rgba(255,255,255,0.2)"}}>↗</span>
          </div>
        );
      })}
    </div>
  );
}

function Landing({ session }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div style={{ minHeight:"100vh", background:"#000", position:"relative" }}>
      <style>{css}</style>

      {/* BG layers */}
      <div className="lnyq-grid-bg" />
      <div className="lnyq-scan-line" />
      <AnimatedBackground />
      <div style={{ position:"fixed",inset:0,zIndex:1,pointerEvents:"none", background:`radial-gradient(700px circle at ${mouse.x}px ${mouse.y}px,rgba(255,255,255,0.02),transparent 55%)`, transition:"background 0.08s" }} />

      {/* NAV */}
      <nav className="lnyq-nav" style={{ zIndex:101, background:`rgba(0,0,0,${Math.min(0.6+scrollY/200,0.92)})` }}>
        <div className="lnyq-nav-logo">Lnyq</div>
        <div className="lnyq-nav-links">
          <span className="lnyq-nav-link" onClick={()=>document.getElementById("features")?.scrollIntoView({behavior:"smooth"})}>Features</span>
          <span className="lnyq-nav-link" onClick={()=>document.getElementById("howitworks")?.scrollIntoView({behavior:"smooth"})}>How it works</span>
          
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button className="lnyq-btn lnyq-btn-primary lnyq-btn-sm" onClick={()=>navigate("/demo")}>View Demo →</button>
        </div>
      </nav>

      {/* ════════════════ HERO ════════════════ */}
      <section style={{ position:"relative",zIndex:2,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"120px 24px 100px",textAlign:"center",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-60%)",width:"70vw",height:"70vw",maxWidth:700,maxHeight:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,0.035) 0%,transparent 65%)",pointerEvents:"none" }} />

        {/* Status pill */}
        <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:2,padding:"6px 16px",fontFamily:"var(--mono)",fontSize:9,letterSpacing:"0.18em",color:"rgba(255,255,255,0.38)",textTransform:"uppercase",marginBottom:52,animation:"lnyqFadeUp 0.6s 0.05s ease both" }}>
          <span style={{width:5,height:5,borderRadius:"50%",background:"#34d399",display:"inline-block",boxShadow:"0 0 8px #34d399",animation:"lnyqPulse 2s ease infinite"}} />
          Try the interactive demo — no signup needed
        </div>

        {/* Headline */}
        <div style={{overflow:"hidden",marginBottom:4}}>
          <div style={{ fontFamily:"var(--display)",fontWeight:900,textTransform:"uppercase",fontSize:"clamp(42px,9vw,112px)",letterSpacing:"0.04em",lineHeight:0.92,color:"#fff",animation:"lnyqHeroWordIn 0.9s 0.1s cubic-bezier(0.16,1,0.3,1) both" }}>
            Your world.
          </div>
        </div>
        <div style={{overflow:"hidden",marginBottom:44}}>
          <div style={{ fontFamily:"var(--display)",fontWeight:900,textTransform:"uppercase",fontSize:"clamp(42px,9vw,112px)",letterSpacing:"0.04em",lineHeight:0.92,background:"linear-gradient(180deg,rgba(255,255,255,0.85) 0%,rgba(255,255,255,0.15) 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"lnyqHeroWordIn 0.9s 0.22s cubic-bezier(0.16,1,0.3,1) both" }}>
            One link.
          </div>
        </div>

        <p style={{ fontFamily:"var(--sans)",fontSize:16,fontWeight:300,color:"rgba(255,255,255,0.36)",lineHeight:1.75,maxWidth:440,margin:"0 auto 52px",letterSpacing:"0.01em",animation:"lnyqFadeUp 0.7s 0.38s ease both" }}>
          The link-in-bio built for creators who refuse to be average. One URL. Every platform. Real analytics. Zero friction.
        </p>

        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",animation:"lnyqFadeUp 0.7s 0.5s ease both"}}>
          <button className="lnyq-btn-cta" onClick={()=>navigate("/demo")}>View Demo →</button>
        </div>

        <div style={{ marginTop:36,display:"flex",alignItems:"center",gap:14,fontFamily:"var(--mono)",fontSize:9,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em",flexWrap:"wrap",justifyContent:"center",animation:"lnyqFadeUp 0.6s 0.65s ease both" }}>
          {["Free forever","No credit card","Live in 60s","10,000+ creators"].map((t,i)=>(
            <React.Fragment key={t}>
              {i>0&&<span style={{width:3,height:3,borderRadius:"50%",background:"rgba(255,255,255,0.12)",display:"inline-block"}}/>}
              <span>{t}</span>
            </React.Fragment>
          ))}
        </div>

        <div style={{position:"absolute",bottom:36,left:"50%",display:"flex",flexDirection:"column",alignItems:"center",gap:8,animation:"lnyqScrollBounce 2s ease infinite, lnyqFadeUp 0.6s 1s ease both"}}>
          <div style={{fontFamily:"var(--mono)",fontSize:8,letterSpacing:"0.2em",color:"rgba(255,255,255,0.15)",textTransform:"uppercase"}}>Scroll</div>
          <div style={{width:1,height:32,background:"linear-gradient(to bottom,rgba(255,255,255,0.15),transparent)"}}/>
        </div>
      </section>

      {/* ════════════════ METRICS ════════════════ */}
      <section style={{position:"relative",zIndex:2,padding:"0 24px 120px"}}>
        <SR dir="up">
          <div style={{maxWidth:960,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:2,overflow:"hidden"}}>
            {[
              {num:10000,suf:"+",label:"Active creators",sub:"and growing daily"},
              {num:2,suf:"M+",label:"Total link clicks",sub:"tracked in real time"},
              {num:99,suf:".9%",label:"Uptime guarantee",sub:"enterprise-grade infra"},
              {num:0,suf:"$",label:"To get started",sub:"no hidden fees, ever"},
            ].map((s,i)=>(
              <div key={i} style={{padding:"36px 28px",borderRight:i<3?"1px solid rgba(255,255,255,0.05)":"none",background:i%2===0?"rgba(255,255,255,0.01)":"transparent"}}>
                <div style={{fontFamily:"var(--display)",fontSize:"clamp(26px,3.5vw,42px)",fontWeight:900,color:"#fff",letterSpacing:"0.04em",lineHeight:1,marginBottom:8}}>
                  <Ticker target={s.num} suffix={s.suf}/>
                </div>
                <div style={{fontFamily:"var(--sans)",fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.55)",marginBottom:4}}>{s.label}</div>
                <div style={{fontFamily:"var(--mono)",fontSize:8,color:"rgba(255,255,255,0.18)",letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.sub}</div>
              </div>
            ))}
          </div>
        </SR>
      </section>

      {/* ════════════════ FEATURES ════════════════ */}
      <section id="features" style={{position:"relative",zIndex:2,padding:"0 24px 140px"}}>
        <div style={{maxWidth:1040,margin:"0 auto"}}>
          <SR dir="up">
            <div style={{marginBottom:68}}>
              <div className="lnyq-section-tag">Core capabilities</div>
              <h2 className="lnyq-section-heading">Built for the<br/><span style={{color:"rgba(255,255,255,0.25)"}}>next generation</span><br/>of creators.</h2>
            </div>
          </SR>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:2,marginBottom:2}}>
            <SR dir="left" delay={1}>
              <div className="lnyq-feature-card" style={{height:"100%"}}>
                <div style={{fontFamily:"var(--display)",fontSize:9,letterSpacing:"0.18em",color:"rgba(255,255,255,0.18)",textTransform:"uppercase",marginBottom:22}}>01 — Smart Detection</div>
                <div style={{fontFamily:"var(--display)",fontSize:"clamp(20px,2.8vw,32px)",fontWeight:800,color:"#fff",letterSpacing:"0.04em",textTransform:"uppercase",lineHeight:1.1,marginBottom:14}}>Auto icon<br/>recognition</div>
                <p style={{fontFamily:"var(--sans)",fontSize:14,color:"rgba(255,255,255,0.36)",lineHeight:1.75,marginBottom:28}}>Paste any URL and Lnyq instantly identifies the platform — Instagram, TikTok, YouTube, Spotify, GitHub and 8+ more. No manual work, ever.</p>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {["instagram","youtube","tiktok","spotify","twitter","github"].map(k=>{
                    const ic=SOCIAL_ICONS[k];
                    return(<div key={k} style={{width:34,height:34,borderRadius:5,border:"1px solid rgba(255,255,255,0.07)",background:"rgba(255,255,255,0.03)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:ic.color,display:"flex"}}>{React.cloneElement(ic.svg,{width:13,height:13})}</span></div>);
                  })}
                  <div style={{width:34,height:34,borderRadius:5,border:"1px solid rgba(255,255,255,0.07)",background:"rgba(255,255,255,0.03)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--mono)",fontSize:9,color:"rgba(255,255,255,0.25)"}}>+7</div>
                </div>
              </div>
            </SR>
            <SR dir="right" delay={1}>
              <div className="lnyq-feature-card" style={{height:"100%"}}>
                <div style={{fontFamily:"var(--display)",fontSize:9,letterSpacing:"0.18em",color:"rgba(255,255,255,0.18)",textTransform:"uppercase",marginBottom:22}}>02 — Analytics</div>
                <div style={{fontFamily:"var(--display)",fontSize:"clamp(20px,2.8vw,32px)",fontWeight:800,color:"#fff",letterSpacing:"0.04em",textTransform:"uppercase",lineHeight:1.1,marginBottom:14}}>Real click<br/>intelligence</div>
                <p style={{fontFamily:"var(--sans)",fontSize:14,color:"rgba(255,255,255,0.36)",lineHeight:1.75,marginBottom:28}}>Every click tracked per link, instantly. Know exactly which platform your audience uses most — and double down on what works.</p>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {[["Instagram",87],["YouTube",64],["TikTok",52],["Spotify",38]].map(([name,pct])=>(
                    <div key={name} style={{display:"flex",alignItems:"center",gap:10}}>
                      <span style={{fontFamily:"var(--mono)",fontSize:8,color:"rgba(255,255,255,0.25)",width:52,textTransform:"uppercase",letterSpacing:"0.06em"}}>{name}</span>
                      <div style={{flex:1,height:3,background:"rgba(255,255,255,0.05)",borderRadius:2,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:"rgba(255,255,255,0.4)",borderRadius:2}}/></div>
                      <span style={{fontFamily:"var(--mono)",fontSize:9,color:"rgba(255,255,255,0.22)",width:24,textAlign:"right"}}>{pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SR>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2}}>
            {[
              {num:"03",title:`Full\ncustomization`,desc:"6 themes, 8 accent colors, 4 link styles. Every pixel crafted to represent your brand — without touching a line of code.",extra:<div style={{display:"flex",gap:6,marginTop:18}}>{["#6366f1","#34d399","#38bdf8","#f97316","#a78bfa","#ec4899"].map(c=><div key={c} style={{width:18,height:18,borderRadius:"50%",background:c}}/>)}</div>},
              {num:"04",title:`Mobile\nperfect`,desc:"Sub-second load times and pixel-perfect rendering on every device. Your audience has a seamless experience no matter where they are.",extra:<div style={{marginTop:18,fontFamily:"var(--mono)",fontSize:8,color:"rgba(255,255,255,0.18)",letterSpacing:"0.1em",textTransform:"uppercase"}}>Avg load time: &lt; 0.8s</div>},
              {num:"05",title:`Enterprise\nsecurity`,desc:"Row-level security via Supabase. Your data is private, encrypted, and never sold. We make money when you win — not from your data.",extra:<div style={{marginTop:18,fontFamily:"var(--mono)",fontSize:8,color:"rgba(52,211,153,0.55)",letterSpacing:"0.1em",textTransform:"uppercase"}}>✓ SOC2 compliant infrastructure</div>},
            ].map(({num,title,desc,extra},i)=>(
              <SR key={num} dir="up" delay={i+1}>
                <div className="lnyq-feature-card">
                  <div style={{fontFamily:"var(--display)",fontSize:8,letterSpacing:"0.18em",color:"rgba(255,255,255,0.15)",textTransform:"uppercase",marginBottom:18}}>{num}</div>
                  <div style={{fontFamily:"var(--display)",fontSize:"clamp(16px,2vw,22px)",fontWeight:800,color:"#fff",letterSpacing:"0.04em",textTransform:"uppercase",lineHeight:1.15,marginBottom:12,whiteSpace:"pre-line"}}>{title}</div>
                  <p style={{fontFamily:"var(--sans)",fontSize:13,color:"rgba(255,255,255,0.32)",lineHeight:1.7}}>{desc}</p>
                  {extra}
                </div>
              </SR>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ LIVE PREVIEW ════════════════ */}
      <section style={{position:"relative",zIndex:2,padding:"0 24px 140px"}}>
        <div style={{maxWidth:1040,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
            <SR dir="left">
              <div>
                <div className="lnyq-section-tag">Live preview</div>
                <h2 className="lnyq-section-heading" style={{marginBottom:22}}>Your profile,<br/><span style={{color:"rgba(255,255,255,0.25)"}}>perfected.</span></h2>
                <p style={{fontFamily:"var(--sans)",fontSize:15,color:"rgba(255,255,255,0.35)",lineHeight:1.75,marginBottom:32}}>A clean, fast, beautiful page that makes people want to click everything. Your links. Your icons. Your colors. Your identity.</p>
                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  {[
                    {icon:"◎",text:"One link to rule them all — bio, email signature, business card, everywhere."},
                    {icon:"⬡",text:"Paste any URL. Platform detected. Icon shown. No manual selection needed."},
                    {icon:"▤",text:"Real-time analytics. See every click as it happens. Know your audience."},
                    {icon:"◈",text:"6 themes + 8 accent colors. Make your page unmistakably yours in minutes."},
                  ].map((item,i)=>(
                    <SR key={i} dir="left" delay={i+1}>
                      <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                        <div style={{width:30,height:30,borderRadius:3,flexShrink:0,border:"1px solid rgba(255,255,255,0.07)",background:"rgba(255,255,255,0.02)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--display)",fontSize:10,color:"rgba(255,255,255,0.35)"}}>{item.icon}</div>
                        <p style={{fontFamily:"var(--sans)",fontSize:14,color:"rgba(255,255,255,0.42)",lineHeight:1.65,paddingTop:4}}>{item.text}</p>
                      </div>
                    </SR>
                  ))}
                </div>
              </div>
            </SR>
            <SR dir="right">
              <div style={{background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:2,padding:"48px 36px"}}>
                <MiniPreview/>
              </div>
            </SR>
          </div>
        </div>
      </section>

      {/* ════════════════ HOW IT WORKS ════════════════ */}
      <section id="howitworks" style={{position:"relative",zIndex:2,padding:"0 24px 140px"}}>
        <div style={{maxWidth:1040,margin:"0 auto"}}>
          <SR dir="up">
            <div style={{marginBottom:68,textAlign:"center"}}>
              <div className="lnyq-section-tag" style={{justifyContent:"center"}}>Process</div>
              <h2 className="lnyq-section-heading">Three steps.<br/><span style={{color:"rgba(255,255,255,0.25)"}}>That's literally it.</span></h2>
            </div>
          </SR>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:2}}>
            {[
              {step:"01",title:"Create your account",body:"Under 30 seconds. No credit card. No onboarding survey. No dark patterns. Just pick a username and you're live."},
              {step:"02",title:"Add your links",body:"Drop in your URLs. Lnyq auto-detects Instagram, TikTok, YouTube, Spotify, GitHub, Discord — and 7+ more platforms instantly."},
              {step:"03",title:"Share everywhere",body:"Copy your lnyq.link/username URL and paste it everywhere — bio, stories, emails, DMs. One link. Every platform. Total control."},
            ].map(({step,title,body,action},i)=>(
              <SR key={step} dir="up" delay={i+1}>
                <div style={{padding:"40px 28px",border:"1px solid rgba(255,255,255,0.07)",position:"relative",overflow:"hidden",height:"100%"}}>
                  <div className="lnyq-step-num">{step}</div>
                  <div style={{fontFamily:"var(--mono)",fontSize:8,color:"rgba(255,255,255,0.18)",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:18}}>Step {step}</div>
                  <div style={{fontFamily:"var(--display)",fontSize:"clamp(14px,1.8vw,18px)",fontWeight:700,color:"#fff",letterSpacing:"0.06em",textTransform:"uppercase",lineHeight:1.2,marginBottom:14}}>{title}</div>
                  <p style={{fontFamily:"var(--sans)",fontSize:13,color:"rgba(255,255,255,0.36)",lineHeight:1.72,marginBottom:24}}>{body}</p>
                  <button onClick={()=>navigate(i===2?"/demo":"/login")} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"var(--mono)",fontSize:9,letterSpacing:"0.12em",color:"rgba(255,255,255,0.3)",textTransform:"uppercase",transition:"color 0.2s",padding:0}}
                    onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.3)"}>{action}</button>
                </div>
              </SR>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ TESTIMONIALS ════════════════ */}
      <section style={{position:"relative",zIndex:2,padding:"0 0 140px",overflow:"hidden"}}>
        <SR dir="up">
          <div style={{textAlign:"center",marginBottom:48,padding:"0 24px"}}>
            <div className="lnyq-section-tag" style={{justifyContent:"center"}}>Social proof</div>
            <h2 className="lnyq-section-heading">Trusted by creators<br/><span style={{color:"rgba(255,255,255,0.25)"}}>who mean business.</span></h2>
          </div>
        </SR>
        <div style={{position:"relative"}}>
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:100,background:"linear-gradient(90deg,#000,transparent)",zIndex:2,pointerEvents:"none"}}/>
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:100,background:"linear-gradient(-90deg,#000,transparent)",zIndex:2,pointerEvents:"none"}}/>
          <div style={{display:"flex",overflow:"hidden"}}>
            <div className="lnyq-marquee-track">
              {[
                {name:"Maya Chen",role:"Lifestyle Creator",text:"Switched from Linktree after 2 years. Lnyq is just cleaner, faster, and feels genuinely mine. My click rate went up 40%."},
                {name:"Jake Rivera",role:"Music Producer",text:"The analytics alone are worth it. I finally know which platform drives my stream numbers. Game-changing data."},
                {name:"Sofia Park",role:"Fashion Influencer",text:"4 minutes to set up and it looks better than pages I've spent hours on. Absolute no-brainer switch."},
                {name:"Dev Patel",role:"Developer & Creator",text:"As a developer I was skeptical. The UX is razor-sharp. Uptime is flawless. Load times are sub-second. Impressed."},
                {name:"Aria Kowalski",role:"Travel Content Creator",text:"My followers always comment on how sleek my link page looks. It's become core to my brand identity."},
                {name:"Marcus Lee",role:"Fitness Coach",text:"Tried 5 other tools. Nothing comes close to Lnyq. Simple, fast, and it just works the way your brain expects it to."},
                {name:"Maya Chen",role:"Lifestyle Creator",text:"Switched from Linktree after 2 years. Lnyq is just cleaner, faster, and feels genuinely mine. My click rate went up 40%."},
                {name:"Jake Rivera",role:"Music Producer",text:"The analytics alone are worth it. I finally know which platform drives my stream numbers. Game-changing data."},
                {name:"Sofia Park",role:"Fashion Influencer",text:"4 minutes to set up and it looks better than pages I've spent hours on. Absolute no-brainer switch."},
                {name:"Dev Patel",role:"Developer & Creator",text:"As a developer I was skeptical. The UX is razor-sharp. Uptime is flawless. Load times are sub-second. Impressed."},
                {name:"Aria Kowalski",role:"Travel Content Creator",text:"My followers always comment on how sleek my link page looks. It's become core to my brand identity."},
                {name:"Marcus Lee",role:"Fitness Coach",text:"Tried 5 other tools. Nothing comes close to Lnyq. Simple, fast, and it just works the way your brain expects it to."},
              ].map((t,i)=>(
                <div key={i} className="lnyq-testimonial-card">
                  <div style={{fontFamily:"var(--sans)",fontSize:14,color:"rgba(255,255,255,0.45)",lineHeight:1.7,marginBottom:24}}>"{t.text}"</div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:30,height:30,borderRadius:3,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--display)",fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.45)",flexShrink:0}}>{t.name[0]}</div>
                    <div>
                      <div style={{fontFamily:"var(--sans)",fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.65)"}}>{t.name}</div>
                      <div style={{fontFamily:"var(--mono)",fontSize:8,color:"rgba(255,255,255,0.2)",letterSpacing:"0.06em",textTransform:"uppercase"}}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ COMPARISON ════════════════ */}
      <section style={{position:"relative",zIndex:2,padding:"0 24px 140px"}}>
        <div style={{maxWidth:720,margin:"0 auto"}}>
          <SR dir="up">
            <div style={{textAlign:"center",marginBottom:52}}>
              <div className="lnyq-section-tag" style={{justifyContent:"center"}}>Why Lnyq</div>
              <h2 className="lnyq-section-heading">We didn't build<br/><span style={{color:"rgba(255,255,255,0.25)"}}>another Linktree.</span></h2>
            </div>
          </SR>
          <SR dir="up" delay={1}>
            <div style={{border:"1px solid rgba(255,255,255,0.07)",borderRadius:2,overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",background:"rgba(255,255,255,0.02)"}}>
                <div style={{padding:"14px 22px",fontFamily:"var(--mono)",fontSize:8,color:"rgba(255,255,255,0.22)",letterSpacing:"0.12em",textTransform:"uppercase"}}>Feature</div>
                <div style={{padding:"14px 22px",fontFamily:"var(--display)",fontSize:10,fontWeight:700,color:"#fff",letterSpacing:"0.1em",textTransform:"uppercase",borderLeft:"1px solid rgba(255,255,255,0.05)"}}>Lnyq</div>
                <div style={{padding:"14px 22px",fontFamily:"var(--mono)",fontSize:8,color:"rgba(255,255,255,0.18)",letterSpacing:"0.08em",textTransform:"uppercase",borderLeft:"1px solid rgba(255,255,255,0.05)"}}>Others</div>
              </div>
              {[
                ["Auto platform detection","✓","Manual only"],
                ["Per-link click analytics","✓","Paid plans only"],
                ["Custom accent colors","✓","Limited"],
                ["Multiple themes","✓","Paid plans only"],
                ["No ads, ever","✓","Ad-supported"],
                ["Sub-second load times","✓","Varies"],
                ["Free tier, always","✓","Freemium trap"],
              ].map(([feat,us,them],i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderTop:"1px solid rgba(255,255,255,0.04)"}}>
                  <div style={{padding:"13px 22px",fontFamily:"var(--sans)",fontSize:13,color:"rgba(255,255,255,0.42)"}}>{feat}</div>
                  <div style={{padding:"13px 22px",fontFamily:"var(--mono)",fontSize:11,color:"#34d399",borderLeft:"1px solid rgba(255,255,255,0.04)",letterSpacing:"0.04em"}}>{us}</div>
                  <div style={{padding:"13px 22px",fontFamily:"var(--mono)",fontSize:10,color:"rgba(255,255,255,0.18)",borderLeft:"1px solid rgba(255,255,255,0.04)",letterSpacing:"0.04em"}}>{them}</div>
                </div>
              ))}
            </div>
          </SR>
        </div>
      </section>

      

      {/* ════════════════ FINAL CTA ════════════════ */}
      <section style={{position:"relative",zIndex:2,padding:"0 24px 140px",textAlign:"center"}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}>
          {[480,360,250].map((size,i)=>(
            <div key={i} style={{position:"absolute",top:"50%",left:"50%",width:size,height:size,borderRadius:"50%",border:`1px solid rgba(255,255,255,${0.02+i*0.01})`,transform:"translate(-50%,-50%)",animation:`lnyqRingRotate ${20+i*9}s linear infinite`}}>
              <div style={{position:"absolute",top:-3,left:"50%",transform:"translateX(-50%)",width:5,height:5,borderRadius:"50%",background:`rgba(255,255,255,${0.15+i*0.1})`}}/>
            </div>
          ))}
        </div>
        <div style={{position:"relative",maxWidth:580,margin:"0 auto"}}>
          <SR dir="up">
            <div style={{fontFamily:"var(--mono)",fontSize:8,letterSpacing:"0.22em",color:"rgba(255,255,255,0.18)",textTransform:"uppercase",marginBottom:24}}>— The future of your online presence —</div>
            <h2 style={{fontFamily:"var(--display)",fontSize:"clamp(32px,6.5vw,72px)",fontWeight:900,letterSpacing:"0.04em",textTransform:"uppercase",lineHeight:0.95,color:"#fff",marginBottom:22,animation:"lnyqGlowPulse 4s ease infinite"}}>
              See it for<br/>
              <span style={{background:"linear-gradient(180deg,rgba(255,255,255,0.85) 0%,rgba(255,255,255,0.18) 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>yourself.</span>
            </h2>
            <p style={{fontFamily:"var(--sans)",fontSize:15,color:"rgba(255,255,255,0.28)",lineHeight:1.7,marginBottom:40}}>10,000+ creators already have their link.<br/>Jump into the interactive demo — no account needed.</p>
            <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
              <button className="lnyq-btn-cta" onClick={()=>navigate("/demo")}>View Demo →</button>
            </div>
            <div style={{marginTop:20,fontFamily:"var(--mono)",fontSize:8,color:"rgba(255,255,255,0.14)",letterSpacing:"0.1em",textTransform:"uppercase"}}>No credit card · No catch · Cancel anytime</div>
          </SR>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{position:"relative",zIndex:2,borderTop:"1px solid rgba(255,255,255,0.04)",padding:"28px 40px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14}}>
        <div style={{fontFamily:"var(--display)",fontSize:15,fontWeight:900,letterSpacing:"0.1em",color:"#fff",textTransform:"uppercase"}}>Lnyq</div>
        <div style={{display:"flex",gap:28}}>
          {["Features","Pricing","Demo"].map(l=>(
            <span key={l} onClick={()=>navigate(l==="Demo"?"/demo":"/")} style={{fontFamily:"var(--mono)",fontSize:8,color:"rgba(255,255,255,0.18)",letterSpacing:"0.14em",textTransform:"uppercase",cursor:"pointer",transition:"color 0.2s"}}
              onMouseEnter={e=>e.target.style.color="rgba(255,255,255,0.5)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.18)"}>{l}</span>
          ))}
        </div>
        <div style={{fontFamily:"var(--mono)",fontSize:8,color:"rgba(255,255,255,0.12)",letterSpacing:"0.08em"}}>© {new Date().getFullYear()} Lnyq. All rights reserved.</div>
      </footer>
    </div>
  );
}

/* ─── AUTH ───────────────────────────────────────────────── */
function AuthPage({ onAuth }) {
  const [tab, setTab] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const submit = async () => {
    setErr(""); setOk("");
    if (!email || !password) { setErr("Please fill in all fields."); return; }
    setLoading(true);
    if (tab === "signup") {
      if (!username) { setErr("Choose a username."); setLoading(false); return; }
      if (!/^[a-z0-9_]{3,20}$/.test(username)) { setErr("3–20 chars: lowercase, numbers, underscores only."); setLoading(false); return; }
      const { data: ex } = await supabase.from("profiles").select("id").eq("username", username).maybeSingle();
      if (ex) { setErr("Username already taken."); setLoading(false); return; }
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) { setErr(error.message); setLoading(false); return; }
      if (data?.user) {
        if (data.session) await supabase.auth.setSession(data.session);
        await supabase.from("profiles").insert({ id: data.user.id, username, display_name: username, bio: "", theme: "midnight", accent: "#6366f1", link_style: "bordered" });
      }
      setOk("Account created! Sign in below."); setTab("login");
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setErr(error.message); setLoading(false); return; }
      onAuth(data.session);
    }
    setLoading(false);
  };

  return (
    <div className="lnyq-auth">
      <style>{css}</style>
      <div className="lnyq-auth-card">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            fontFamily: "var(--display)", fontSize: 26, fontWeight: 800,
            letterSpacing: "-0.02em", marginBottom: 8, color: "#fff"
          }}>Lnyq</div>
          <div style={{
            fontFamily: "var(--mono)", fontSize: 11,
            color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase"
          }}>
            {tab === "signup" ? "Create your account" : "Welcome back"}
          </div>
        </div>

        <div className="lnyq-card" style={{ padding: 28 }}>
          <div className="lnyq-auth-tabs">
            {[["signup", "Sign up"], ["login", "Sign in"]].map(([id, lbl]) => (
              <div key={id} className={`lnyq-auth-tab ${tab === id ? "lnyq-active" : ""}`}
                onClick={() => { setTab(id); setErr(""); setOk(""); }}>{lbl}</div>
            ))}
          </div>

          {err && <div className="lnyq-auth-err">{err}</div>}
          {ok && <div className="lnyq-auth-ok">{ok}</div>}

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {tab === "signup" && (
              <div>
                <label className="lnyq-label">Username</label>
                <input className="lnyq-input" placeholder="yourname" value={username}
                  onChange={e => setUsername(e.target.value.toLowerCase())} />
                {username && (
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: 10,
                    color: "rgba(255,255,255,0.3)", marginTop: 5, letterSpacing: "0.03em"
                  }}>
                    lnyq.link/{username}
                  </div>
                )}
              </div>
            )}
            <div>
              <label className="lnyq-label">Email</label>
              <input className="lnyq-input" type="email" placeholder="you@example.com" value={email}
                onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="lnyq-label">Password</label>
              <input className="lnyq-input" type="password" placeholder="••••••••" value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submit()} />
            </div>
            <button className="lnyq-btn lnyq-btn-primary" onClick={submit} disabled={loading}
              style={{ marginTop: 4, width: "100%", padding: "13px", fontSize: 13, letterSpacing: "0.04em" }}>
              {loading ? "Please wait…" : tab === "signup" ? "Create account →" : "Sign in →"}
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 18 }}>
          <span style={{
            fontFamily: "var(--mono)", fontSize: 10,
            color: "rgba(255,255,255,0.25)", cursor: "pointer",
            letterSpacing: "0.06em", textTransform: "uppercase"
          }}
            onClick={() => navigate("/")}>← Back to home</span>
        </div>
      </div>
    </div>
  );
}

/* ─── DASHBOARD ──────────────────────────────────────────── */
function Dashboard({ session, onLogout }) {
  const [activeTab, setActiveTab] = useState("links");
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastEl, showToast] = useToast();

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    const [p, l] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", session.user.id).maybeSingle(),
      supabase.from("links").select("*").eq("user_id", session.user.id).order("position"),
    ]);
    let pd = p.data;
    if (!pd) {
      const base = (session.user.email || "").split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 16);
      const fb = base + "_" + Math.random().toString(36).slice(2, 6);
      const { data: cr } = await supabase.from("profiles").insert({
        id: session.user.id, username: fb, display_name: fb,
        bio: "", theme: "midnight", accent: "#6366f1", link_style: "bordered"
      }).select().single();
      if (cr) pd = cr;
    }
    if (pd) setProfile(pd);
    if (l.data) setLinks(l.data);
    setLoading(false);
  };

  const saveProfile = async (updates) => {
    const { error } = await supabase.from("profiles").update(updates).eq("id", session.user.id);
    if (!error) { setProfile(p => ({ ...p, ...updates })); showToast("Changes saved."); }
    else showToast("Save failed.", "error");
  };
  const addLink = async (link) => {
    const { data, error } = await supabase.from("links").insert({ ...link, user_id: session.user.id, position: links.length, clicks: 0 }).select().single();
    if (!error && data) { setLinks(l => [...l, data]); showToast("Link added."); }
    else showToast("Failed to add link.", "error");
  };
  const updateLink = async (id, updates) => {
    const { error } = await supabase.from("links").update(updates).eq("id", id);
    if (!error) { setLinks(l => l.map(x => x.id === id ? { ...x, ...updates } : x)); showToast("Link saved."); }
    else showToast("Update failed.", "error");
  };
  const deleteLink = async (id) => {
    const { error } = await supabase.from("links").delete().eq("id", id);
    if (!error) { setLinks(l => l.filter(x => x.id !== id)); showToast("Link deleted."); }
    else showToast("Delete failed.", "error");
  };
  const reorderLinks = async (newLinks) => {
    setLinks(newLinks);
    await Promise.all(newLinks.map((l, i) => supabase.from("links").update({ position: i }).eq("id", l.id)));
  };

  const navItems = [
    { id: "links", icon: "↗", label: "Links" },
    { id: "profile", icon: "◯", label: "Profile" },
    { id: "appearance", icon: "◫", label: "Appear" },
    { id: "analytics", icon: "▤", label: "Stats" },
  ];

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{css}</style>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div style={{ width: 22, height: 22, border: "2px solid rgba(255,255,255,0.06)", borderTopColor: "rgba(255,255,255,0.4)", borderRadius: "50%", animation: "lnyqSpin 0.7s linear infinite" }} />
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Loading…</div>
      </div>
    </div>
  );

  if (!profile) return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 14, padding: 24, textAlign: "center" }}>
      <style>{css}</style>
      <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "rgba(239,68,68,0.8)" }}>Profile not found</div>
      <button className="lnyq-btn lnyq-btn-secondary lnyq-btn-sm" onClick={onLogout}>Sign out</button>
    </div>
  );

  const profileUrl = `${window.location.origin}/${profile.username}`;

  return (
    <div className="lnyq-dash">
      <style>{css}</style>
      {toastEl}

      <aside className="lnyq-sidebar">
        <div className="lnyq-sidebar-logo">Lnyq</div>
        <div className="lnyq-nav-section">
          <div className="lnyq-nav-section-label">Menu</div>
          {navItems.map(t => (
            <div key={t.id} className={`lnyq-nav-item ${activeTab === t.id ? "lnyq-active" : ""}`}
              onClick={() => setActiveTab(t.id)}>
              <div className="lnyq-nav-icon">{t.icon}</div>
              {t.label}
            </div>
          ))}
        </div>
        <div className="lnyq-sidebar-foot">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div className="lnyq-sidebar-avatar">
              {profile.avatar_url ? <img src={profile.avatar_url} alt="" /> : profile.username?.[0]?.toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 1 }}>@{profile.username}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{session.user.email}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="lnyq-btn lnyq-btn-primary lnyq-btn-sm" style={{ flex: 1, fontSize: 10 }}
              onClick={() => window.open(`/${profile.username}`, "_blank")}>View page ↗</button>
            <button className="lnyq-btn lnyq-btn-ghost lnyq-btn-sm" style={{ fontSize: 10 }} onClick={onLogout}>Out</button>
          </div>
        </div>
      </aside>

      <main className="lnyq-main">
        <div className="lnyq-url-banner">
          <div className="lnyq-url-dot" />
          <div className="lnyq-url-text">{profileUrl}</div>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button className="lnyq-btn lnyq-btn-ghost lnyq-btn-xs"
              onClick={() => { navigator.clipboard.writeText(profileUrl); showToast("Link copied!"); }}>
              Copy
            </button>
            <button className="lnyq-btn lnyq-btn-primary lnyq-btn-xs"
              onClick={() => window.open(`/${profile.username}`, "_blank")}>
              View ↗
            </button>
          </div>
        </div>

        {activeTab === "links" && <LinksTab links={links} onAdd={addLink} onUpdate={updateLink} onDelete={deleteLink} onReorder={reorderLinks} showToast={showToast} />}
        {activeTab === "profile" && <ProfileTab profile={profile} onSave={saveProfile} showToast={showToast} session={session} />}
        {activeTab === "appearance" && <AppearanceTab profile={profile} onSave={saveProfile} />}
        {activeTab === "analytics" && <AnalyticsTab links={links} />}
      </main>
    </div>
  );
}

/* ─── LINKS TAB ──────────────────────────────────────────── */
function LinksTab({ links, onAdd, onUpdate, onDelete, onReorder, showToast }) {
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newIconKey, setNewIconKey] = useState("custom");
  const [expandedId, setExpandedId] = useState(null);
  const dragIdx = useRef(null);
  const overIdx = useRef(null);

  const handleAdd = async () => {
    if (!newTitle.trim() || !newUrl.trim()) { showToast("Title and URL are required.", "error"); return; }
    let url = newUrl.trim();
    if (!/^https?:\/\//.test(url)) url = "https://" + url;
    await onAdd({ title: newTitle.trim(), url, icon_key: newIconKey });
    setNewTitle(""); setNewUrl(""); setNewIconKey("custom"); setShowForm(false);
  };

  const handleDragEnd = () => {
    if (dragIdx.current === null || overIdx.current === null || dragIdx.current === overIdx.current) {
      dragIdx.current = null; overIdx.current = null; return;
    }
    const arr = [...links];
    const [item] = arr.splice(dragIdx.current, 1);
    arr.splice(overIdx.current, 0, item);
    dragIdx.current = null; overIdx.current = null;
    onReorder(arr);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4, gap: 12 }}>
        <div>
          <div className="lnyq-page-title">Links</div>
          <div className="lnyq-page-sub">{links.length} link{links.length !== 1 ? "s" : ""} — drag to reorder</div>
        </div>
        {!showForm && (
          <button className="lnyq-btn lnyq-btn-primary lnyq-btn-sm" style={{ flexShrink: 0, marginTop: 4 }}
            onClick={() => setShowForm(true)}>+ Add link</button>
        )}
      </div>

      {links.length === 0 && !showForm && (
        <div style={{
          padding: "48px 20px", borderRadius: "var(--radius-lg)",
          border: "1px dashed var(--border2)", textAlign: "center", marginBottom: 16
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>↗</div>
          <div style={{ fontFamily: "var(--sans)", fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>No links yet</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)" }}>Add your first link to get started</div>
        </div>
      )}

      {links.map((link, i) => (
        <LinkRowInline key={link.id} link={link} index={i}
          expanded={expandedId === link.id}
          onToggle={() => setExpandedId(expandedId === link.id ? null : link.id)}
          onSave={u => { onUpdate(link.id, u); setExpandedId(null); }}
          onDelete={() => { onDelete(link.id); setExpandedId(null); }}
          onDragStart={() => dragIdx.current = i}
          onDragEnter={() => overIdx.current = i}
          onDragEnd={handleDragEnd}
        />
      ))}

      {showForm ? (
        <div className="lnyq-add-panel">
          <div className="lnyq-add-panel-title">New link</div>
          <div className="lnyq-form-2col" style={{ marginBottom: 14 }}>
            <div>
              <label className="lnyq-label">Title</label>
              <input className="lnyq-input" placeholder="My Instagram" value={newTitle}
                onChange={e => setNewTitle(e.target.value)} />
            </div>
            <div>
              <label className="lnyq-label">URL</label>
              <input className="lnyq-input" placeholder="https://…" value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAdd()} />
            </div>
          </div>
          <label className="lnyq-label" style={{ marginBottom: 8 }}>Platform</label>
          <IconPicker selected={newIconKey} onSelect={setNewIconKey} />
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="lnyq-btn lnyq-btn-primary lnyq-btn-sm" onClick={handleAdd}>Add link</button>
            <button className="lnyq-btn lnyq-btn-ghost lnyq-btn-sm" onClick={() => { setShowForm(false); setNewTitle(""); setNewUrl(""); setNewIconKey("custom"); }}>Cancel</button>
          </div>
        </div>
      ) : links.length > 0 && (
        <button className="lnyq-btn lnyq-btn-ghost" style={{ width: "100%", marginTop: 8, border: "1px dashed var(--border2)", borderRadius: "var(--radius)", padding: "13px", fontSize: 11, letterSpacing: "0.05em" }}
          onClick={() => setShowForm(true)}>+ Add another link</button>
      )}
    </div>
  );
}

function LinkRowInline({ link, expanded, onToggle, onSave, onDelete, onDragStart, onDragEnter, onDragEnd }) {
  const ic = SOCIAL_ICONS[link.icon_key] || SOCIAL_ICONS.custom;
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [iconKey, setIconKey] = useState(link.icon_key || "custom");
  useEffect(() => { setTitle(link.title); setUrl(link.url); setIconKey(link.icon_key || "custom"); }, [link]);

  return (
    <div className="lnyq-link-row"
      draggable onDragStart={onDragStart} onDragEnter={onDragEnter} onDragEnd={onDragEnd} onDragOver={e => e.preventDefault()}>
      <div className="lnyq-link-row-view" onClick={onToggle}>
        <span className="lnyq-link-drag" onClick={e => e.stopPropagation()}>⠿</span>
        <div className="lnyq-link-ico">
          <span style={{ color: ic.color, display: "flex" }}>{React.cloneElement(ic.svg, { width: 15, height: 15 })}</span>
        </div>
        <div className="lnyq-link-info">
          <div className="lnyq-link-title">{link.title}</div>
          <div className="lnyq-link-url">{link.url}</div>
        </div>
        <div className="lnyq-link-clicks">{link.clicks || 0} clicks</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)", marginLeft: 6, flexShrink: 0, transition: "transform 0.2s", transform: expanded ? "rotate(180deg)" : "" }}>↓</div>
      </div>

      {expanded && (
        <div className="lnyq-link-row-edit" onClick={e => e.stopPropagation()}>
          <div className="lnyq-form-2col" style={{ marginBottom: 14 }}>
            <div><label className="lnyq-label">Title</label><input className="lnyq-input" value={title} onChange={e => setTitle(e.target.value)} /></div>
            <div><label className="lnyq-label">URL</label><input className="lnyq-input" value={url} onChange={e => setUrl(e.target.value)} /></div>
          </div>
          <label className="lnyq-label" style={{ marginBottom: 8 }}>Icon</label>
          <IconPicker selected={iconKey} onSelect={setIconKey} />
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button className="lnyq-btn lnyq-btn-primary lnyq-btn-sm" onClick={() => onSave({ title, url, icon_key: iconKey })}>Save</button>
            <button className="lnyq-btn lnyq-btn-ghost lnyq-btn-sm" onClick={onToggle}>Cancel</button>
            <button className="lnyq-btn lnyq-btn-danger lnyq-btn-sm" style={{ marginLeft: "auto" }} onClick={onDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

function IconPicker({ selected, onSelect }) {
  return (
    <div className="lnyq-icon-grid">
      {ICON_KEYS.map(key => {
        const ic = SOCIAL_ICONS[key];
        return (
          <div key={key} className={`lnyq-icon-opt ${selected === key ? "lnyq-sel" : ""}`}
            onClick={() => onSelect(key)} title={ic.label}>
            <span style={{ color: ic.color, display: "flex" }}>{React.cloneElement(ic.svg, { width: 16, height: 16 })}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── PROFILE TAB ────────────────────────────────────────── */
function ProfileTab({ profile, onSave, showToast, session }) {
  const [displayName, setDisplayName] = useState(profile.display_name || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { showToast("Max file size is 2MB", "error"); return; }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${session.user.id}/${session.user.id}.${ext}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (error) { showToast("Upload failed.", "error"); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
    setAvatarUrl(publicUrl);
    showToast("Photo uploaded.");
    setUploading(false);
  };

  return (
    <div>
      <div className="lnyq-page-title">Profile</div>
      <div className="lnyq-page-sub">Visible on your public page</div>

      <div className="lnyq-card">
        <div className="lnyq-card-body">
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
            <div style={{
              width: 68, height: 68, borderRadius: 14,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, color: "var(--text)",
              overflow: "hidden", flexShrink: 0
            }}>
              {avatarUrl ? <img src={avatarUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" /> : (displayName || profile.username)?.[0]?.toUpperCase()}
            </div>
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <button className="lnyq-btn lnyq-btn-secondary lnyq-btn-sm"
                  onClick={() => fileRef.current?.click()} disabled={uploading}>
                  {uploading ? "Uploading…" : "Upload photo"}
                </button>
                {avatarUrl && <button className="lnyq-btn lnyq-btn-ghost lnyq-btn-sm" onClick={() => setAvatarUrl("")}>Remove</button>}
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--text3)", letterSpacing: "0.04em" }}>JPG or PNG · max 2MB</div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleUpload} />
          </div>

          <div className="lnyq-form-2col" style={{ marginBottom: 14 }}>
            <div>
              <label className="lnyq-label">Display name</label>
              <input className="lnyq-input" placeholder="Your Name" value={displayName} onChange={e => setDisplayName(e.target.value)} />
            </div>
            <div>
              <label className="lnyq-label">Username</label>
              <input className="lnyq-input" value={`@${profile.username}`} disabled />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label className="lnyq-label">Bio</label>
            <textarea className="lnyq-input lnyq-textarea" placeholder="Tell the world who you are…" value={bio}
              onChange={e => setBio(e.target.value)} rows={3} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label className="lnyq-label">Or paste avatar URL</label>
            <input className="lnyq-input" placeholder="https://…" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} />
          </div>

          <button className="lnyq-btn lnyq-btn-primary"
            onClick={() => onSave({ display_name: displayName, bio, avatar_url: avatarUrl })}>
            Save profile
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── APPEARANCE TAB ─────────────────────────────────────── */
function AppearanceTab({ profile, onSave }) {
  const [theme, setTheme] = useState(profile.theme || "midnight");
  const [accent, setAccent] = useState(profile.accent || "#6366f1");
  const [linkStyle, setLinkStyle] = useState(profile.link_style || "bordered");

  return (
    <div>
      <div className="lnyq-page-title">Appearance</div>
      <div className="lnyq-page-sub">Customize your public page</div>

      <div className="lnyq-sec-label">Theme</div>
      <div className="lnyq-theme-grid" style={{ marginBottom: 24 }}>
        {THEMES.map(t => (
          <div key={t.id} className={`lnyq-theme-opt ${theme === t.id ? "lnyq-sel" : ""}`} onClick={() => setTheme(t.id)}>
            <div className="lnyq-theme-preview" style={{ background: t.bg }} />
            <div className="lnyq-theme-name">{t.name}</div>
          </div>
        ))}
      </div>

      <div className="lnyq-sec-label">Accent color</div>
      <div className="lnyq-card lnyq-card-body" style={{ marginBottom: 24 }}>
        <div className="lnyq-accent-row">
          {ACCENTS.map(a => (
            <div key={a} className={`lnyq-accent-dot ${accent === a ? "lnyq-sel" : ""}`}
              style={{ background: a, boxShadow: accent === a ? `0 0 0 2px var(--bg), 0 0 0 4px ${a}` : "none" }}
              onClick={() => setAccent(a)} />
          ))}
        </div>
      </div>

      <div className="lnyq-sec-label">Link style</div>
      <div className="lnyq-card lnyq-card-body" style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {LINK_STYLES.map(s => (
            <div key={s.id} className={`lnyq-link-style-opt ${linkStyle === s.id ? "lnyq-sel" : ""}`}
              onClick={() => setLinkStyle(s.id)}>{s.name}</div>
          ))}
        </div>
      </div>

      <button className="lnyq-btn lnyq-btn-primary"
        onClick={() => onSave({ theme, accent, link_style: linkStyle })}>
        Save appearance
      </button>
    </div>
  );
}

/* ─── ANALYTICS TAB ──────────────────────────────────────── */
function AnalyticsTab({ links }) {
  const totalClicks = links.reduce((s, l) => s + (l.clicks || 0), 0);
  const maxClicks = Math.max(...links.map(l => l.clicks || 0), 1);
  const sorted = [...links].sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
  const avgClicks = links.length > 0 && totalClicks > 0 ? (totalClicks / links.length).toFixed(1) : 0;

  const statColors = ["#fff", "#34d399", "#38bdf8", "#a78bfa"];

  return (
    <div>
      <div className="lnyq-page-title">Analytics</div>
      <div className="lnyq-page-sub">Link performance overview</div>

      <div className="lnyq-stat-grid">
        {[
          { num: totalClicks, label: "Total clicks" },
          { num: links.length, label: "Active links" },
          { num: links.filter(l => (l.clicks || 0) > 0).length, label: "Links clicked" },
          { num: avgClicks, label: "Avg per link" },
        ].map((s, i) => (
          <div key={s.label} className="lnyq-stat-card">
            <div className="lnyq-stat-num" style={{ color: statColors[i] }}>{s.num}</div>
            <div className="lnyq-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="lnyq-sec-label">Per link breakdown</div>
      <div className="lnyq-card lnyq-card-body">
        {links.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>No data yet</div>
          </div>
        ) : sorted.map((link, i) => {
          const ic = SOCIAL_ICONS[link.icon_key] || SOCIAL_ICONS.custom;
          const pct = ((link.clicks || 0) / maxClicks) * 100;
          return (
            <div key={link.id} className="lnyq-bar-row">
              <span style={{ color: ic.color, flexShrink: 0, display: "flex" }}>{React.cloneElement(ic.svg, { width: 13, height: 13 })}</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 500, color: "var(--text2)", minWidth: 80, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{link.title}</span>
              <div className="lnyq-bar-wrap">
                <div className="lnyq-bar-fill" style={{ width: `${pct}%`, background: "rgba(255,255,255,0.5)" }} />
              </div>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--text)", flexShrink: 0, minWidth: 28, textAlign: "right" }}>{link.clicks || 0}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── PUBLIC PROFILE PAGE ───────────────────────────────── */
function ProfilePage({ username }) {
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: p } = await supabase.from("profiles").select("*").eq("username", username).maybeSingle();
      if (!p) { setLoading(false); return; }
      setProfile(p);
      const { data: l } = await supabase.from("links").select("*").eq("user_id", p.id).order("position");
      setLinks(l || []);
      setLoading(false);
    };
    load();
  }, [username]);

  const handleClick = async (link) => {
    setLinks(prev => prev.map(l => l.id === link.id ? { ...l, clicks: (l.clicks || 0) + 1 } : l));
    supabase.from("links").update({ clicks: (link.clicks || 0) + 1 }).eq("id", link.id);
    window.open(link.url, "_blank", "noopener");
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{css}</style>
      <div style={{ width: 22, height: 22, border: "2px solid rgba(255,255,255,0.06)", borderTopColor: "rgba(255,255,255,0.4)", borderRadius: "50%", animation: "lnyqSpin 0.7s linear infinite" }} />
    </div>
  );

  if (!profile) return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10, textAlign: "center", padding: 24 }}>
      <style>{css}</style>
      <div style={{ fontFamily: "var(--display)", fontSize: 80, fontWeight: 900, color: "rgba(255,255,255,0.03)", lineHeight: 1, letterSpacing: "-6px" }}>404</div>
      <div style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: "#fff" }}>Page not found</div>
      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>@{username} doesn't exist yet.</div>
      <button className="lnyq-btn lnyq-btn-primary" style={{ marginTop: 16 }} onClick={() => navigate("/")}>Claim your Lnyq →</button>
    </div>
  );

  const th = THEMES.find(t => t.id === profile.theme) || THEMES[0];
  const accent = profile.accent || "#6366f1";
  const linkStyle = profile.link_style || "bordered";

  const getLinkStyle = () => {
    if (linkStyle === "bordered") return { background: "transparent", border: `1px solid ${accent}30`, color: "#fff" };
    if (linkStyle === "solid") return { background: accent, color: ["#ffffff", "#e4e4e7", "#facc15"].includes(accent) ? "#000" : "#fff", border: "none" };
    if (linkStyle === "ghost") return { background: `${accent}10`, border: `1px solid ${accent}20`, color: "#fff" };
    if (linkStyle === "minimal") return { background: "transparent", border: "none", borderBottom: `1px solid ${accent}20`, borderRadius: 0, color: "#fff" };
    return {};
  };
  const ls = getLinkStyle();

  return (
    <div style={{
      minHeight: "100vh",
      background: th.bg,
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "72px 20px 80px",
      position: "relative", overflow: "hidden"
    }}>
      <style>{css}</style>

      <div style={{
        position: "fixed", top: "-20%", left: "50%", transform: "translateX(-50%)",
        width: "80vw", height: "80vw", maxWidth: 600, maxHeight: 600, borderRadius: "50%",
        background: `radial-gradient(circle,${accent}12 0%,transparent 70%)`,
        pointerEvents: "none", zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: 80, height: 80, borderRadius: 16,
          background: `linear-gradient(135deg,${accent}30,${accent}10)`,
          border: `1px solid ${accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--display)", fontSize: 26, fontWeight: 700,
          color: "rgba(255,255,255,0.6)", overflow: "hidden", marginBottom: 16,
          boxShadow: `0 0 40px ${accent}20`
        }}>
          {profile.avatar_url ? <img src={profile.avatar_url} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" /> : (profile.display_name || profile.username)?.[0]?.toUpperCase()}
        </div>

        <div style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", marginBottom: 4, textAlign: "center" }}>
          {profile.display_name || profile.username}
        </div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: profile.bio ? 12 : 32 }}>
          @{profile.username}
        </div>
        {profile.bio && (
          <div style={{ fontFamily: "var(--sans)", fontSize: 14, color: "rgba(255,255,255,0.45)", textAlign: "center", maxWidth: 300, lineHeight: 1.65, marginBottom: 32, fontWeight: 400 }}>
            {profile.bio}
          </div>
        )}

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 9 }}>
          {links.map((link, i) => {
            const ic = SOCIAL_ICONS[link.icon_key] || SOCIAL_ICONS.custom;
            return (
              <button key={link.id} className="lnyq-profile-btn" onClick={() => handleClick(link)}
                style={{ ...ls, animation: `lnyqFadeUp 0.4s ${i * 0.065}s ease both` }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = linkStyle === "solid" ? accent : `${accent}18`;
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = `0 8px 30px ${accent}20`;
                  if (ls.border) e.currentTarget.style.borderColor = `${accent}55`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = ls.background || "transparent";
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                  if (ls.border) e.currentTarget.style.borderColor = `${accent}30`;
                }}
                onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
                onMouseUp={e => e.currentTarget.style.transform = "translateY(-1px)"}
                onTouchStart={e => { e.currentTarget.style.opacity = "0.75"; e.currentTarget.style.transform = "scale(0.98)"; }}
                onTouchEnd={e => { e.currentTarget.style.opacity = ""; e.currentTarget.style.transform = ""; }}
              >
                <span style={{ color: ic.color, display: "flex", flexShrink: 0 }}>{React.cloneElement(ic.svg, { width: 16, height: 16 })}</span>
                <span style={{ flex: 1, fontFamily: "var(--sans)", fontSize: 14, fontWeight: 500 }}>{link.title}</span>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 14 }}>↗</span>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 52, fontFamily: "var(--mono)", fontSize: 9, color: "rgba(255,255,255,0.1)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Made with Lnyq
        </div>
      </div>
    </div>
  );
}

/* ─── DEMO: PRESET THEMES ───────────────────────────────── */
const DEMO_PRESETS = [
  { id:"cyberpunk",   name:"Cyberpunk",   emoji:"⚡", bg:"linear-gradient(160deg,#000000 0%,#0d001a 50%,#001a0d 100%)", accent:"#00ff9f", linkStyle:"solid",    borderRadius:"pill",    font:"mono",    particles:true,  desc:"Neon green · Dark"      },
  { id:"business",    name:"Business",    emoji:"💼", bg:"linear-gradient(160deg,#0a0e1a 0%,#111827 100%)",             accent:"#e4e4e7", linkStyle:"bordered", borderRadius:"sharp",   font:"sans",    particles:false, desc:"Clean · Professional"   },
  { id:"vaporwave",   name:"Vaporwave",   emoji:"🌊", bg:"linear-gradient(160deg,#1a0030 0%,#0d0020 40%,#001a30 100%)",accent:"#ec4899", linkStyle:"ghost",    borderRadius:"pill",    font:"display", particles:true,  desc:"Retro pink · Dreamy"    },
  { id:"creator",     name:"Creator",     emoji:"🎨", bg:"linear-gradient(160deg,#120a00 0%,#1e0c00 100%)",             accent:"#f97316", linkStyle:"ghost",    borderRadius:"rounded", font:"sans",    particles:false, desc:"Warm · Creative"        },
  { id:"deepocean",   name:"Ocean",       emoji:"🌊", bg:"linear-gradient(160deg,#020b18 0%,#041830 50%,#020d22 100%)",accent:"#38bdf8", linkStyle:"bordered", borderRadius:"rounded", font:"sans",    particles:true,  desc:"Deep blue · Fresh"      },
  { id:"aurora",      name:"Aurora",      emoji:"🌌", bg:"linear-gradient(160deg,#040d09 0%,#061a12 50%,#04100d 100%)",accent:"#34d399", linkStyle:"ghost",    borderRadius:"pill",    font:"sans",    particles:true,  desc:"Forest green · Lush"    },
  { id:"monochrome",  name:"Mono",        emoji:"◼", bg:"#0a0a0a",                                                      accent:"#ffffff", linkStyle:"minimal",  borderRadius:"sharp",   font:"mono",    particles:false, desc:"Pure black · Minimal"   },
  { id:"luxury",      name:"Luxury",      emoji:"✨", bg:"linear-gradient(160deg,#0f0900 0%,#1a1000 100%)",             accent:"#facc15", linkStyle:"bordered", borderRadius:"sharp",   font:"display", particles:false, desc:"Gold · Premium"         },
];

/* ─── DEMO LINK PAGE ─────────────────────────────────────── */
function DemoLinkPage({ profile, links, accent, themeId, linkStyle, borderRadius, font, particles, onLinkClick, layout="list", linkImages={} }) {
  const preset = DEMO_PRESETS.find(p => p.id === themeId);
  const th = THEMES.find(t => t.id === themeId) || THEMES[0];
  const bg = preset ? preset.bg : th.bg;
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!particles || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = canvas.width = canvas.offsetWidth || 375;
    let h = canvas.height = canvas.offsetHeight || 780;
    const pts = Array.from({length:32}, () => ({
      x:Math.random()*w, y:Math.random()*h,
      vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4,
      r:Math.random()*1.6+0.4, o:Math.random()*0.45+0.08
    }));
    const hex2 = (n) => Math.round(n*255).toString(16).padStart(2,"0");
    const draw = () => {
      ctx.clearRect(0,0,w,h);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=w; if(p.x>w)p.x=0;
        if(p.y<0)p.y=h; if(p.y>h)p.y=0;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`${accent}${hex2(p.o)}`;
        ctx.fill();
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<100){ ctx.beginPath(); ctx.strokeStyle=`${accent}${hex2((1-d/100)*0.12)}`; ctx.lineWidth=0.5; ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke(); }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [particles, accent]);

  const br = borderRadius==="sharp"?"3px":borderRadius==="rounded"?"12px":"999px";
  const ff = font==="mono"?"var(--mono)":font==="display"?"var(--display)":"var(--sans)";
  const lightAccents = ["#ffffff","#e4e4e7","#facc15"];
  const isLight = lightAccents.includes(accent);

  const ls = (() => {
    if(linkStyle==="bordered") return { background:"transparent", border:`1px solid ${accent}42`, color:"#fff", borderRadius:br };
    if(linkStyle==="solid")    return { background:accent, color:isLight?"#000":"#fff", border:"none", borderRadius:br };
    if(linkStyle==="ghost")    return { background:`${accent}14`, border:`1px solid ${accent}28`, color:"#fff", borderRadius:br };
    if(linkStyle==="minimal")  return { background:"transparent", border:"none", borderBottom:`1px solid ${accent}30`, borderRadius:0, color:"#fff" };
    return {};
  })();

  const avatarBR = borderRadius==="pill"?"50%":borderRadius==="rounded"?"18px":"8px";

  return (
    <div style={{ minHeight:"100%", background:bg, display:"flex", flexDirection:"column", alignItems:"center", padding:"64px 20px 80px", position:"relative", overflow:"hidden" }}>
      {particles && <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0 }} />}
      <div style={{ position:"absolute", top:"-25%", left:"50%", transform:"translateX(-50%)", width:"90%", paddingBottom:"90%", maxWidth:520, borderRadius:"50%", background:`radial-gradient(circle,${accent}1c 0%,transparent 65%)`, pointerEvents:"none", animation:"lnyqOrb1 12s ease-in-out infinite", zIndex:0 }} />
      <div style={{ position:"absolute", top:"30%", right:"-15%", width:"35%", paddingBottom:"35%", maxWidth:240, borderRadius:"50%", background:`radial-gradient(circle,${accent}0e 0%,transparent 65%)`, pointerEvents:"none", animation:"lnyqOrb2 18s ease-in-out infinite", zIndex:0 }} />

      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:380, display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{ width:82, height:82, borderRadius:avatarBR, background:`linear-gradient(135deg,${accent}38,${accent}10)`, border:`1px solid ${accent}40`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--display)", fontSize:28, fontWeight:700, color:"rgba(255,255,255,0.75)", marginBottom:16, boxShadow:`0 0 0 6px ${accent}0a,0 0 50px ${accent}28`, overflow:"hidden", animation:"lnyqDotFloat 4s ease-in-out infinite" }}>
          {profile.avatar_url ? <img src={profile.avatar_url} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="" /> : (profile.display_name||"A")[0].toUpperCase()}
        </div>

        <div style={{ fontFamily:ff, fontSize:font==="display"?16:22, fontWeight:700, letterSpacing:font==="display"?"0.1em":"-0.03em", color:"#fff", marginBottom:4, textAlign:"center", textTransform:font==="display"?"uppercase":"none" }}>
          {profile.display_name}
        </div>
        <div style={{ fontFamily:"var(--mono)", fontSize:10, color:`${accent}80`, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>@{profile.username}</div>
        {profile.bio && (
          <div style={{ fontFamily:"var(--sans)", fontSize:14, color:"rgba(255,255,255,0.42)", textAlign:"center", maxWidth:300, lineHeight:1.65, marginBottom:32 }}>{profile.bio}</div>
        )}

        <div style={{ width:"100%", ...(layout==="grid" ? { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 } : { display:"flex", flexDirection:"column", gap:9 }) }}>
          {links.map((link, i) => {
            const ic = SOCIAL_ICONS[link.icon_key] || SOCIAL_ICONS.custom;
            const imgSrc = linkImages[link.id];

            if (layout === "grid") {
              const squareBR = borderRadius==="sharp"?"4px":borderRadius==="rounded"?"14px":"20px";
              const squareBg = linkStyle==="solid" ? accent : linkStyle==="ghost" ? `${accent}18` : `${accent}0f`;
              const squareBorder = linkStyle==="minimal" ? "none" : `1px solid ${accent}${linkStyle==="bordered"?"42":"28"}`;
              return (
                <button key={link.id} onClick={() => onLinkClick(link)}
                  style={{ aspectRatio:"1", borderRadius:squareBR, background:squareBg, border:squareBorder, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", padding:"12px 8px 14px", position:"relative", overflow:"hidden", animation:`lnyqFadeUp 0.45s ${i*0.05}s ease both`, transition:"all 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";e.currentTarget.style.boxShadow=`0 10px 36px ${accent}38`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}
                  onMouseDown={e=>e.currentTarget.style.transform="scale(0.97)"}
                  onMouseUp={e=>e.currentTarget.style.transform="scale(1.04)"}
                  onTouchStart={e=>{e.currentTarget.style.opacity="0.7";e.currentTarget.style.transform="scale(0.97)";}}
                  onTouchEnd={e=>{e.currentTarget.style.opacity="";e.currentTarget.style.transform="";}}
                >
                  {imgSrc ? (
                    <div style={{ position:"absolute", inset:0, zIndex:0 }}>
                      <img src={imgSrc} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="" />
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
                    </div>
                  ) : (
                    <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-65%)", color:linkStyle==="solid"?(["#ffffff","#e4e4e7","#facc15"].includes(accent)?"rgba(0,0,0,0.55)":"rgba(255,255,255,0.55)"):accent, display:"flex", zIndex:1 }}>
                      {React.cloneElement(ic.svg,{width:32,height:32})}
                    </div>
                  )}
                  <div style={{ position:"relative", zIndex:1, fontFamily:ff, fontSize:font==="display"?8:11, fontWeight:600, color:"#fff", letterSpacing:font==="display"?"0.1em":"0.02em", textTransform:font==="display"?"uppercase":"none", textAlign:"center", lineHeight:1.3, textShadow:"0 1px 4px rgba(0,0,0,0.6)", wordBreak:"break-word" }}>
                    {link.title}
                  </div>
                </button>
              );
            }

            return (
              <button key={link.id} className="lnyq-profile-btn" onClick={() => onLinkClick(link)}
                style={{ ...ls, animation:`lnyqFadeUp 0.45s ${i*0.07}s ease both` }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = linkStyle==="solid"?accent:`${accent}22`;
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
                  e.currentTarget.style.boxShadow = `0 10px 36px ${accent}30`;
                  if(ls.border) e.currentTarget.style.borderColor = `${accent}70`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = ls.background||"transparent";
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                  if(ls.border) e.currentTarget.style.borderColor = `${accent}42`;
                }}
                onMouseDown={e=>e.currentTarget.style.transform="scale(0.97)"}
                onMouseUp={e=>e.currentTarget.style.transform="translateY(-2px) scale(1.01)"}
                onTouchStart={e=>{e.currentTarget.style.opacity="0.7";e.currentTarget.style.transform="scale(0.97)";}}
                onTouchEnd={e=>{e.currentTarget.style.opacity="";e.currentTarget.style.transform="";}}
              >
                <span style={{ color:ic.color, display:"flex", flexShrink:0 }}>{React.cloneElement(ic.svg,{width:16,height:16})}</span>
                <span style={{ flex:1, fontFamily:ff, fontSize:font==="display"?10:14, fontWeight:500, letterSpacing:font==="display"?"0.1em":"normal", textTransform:font==="display"?"uppercase":"none" }}>{link.title}</span>
                <span style={{ color:`${accent}60`, fontSize:13 }}>↗</span>
              </button>
            );
          })}
        </div>
        <div style={{ marginTop:52, fontFamily:"var(--mono)", fontSize:9, color:`${accent}30`, letterSpacing:"0.12em", textTransform:"uppercase" }}>Made with Lnyq</div>
      </div>
    </div>
  );
}

/* ─── TOUR STEPS (module-level so runTourStep closure is stable) ─── */
const TOUR_STEPS = [
  { title:"Welcome to Lnyq",        desc:"This is your live link-in-bio page. Everything is interactive — no account needed.",          duration:3200, actionKey:"welcome" },
  { title:"Tap any link",            desc:"Links are fully clickable. Watch the counter in the nav bar update in real time.",            duration:2800, actionKey:"click_link" },
  { title:"Switch themes instantly", desc:"Switching to the Vaporwave preset — retro pink, dreamy gradient.",                           duration:3000, actionKey:"preset_vaporwave" },
  { title:"Try the Luxury look",     desc:"Gold accent, sharp edges, premium display font — instant transformation.",                   duration:3000, actionKey:"preset_luxury" },
  { title:"Customize colors",        desc:"Every accent color is adjustable. This is the Colors tab.",                                  duration:2800, actionKey:"tab_colors" },
  { title:"Grid layout",             desc:"Switch to Grid Squares mode — 2-column layout with image support.",                          duration:3000, actionKey:"layout_grid" },
  { title:"Control the style",       desc:"Link style, border radius — every detail is yours to tweak.",                               duration:2800, actionKey:"tab_style" },
  { title:"Typography",              desc:"Choose from three font families to match your personal brand.",                              duration:2800, actionKey:"tab_type" },
  { title:"Preview on tablet",       desc:"Switch device views to see exactly how your page looks everywhere.",                         duration:2800, actionKey:"device_tablet" },
  { title:"Desktop view",            desc:"Full desktop preview — your page adapts to every screen size.",                              duration:2800, actionKey:"device_desktop" },
  { title:"Back to mobile",          desc:"Most visitors are on mobile — this is what they'll see.",                                   duration:2800, actionKey:"device_mobile" },
  { title:"Now it's your turn",      desc:"Play with every setting. Your perfect link page is a few clicks away.",                     duration:0,    actionKey:"done" },
];


function DemoPage() {
  const [device, setDevice] = useState("mobile");
  const [themeId, setThemeId] = useState("cyberpunk");
  const [accent, setAccent] = useState("#00ff9f");
  const [linkStyle, setLinkStyle] = useState("solid");
  const [borderRadius, setBorderRadius] = useState("pill");
  const [font, setFont] = useState("mono");
  const [particles, setParticles] = useState(true);
  const [activeSection, setActiveSection] = useState("presets");
  const [onboardStep, setOnboardStep] = useState(0);
  const [clickLog, setClickLog] = useState([]);
  const [toastEl, showToast] = useToast();
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.85);
  const [layout, setLayout] = useState("list"); // "list" | "grid"
  const [linkImages, setLinkImages] = useState({}); // id -> dataURL

  const DEMO_PROFILE = { display_name:"Alex Rivera", username:"alexrivera", bio:"Digital creator & photographer 📸  Tokyo → LA", avatar_url:null };

  const DEMO_LINKS = [
    { id:1, icon_key:"instagram", title:"Follow on Instagram", url:"#" },
    { id:2, icon_key:"youtube",   title:"Watch on YouTube",    url:"#" },
    { id:3, icon_key:"tiktok",    title:"TikTok Videos",       url:"#" },
    { id:4, icon_key:"spotify",   title:"My Playlist",         url:"#" },
    { id:5, icon_key:"twitter",   title:"X / Twitter",         url:"#" },
    { id:6, icon_key:"github",    title:"GitHub Projects",     url:"#" },
    { id:7, icon_key:"website",   title:"My Portfolio",        url:"#" },
    { id:8, icon_key:"email",     title:"Get in Touch",        url:"#" },
  ];

  const DEVICES = {
    mobile:  { width:375,  frameH:780, label:"Mobile",  chrome:"phone"   },
    tablet:  { width:768,  frameH:880, label:"Tablet",  chrome:"tablet"  },
    desktop: { width:1280, frameH:680, label:"Desktop", chrome:"browser" },
  };

  const tourTimerRef = useRef(null);

  const execTourAction = useCallback((actionKey) => {
    if (!actionKey || actionKey === "welcome") return;
    if (actionKey === "click_link") {
      setClickLog(prev => [{ id:1, icon_key:"instagram", title:"Follow on Instagram", ts:Date.now() }, ...prev.slice(0,7)]);
    } else if (actionKey === "preset_vaporwave") {
      setActiveSection("presets");
      const p = DEMO_PRESETS.find(x => x.id === "vaporwave");
      if (p) { setThemeId(p.id); setAccent(p.accent); setLinkStyle(p.linkStyle); setBorderRadius(p.borderRadius); setFont(p.font); setParticles(p.particles); }
    } else if (actionKey === "preset_luxury") {
      const p = DEMO_PRESETS.find(x => x.id === "luxury");
      if (p) { setThemeId(p.id); setAccent(p.accent); setLinkStyle(p.linkStyle); setBorderRadius(p.borderRadius); setFont(p.font); setParticles(p.particles); }
    } else if (actionKey === "tab_colors")    { setActiveSection("colors"); }
    else if (actionKey === "layout_grid")     { setActiveSection("layout"); setLayout("grid"); }
    else if (actionKey === "tab_style")       { setActiveSection("style"); }
    else if (actionKey === "tab_type")        { setActiveSection("typography"); }
    else if (actionKey === "device_tablet")   { setDevice("tablet"); }
    else if (actionKey === "device_desktop")  { setDevice("desktop"); }
    else if (actionKey === "device_mobile")   { setDevice("mobile"); setLayout("list"); }
    else if (actionKey === "done") {
      const p = DEMO_PRESETS.find(x => x.id === "cyberpunk");
      if (p) { setThemeId(p.id); setAccent(p.accent); setLinkStyle(p.linkStyle); setBorderRadius(p.borderRadius); setFont(p.font); setParticles(p.particles); }
      setActiveSection("presets");
    }
  }, []);

  const runTourStep = useCallback((stepIdx) => {
    if (stepIdx >= TOUR_STEPS.length) { setOnboardStep(-1); return; }
    const step = TOUR_STEPS[stepIdx];
    setOnboardStep(stepIdx);
    execTourAction(step.actionKey);
    if (step.duration > 0) {
      tourTimerRef.current = setTimeout(() => runTourStep(stepIdx + 1), step.duration);
    }
  }, [execTourAction]);

  useEffect(() => {
    tourTimerRef.current = setTimeout(() => runTourStep(0), 800);
    return () => clearTimeout(tourTimerRef.current);
  }, []);

  const skipTour = () => {
    clearTimeout(tourTimerRef.current);
    setOnboardStep(-1);
    execTourAction("done");
    setDevice("mobile"); setLayout("list"); setActiveSection("presets");
  };

  const nextTourStep = () => {
    clearTimeout(tourTimerRef.current);
    runTourStep(onboardStep + 1);
  };

  const applyPreset = (preset) => {
    setThemeId(preset.id);
    setAccent(preset.accent);
    setLinkStyle(preset.linkStyle);
    setBorderRadius(preset.borderRadius);
    setFont(preset.font);
    setParticles(preset.particles);
  };

  useEffect(() => {
    const recalc = () => {
      if (!containerRef.current) return;
      const avail = containerRef.current.offsetWidth - 48;
      setScale(Math.max(Math.min(avail / DEVICES[device].width, 1), 0.18));
    };
    recalc();
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [device]);

  const handleLinkClick = (link) => {
    setClickLog(prev => [{...link, ts:Date.now()}, ...prev.slice(0,7)]);
    showToast(`↗  ${link.title}`);
  };

  const advanceOnboard = nextTourStep;

  const dv = DEVICES[device];
  const frameW = dv.width * scale;
  const frameH = dv.frameH * scale;

  const screen = (
    <div style={{ width:frameW, height:frameH, overflow:"hidden", background:"#000", borderRadius:dv.chrome==="phone"?30*scale:dv.chrome==="tablet"?8*scale:4 }}>
      <div style={{ width:dv.width, height:dv.frameH, transform:`scale(${scale})`, transformOrigin:"top left", overflowY:"auto", overflowX:"hidden" }}>
        <DemoLinkPage profile={DEMO_PROFILE} links={DEMO_LINKS} accent={accent} themeId={themeId}
          linkStyle={linkStyle} borderRadius={borderRadius} font={font} particles={particles} onLinkClick={handleLinkClick}
          layout={layout} linkImages={linkImages} />
      </div>
    </div>
  );

  const DeviceFrame = () => {
    if(dv.chrome==="phone") return (
      <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:44*scale, padding:`${14*scale}px ${12*scale}px`, boxShadow:"0 50px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04)" }}>
        <div style={{ height:26*scale, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:4*scale }}>
          <div style={{ width:90*scale, height:8*scale, background:"rgba(255,255,255,0.1)", borderRadius:20 }} />
        </div>
        {screen}
        <div style={{ height:22*scale, display:"flex", alignItems:"center", justifyContent:"center", marginTop:8*scale }}>
          <div style={{ width:110*scale, height:4*scale, background:"rgba(255,255,255,0.2)", borderRadius:20 }} />
        </div>
      </div>
    );
    if(dv.chrome==="tablet") return (
      <div style={{ background:"rgba(255,255,255,0.035)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:22*scale, padding:`${20*scale}px ${18*scale}px`, boxShadow:"0 40px 100px rgba(0,0,0,0.8)" }}>
        <div style={{ height:18*scale, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8*scale }}>
          <div style={{ width:8*scale, height:8*scale, borderRadius:"50%", background:"rgba(255,255,255,0.12)" }} />
        </div>
        {screen}
        <div style={{ height:14*scale, display:"flex", alignItems:"center", justifyContent:"center", marginTop:8*scale }}>
          <div style={{ width:80*scale, height:4*scale, background:"rgba(255,255,255,0.18)", borderRadius:20 }} />
        </div>
      </div>
    );
    return (
      <div style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, padding:"12px 14px 14px", boxShadow:"0 30px 80px rgba(0,0,0,0.75)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }} />)}
          <div style={{ flex:1, marginLeft:6, height:22, background:"rgba(255,255,255,0.06)", borderRadius:5, display:"flex", alignItems:"center", padding:"0 12px" }}>
            <span style={{ fontFamily:"var(--mono)", fontSize:9, color:"rgba(255,255,255,0.22)" }}>lnyq.link/alexrivera</span>
          </div>
        </div>
        {screen}
      </div>
    );
  };

  const SECTIONS = [
    { id:"presets",    label:"Presets"  },
    { id:"colors",     label:"Colors"   },
    { id:"style",      label:"Style"    },
    { id:"layout",     label:"Layout"   },
    { id:"typography", label:"Type"     },
  ];

  const SL = ({children}) => (
    <div style={{ fontFamily:"var(--mono)", fontSize:8, letterSpacing:"0.18em", color:"rgba(255,255,255,0.22)", textTransform:"uppercase", marginBottom:10 }}>{children}</div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#000", display:"flex", flexDirection:"column" }}>
      <style>{css}</style>
      {toastEl}

      {/* NAV */}
      <div style={{ height:54, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 18px", borderBottom:"1px solid rgba(255,255,255,0.06)", background:"rgba(0,0,0,0.94)", backdropFilter:"blur(20px)", position:"sticky", top:0, zIndex:200, gap:10, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ fontFamily:"var(--display)", fontSize:15, fontWeight:900, letterSpacing:"0.1em", color:"#fff", cursor:"pointer", textTransform:"uppercase" }} onClick={()=>navigate("/")}>Lnyq</div>
          <div style={{ fontFamily:"var(--mono)", fontSize:7.5, letterSpacing:"0.16em", color:`${accent}cc`, textTransform:"uppercase", background:`${accent}14`, border:`1px solid ${accent}30`, borderRadius:3, padding:"4px 9px", transition:"all 0.3s" }}>Interactive Demo</div>
        </div>
        <div style={{ display:"flex", gap:1, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:5, padding:3 }}>
          {Object.entries(DEVICES).map(([key,d]) => (
            <button key={key} onClick={()=>setDevice(key)}
              style={{ padding:"5px 14px", borderRadius:4, border:"none", cursor:"pointer", fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", background:device===key?"rgba(255,255,255,0.14)":"transparent", color:device===key?"#fff":"rgba(255,255,255,0.3)", transition:"all 0.15s" }}>
              {d.label}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {clickLog.length > 0 && (
            <div style={{ fontFamily:"var(--mono)", fontSize:9, color:"rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:3, padding:"4px 10px", display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:accent, boxShadow:`0 0 6px ${accent}`, animation:"lnyqPulse 2s ease infinite", transition:"background 0.3s" }} />
              {clickLog.length} click{clickLog.length!==1?"s":""}
            </div>
          )}
          <button className="lnyq-btn lnyq-btn-ghost lnyq-btn-sm" onClick={()=>navigate("/")}>← Home</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex:1, display:"flex", minHeight:0, overflow:"hidden" }}>
        {/* Preview */}
        <div ref={containerRef} style={{ flex:1, display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"36px 20px 60px", overflow:"auto", minWidth:0 }}>
          <DeviceFrame />
        </div>

        {/* Controls */}
        <div style={{ width:268, flexShrink:0, borderLeft:"1px solid rgba(255,255,255,0.06)", background:"rgba(255,255,255,0.012)", display:"flex", flexDirection:"column", overflow:"hidden" }}>
          {/* Section tabs */}
          <div style={{ display:"flex", borderBottom:"1px solid rgba(255,255,255,0.06)", flexShrink:0 }}>
            {SECTIONS.map(s => (
              <button key={s.id} onClick={()=>setActiveSection(s.id)}
                style={{ flex:1, padding:"11px 4px", border:"none", cursor:"pointer", fontFamily:"var(--mono)", fontSize:8.5, letterSpacing:"0.1em", textTransform:"uppercase", background:"transparent", color:activeSection===s.id?"#fff":"rgba(255,255,255,0.25)", borderBottom:`2px solid ${activeSection===s.id?accent:"transparent"}`, transition:"all 0.15s" }}>
                {s.label}
              </button>
            ))}
          </div>

          <div style={{ flex:1, overflowY:"auto", padding:"18px 15px", display:"flex", flexDirection:"column", gap:22 }}>

            {/* PRESETS */}
            {activeSection==="presets" && (
              <div>
                <SL>Preset Themes</SL>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {DEMO_PRESETS.map(p => (
                    <div key={p.id} onClick={()=>applyPreset(p)}
                      style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 11px", borderRadius:7, cursor:"pointer", border:`1px solid ${themeId===p.id?`${p.accent}55`:"rgba(255,255,255,0.06)"}`, background:themeId===p.id?`${p.accent}0d`:"rgba(255,255,255,0.015)", transition:"all 0.2s", position:"relative", overflow:"hidden" }}>
                      {themeId===p.id && <div style={{ position:"absolute", left:0, top:0, bottom:0, width:2.5, background:p.accent, borderRadius:1 }} />}
                      <div style={{ width:32, height:32, borderRadius:6, background:p.bg, border:`1px solid ${p.accent}28`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 }}>{p.emoji}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:"var(--sans)", fontSize:12.5, fontWeight:600, color:themeId===p.id?"#fff":"rgba(255,255,255,0.5)", marginBottom:1 }}>{p.name}</div>
                        <div style={{ fontFamily:"var(--mono)", fontSize:7.5, color:"rgba(255,255,255,0.18)", letterSpacing:"0.06em", textTransform:"uppercase" }}>{p.desc}</div>
                      </div>
                      <div style={{ width:9, height:9, borderRadius:"50%", background:p.accent, flexShrink:0, boxShadow:themeId===p.id?`0 0 8px ${p.accent}`:"none", transition:"box-shadow 0.2s" }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COLORS */}
            {activeSection==="colors" && (
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                <div>
                  <SL>Accent Color</SL>
                  <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                    {ACCENTS.map(c => (
                      <div key={c} onClick={()=>setAccent(c)} style={{ width:30, height:30, borderRadius:"50%", background:c, cursor:"pointer", border:accent===c?"3px solid rgba(255,255,255,0.9)":"2px solid transparent", transform:accent===c?"scale(1.2)":"scale(1)", transition:"all 0.15s", boxShadow:accent===c?`0 0 16px ${c}99`:"none" }} />
                    ))}
                  </div>
                </div>
                <div>
                  <SL>Custom Color</SL>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <input type="color" value={accent} onChange={e=>setAccent(e.target.value)}
                      style={{ width:38, height:30, borderRadius:6, border:"1px solid rgba(255,255,255,0.1)", background:"transparent", cursor:"pointer", padding:2 }} />
                    <div style={{ fontFamily:"var(--mono)", fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:"0.06em" }}>{accent}</div>
                  </div>
                </div>
                <div>
                  <SL>Particles</SL>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div onClick={()=>setParticles(v=>!v)} style={{ width:40, height:22, borderRadius:11, background:particles?accent:"rgba(255,255,255,0.1)", cursor:"pointer", position:"relative", transition:"background 0.25s", border:`1px solid ${particles?accent+"88":"rgba(255,255,255,0.1)"}` }}>
                      <div style={{ position:"absolute", top:2, left:particles?18:2, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left 0.25s", boxShadow:"0 1px 4px rgba(0,0,0,0.4)" }} />
                    </div>
                    <span style={{ fontFamily:"var(--mono)", fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:"0.06em", textTransform:"uppercase" }}>{particles?"On":"Off"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* STYLE */}
            {activeSection==="style" && (
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                <div>
                  <SL>Link Style</SL>
                  {LINK_STYLES.map(s => (
                    <div key={s.id} onClick={()=>setLinkStyle(s.id)} style={{ padding:"10px 12px", marginBottom:5, borderRadius:6, cursor:"pointer", border:`1px solid ${linkStyle===s.id?"rgba(255,255,255,0.28)":"rgba(255,255,255,0.06)"}`, background:linkStyle===s.id?"rgba(255,255,255,0.08)":"transparent", display:"flex", alignItems:"center", justifyContent:"space-between", fontFamily:"var(--sans)", fontSize:13, color:linkStyle===s.id?"#fff":"rgba(255,255,255,0.38)", transition:"all 0.15s" }}>
                      {s.name}{linkStyle===s.id&&<span style={{fontFamily:"var(--mono)",fontSize:9,color:"rgba(255,255,255,0.4)"}}>✓</span>}
                    </div>
                  ))}
                </div>
                <div>
                  <SL>Button Radius</SL>
                  {[{id:"sharp",label:"Sharp"},{id:"rounded",label:"Rounded"},{id:"pill",label:"Pill"}].map(r => (
                    <div key={r.id} onClick={()=>setBorderRadius(r.id)} style={{ padding:"10px 12px", marginBottom:5, borderRadius:6, cursor:"pointer", border:`1px solid ${borderRadius===r.id?"rgba(255,255,255,0.28)":"rgba(255,255,255,0.06)"}`, background:borderRadius===r.id?"rgba(255,255,255,0.08)":"transparent", display:"flex", alignItems:"center", justifyContent:"space-between", fontFamily:"var(--sans)", fontSize:13, color:borderRadius===r.id?"#fff":"rgba(255,255,255,0.38)", transition:"all 0.15s" }}>
                      {r.label}{borderRadius===r.id&&<span style={{fontFamily:"var(--mono)",fontSize:9,color:"rgba(255,255,255,0.4)"}}>✓</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LAYOUT */}
            {activeSection==="layout" && (
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                <div>
                  <SL>Link Layout</SL>
                  {[{id:"list",label:"List",sub:"Full-width rows with icon"},{id:"grid",label:"Grid Squares",sub:"2-col squares with image/icon"}].map(l => (
                    <div key={l.id} onClick={()=>setLayout(l.id)} style={{ padding:"10px 12px", marginBottom:5, borderRadius:6, cursor:"pointer", border:`1px solid ${layout===l.id?"rgba(255,255,255,0.28)":"rgba(255,255,255,0.06)"}`, background:layout===l.id?"rgba(255,255,255,0.08)":"transparent", display:"flex", alignItems:"center", justifyContent:"space-between", transition:"all 0.15s" }}>
                      <div>
                        <div style={{ fontFamily:"var(--sans)", fontSize:13, color:layout===l.id?"#fff":"rgba(255,255,255,0.38)", marginBottom:2 }}>{l.label}</div>
                        <div style={{ fontFamily:"var(--mono)", fontSize:8, color:"rgba(255,255,255,0.2)", letterSpacing:"0.06em", textTransform:"uppercase" }}>{l.sub}</div>
                      </div>
                      {layout===l.id && <span style={{fontFamily:"var(--mono)",fontSize:9,color:"rgba(255,255,255,0.4)"}}>✓</span>}
                    </div>
                  ))}
                </div>
                {layout==="grid" && (
                  <div>
                    <SL>Square Images</SL>
                    <div style={{ fontFamily:"var(--mono)", fontSize:8, color:"rgba(255,255,255,0.2)", letterSpacing:"0.06em", marginBottom:12, lineHeight:1.6 }}>Upload a custom image for each square. Leave blank to use the platform icon.</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {[
                        { id:1, title:"Instagram", icon:"instagram" },
                        { id:2, title:"YouTube", icon:"youtube" },
                        { id:3, title:"TikTok", icon:"tiktok" },
                        { id:4, title:"Spotify", icon:"spotify" },
                        { id:5, title:"X / Twitter", icon:"twitter" },
                        { id:6, title:"GitHub", icon:"github" },
                        { id:7, title:"Portfolio", icon:"website" },
                        { id:8, title:"Email", icon:"email" },
                      ].map(link => {
                        const ic = SOCIAL_ICONS[link.icon];
                        return (
                          <div key={link.id} style={{ display:"flex", alignItems:"center", gap:9 }}>
                            <div style={{ width:36, height:36, borderRadius:7, background:`${accent}14`, border:`1px solid ${accent}28`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden" }}>
                              {linkImages[link.id]
                                ? <img src={linkImages[link.id]} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="" />
                                : <span style={{color:ic.color,display:"flex"}}>{React.cloneElement(ic.svg,{width:14,height:14})}</span>
                              }
                            </div>
                            <div style={{ flex:1, minWidth:0 }}>
                              <div style={{ fontFamily:"var(--sans)", fontSize:11, color:"rgba(255,255,255,0.55)", marginBottom:4 }}>{link.title}</div>
                              <label style={{ display:"flex", alignItems:"center", gap:6, cursor:"pointer" }}>
                                <span style={{ fontFamily:"var(--mono)", fontSize:8, color:accent, letterSpacing:"0.08em", textTransform:"uppercase", background:`${accent}14`, border:`1px solid ${accent}30`, borderRadius:3, padding:"3px 8px", cursor:"pointer", whiteSpace:"nowrap" }}>
                                  {linkImages[link.id] ? "Change" : "Upload"}
                                </span>
                                {linkImages[link.id] && (
                                  <span onClick={()=>setLinkImages(prev=>{const n={...prev};delete n[link.id];return n;})} style={{ fontFamily:"var(--mono)", fontSize:8, color:"rgba(239,68,68,0.7)", cursor:"pointer", letterSpacing:"0.06em" }}>✕</span>
                                )}
                                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{
                                  const file=e.target.files[0];
                                  if(!file) return;
                                  const reader=new FileReader();
                                  reader.onload=ev=>setLinkImages(prev=>({...prev,[link.id]:ev.target.result}));
                                  reader.readAsDataURL(file);
                                  e.target.value="";
                                }} />
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TYPOGRAPHY */}
            {activeSection==="typography" && (
              <div>
                <SL>Font Style</SL>
                {[{id:"sans",label:"Outfit",sub:"Clean & Modern"},{id:"mono",label:"JetBrains Mono",sub:"Technical · Precise"},{id:"display",label:"Orbitron",sub:"BOLD · FUTURISTIC"}].map(f => (
                  <div key={f.id} onClick={()=>setFont(f.id)} style={{ padding:"12px 13px", marginBottom:6, borderRadius:6, cursor:"pointer", border:`1px solid ${font===f.id?"rgba(255,255,255,0.28)":"rgba(255,255,255,0.06)"}`, background:font===f.id?"rgba(255,255,255,0.07)":"transparent", transition:"all 0.15s" }}>
                    <div style={{ fontFamily:f.id==="sans"?"var(--sans)":f.id==="mono"?"var(--mono)":"var(--display)", fontSize:f.id==="display"?10:13, fontWeight:600, color:font===f.id?"#fff":"rgba(255,255,255,0.45)", letterSpacing:f.id==="display"?"0.1em":"normal", textTransform:f.id==="display"?"uppercase":"none", marginBottom:3 }}>{f.label}</div>
                    <div style={{ fontFamily:"var(--mono)", fontSize:7.5, color:"rgba(255,255,255,0.2)", letterSpacing:"0.06em", textTransform:"uppercase" }}>{f.sub}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CLICK LOG */}
            {clickLog.length > 0 && (
              <div>
                <SL>Click Log</SL>
                {clickLog.slice(0,5).map((entry,i) => {
                  const ic = SOCIAL_ICONS[entry.icon_key]||SOCIAL_ICONS.custom;
                  return (
                    <div key={entry.ts} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 9px", marginBottom:4, background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:5, opacity:Math.max(1-i*0.16,0.3) }}>
                      <span style={{ color:ic.color, display:"flex", flexShrink:0 }}>{React.cloneElement(ic.svg,{width:11,height:11})}</span>
                      <span style={{ fontFamily:"var(--sans)", fontSize:11, color:"rgba(255,255,255,0.42)", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{entry.title}</span>
                      <span style={{ fontFamily:"var(--mono)", fontSize:8, color:"rgba(255,255,255,0.15)" }}>↗</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOUR TOAST */}
      {onboardStep >= 0 && onboardStep < TOUR_STEPS.length && (
        <div style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", background:"rgba(6,6,10,0.97)", backdropFilter:"blur(28px)", border:`1px solid ${accent}35`, borderRadius:12, padding:"14px 18px", display:"flex", alignItems:"center", gap:14, zIndex:9998, maxWidth:540, width:"calc(100% - 40px)", boxShadow:`0 24px 70px rgba(0,0,0,0.9),0 0 40px ${accent}12`, animation:"lnyqFadeUp 0.35s cubic-bezier(0.34,1.56,0.64,1)", transition:"border-color 0.4s,box-shadow 0.4s" }}>

          {/* Progress dots */}
          <div style={{ display:"flex", flexDirection:"column", gap:3, flexShrink:0 }}>
            {TOUR_STEPS.map((_,i) => (
              <div key={i} style={{ width:2.5, height:i===onboardStep?18:2.5, borderRadius:10, background:i===onboardStep?accent:i<onboardStep?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.1)", transition:"all 0.35s cubic-bezier(0.4,0,0.2,1)" }} />
            ))}
          </div>

          {/* Content */}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:accent, boxShadow:`0 0 8px ${accent}`, animation:"lnyqPulse 1.4s ease infinite", flexShrink:0 }} />
              <div style={{ fontFamily:"var(--display)", fontSize:10, fontWeight:700, letterSpacing:"0.1em", color:"#fff", textTransform:"uppercase" }}>{TOUR_STEPS[onboardStep].title}</div>
              <div style={{ fontFamily:"var(--mono)", fontSize:7.5, color:"rgba(255,255,255,0.2)", letterSpacing:"0.08em", marginLeft:"auto", whiteSpace:"nowrap" }}>{onboardStep + 1} / {TOUR_STEPS.length}</div>
            </div>
            <div style={{ fontFamily:"var(--sans)", fontSize:12.5, color:"rgba(255,255,255,0.42)", lineHeight:1.55 }}>{TOUR_STEPS[onboardStep].desc}</div>

            {/* Progress bar */}
            {TOUR_STEPS[onboardStep].duration > 0 && (
              <div style={{ marginTop:10, height:1.5, background:"rgba(255,255,255,0.07)", borderRadius:10, overflow:"hidden" }}>
                <div key={onboardStep} style={{ height:"100%", background:accent, borderRadius:10, animation:`lnyqLineReveal ${TOUR_STEPS[onboardStep].duration}ms linear both` }} />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display:"flex", flexDirection:"column", gap:5, flexShrink:0, alignItems:"stretch" }}>
            <button onClick={nextTourStep}
              style={{ padding:"8px 14px", borderRadius:5, border:`1px solid ${accent}55`, background:`${accent}1a`, color:"#fff", cursor:"pointer", fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.08em", textTransform:"uppercase", whiteSpace:"nowrap", transition:"background 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.background=`${accent}32`}
              onMouseLeave={e=>e.currentTarget.style.background=`${accent}1a`}>
              {onboardStep === TOUR_STEPS.length - 1 ? "Done ✓" : "Skip step →"}
            </button>
            <button onClick={skipTour}
              style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"var(--mono)", fontSize:8, color:"rgba(255,255,255,0.16)", letterSpacing:"0.08em", textTransform:"uppercase", padding:"2px", textAlign:"center", transition:"color 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.4)"}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.16)"}>
              End tour
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── APP ROOT ───────────────────────────────────────────── */
export default function App() {
  const [session, setSession] = useState(undefined);
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => {
      setSession(s);
      // After auth, go to the user's public profile page instead of dashboard
      if (s) {
        supabase.from("profiles").select("username").eq("id", s.user.id).maybeSingle().then(({ data: p }) => {
          if (p?.username) navigate(`/${p.username}`);
        });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handler = () => setRoute(getRoute());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  useEffect(() => {
    if (session && (route.page === "landing" || route.page === "auth")) {
      // Don't redirect away from landing; let user navigate freely
    }
  }, [session, route.page]);

  const logout = async () => { await supabase.auth.signOut(); setSession(null); navigate("/"); };

  if (session === undefined) return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{css}</style>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ width: 36, height: 36, border: "2px solid rgba(255,255,255,0.06)", borderTopColor: "rgba(255,255,255,0.3)", borderRadius: "50%", animation: "lnyqSpin 0.7s linear infinite" }} />
        <div style={{
          fontFamily: "var(--display)", fontSize: 20, fontWeight: 800,
          letterSpacing: "-0.02em", color: "#fff"
        }}>Lnyq</div>
      </div>
    </div>
  );

  return (
    <>
      <style>{css}</style>
      {route.page === "landing" && <Landing session={session} />}
      {route.page === "auth" && <AuthPage onAuth={setSession} />}
      {route.page === "demo" && <DemoPage />}
      {route.page === "dashboard" && session && <Dashboard session={session} onLogout={logout} />}
      {route.page === "dashboard" && !session && <AuthPage onAuth={setSession} />}
      {route.page === "profile" && <ProfilePage username={route.username} />}
    </>
  );
}
