import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Shield, Zap, UserRound } from "lucide-react";

interface NavbarProps {
  onOpenGetStarted?: () => void;
  onReplayIntro?: () => void;
  onOpenAdmin?: () => void;
  onOpenClientPortal?: () => void;
}

export default function Navbar({ onOpenGetStarted, onReplayIntro, onOpenAdmin, onOpenClientPortal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        "home",
        "how-to-access",
        "about",
        "features",
        "terminal",
        "system-status",
        "investor-accounts",
        "performance",
        "reviews",
        "brokers",
        "contact",
      ];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Get Access", href: "#how-to-access" },
    { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "MT5 Terminal", href: "#terminal" },
    { label: "Status", href: "#system-status" },
    { label: "Open Live Accounts", href: "#investor-accounts" },
    { label: "Performance", href: "#performance" },
    { label: "Reviews", href: "#reviews" },
    { label: "Brokers", href: "#brokers" },
    { label: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetStartedClick = () => {
    if (onOpenGetStarted) {
      onOpenGetStarted();
    } else {
      const accessSection = document.getElementById("how-to-access");
      if (accessSection) {
        accessSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#090514]/90 backdrop-blur-xl border-b border-purple-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          : "bg-transparent border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Official VelOrrbit Logo Brand Zone */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, "#home")}
            className="group flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg p-1"
          >
            <div className="relative w-11 h-11 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-400 via-purple-500 to-indigo-400 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-04_at_14.10.57_c702b209.jpeg"
                alt="VelOrrbit Official Logo"
                className="w-full h-full object-cover rounded-full bg-black"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -inset-1 rounded-full bg-purple-500/20 blur-sm -z-10 group-hover:bg-purple-500/40 transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
                VelOrrbit<span className="text-amber-400">.</span>
              </span>
              <span className="text-[9px] tracking-widest uppercase font-semibold text-purple-300/80 -mt-1 hidden sm:block">
                Fully Automatic Trading System
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`relative px-2.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 rounded-md whitespace-nowrap ${
                    isActive
                      ? "text-amber-300 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Zone: Standout GET ACCESS FREE Button & Cinematic Replay Button & Admin */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-xs font-mono text-purple-200 hover:text-amber-300 transition-colors cursor-pointer"
                title="Watch Cinematic Universe Intro"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Intro</span>
              </button>
            )}

            {onOpenClientPortal && (
              <button
                onClick={onOpenClientPortal}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-xs font-bold text-amber-200 transition-colors cursor-pointer"
                title="Open VelOrrbit Client Portal"
              >
                <UserRound className="w-3.5 h-3.5" />
                <span>Client Login</span>
              </button>
            )}

            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/60 hover:bg-purple-950/80 border border-purple-500/30 text-xs font-mono text-slate-300 hover:text-amber-300 transition-colors cursor-pointer"
                title="Open Admin Content & Reviews Manager"
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin</span>
              </button>
            )}

            <button
              onClick={handleGetStartedClick}
              className="relative group overflow-hidden px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide text-white transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.35)]"
            >
              {/* Animated glowing border gradient */}
              <span className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-purple-500 via-amber-400 to-indigo-500 -z-10 group-hover:opacity-100 transition-opacity" />
              {/* Background gradient fill */}
              <span className="absolute inset-[1px] rounded-[11px] bg-gradient-to-r from-purple-900/90 via-[#1f1035] to-purple-950/90 -z-10 group-hover:bg-gradient-to-r group-hover:from-purple-800 group-hover:to-indigo-900 transition-all" />
              {/* Light sweep effect */}
              <span className="absolute inset-0 w-1/2 h-full bg-white/10 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out pointer-events-none" />

              <span className="flex items-center gap-2 whitespace-nowrap">
                <span className="gold-gradient-text uppercase font-black tracking-wider">GET ACCESS FREE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-purple-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0618]/98 border-b border-purple-500/30 px-5 pt-3 pb-6 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-purple-900/40 text-amber-300 border border-purple-500/30 font-semibold"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                </a>
              );
            })}

            <div className="pt-4 border-t border-purple-500/20 mt-2 space-y-2">
              {onOpenClientPortal && (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenClientPortal(); }}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm text-center text-amber-200 border border-amber-400/30 bg-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserRound className="w-4 h-4" /> Client Login / Register
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGetStartedClick();
                }}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-center text-white bg-gradient-to-r from-purple-700 via-amber-500 to-purple-800 shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>GET ACCESS FREE</span>
              </button>

              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-center text-slate-300 hover:text-white bg-black/60 border border-purple-500/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span>Admin Console (Reviews & Content)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
