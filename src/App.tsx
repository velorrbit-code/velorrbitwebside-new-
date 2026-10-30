import React, { useState } from "react";
import { SupabaseProvider } from "./context/SupabaseContext";
import { ContentProvider } from "./context/ContentContext";
import AnnouncementBanner from "./components/AnnouncementBanner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowToAccessSection from "./components/HowToAccessSection";
import AboutSection from "./components/AboutSection";
import FeaturesSection from "./components/FeaturesSection";
import TradingTerminalShowcase from "./components/TradingTerminalShowcase";
import SystemStatusDashboard from "./components/SystemStatusDashboard";
import PerformanceShowcase from "./components/PerformanceShowcase";
import LiveInvestorAccounts from "./components/LiveInvestorAccounts";
import SupportPanel from "./components/SupportPanel";
import ReviewsSection from "./components/ReviewsSection";
import BrokerSection from "./components/BrokerSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import BackgroundOrbits from "./components/BackgroundOrbits";
import GetStartedModal from "./components/GetStartedModal";
import AdminDashboard from "./components/AdminDashboard";
import CinematicOpening from "./components/CinematicOpening";
import ClientPortal from "./components/ClientPortal";

function MainApp() {
  const [getStartedModalOpen, setGetStartedModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [clientPortalOpen, setClientPortalOpen] = useState(false);
  
  // Cinematic universe intro shown on first visit per session
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return sessionStorage.getItem("velorrbit_universe_intro_seen") !== "true";
    } catch {
      return true;
    }
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem("velorrbit_universe_intro_seen", "true");
    } catch {
      // ignore
    }
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  return (
    <div className="relative min-h-screen bg-[#040108] text-slate-100 selection:bg-purple-600 selection:text-white">
      {/* Cinematic Opening Experience (Played on first session visit or when replayed) */}
      {showIntro && <CinematicOpening onComplete={handleIntroComplete} />}

      {/* Universe Canvas: Starfield, Celestial Glowing Planet, and Orbital Particles */}
      <BackgroundOrbits />

      {/* Dynamic Announcement Banner (Admin Editable) */}
      <AnnouncementBanner />

      {/* Modern Transparent Navigation Bar */}
      <Navbar 
        onOpenGetStarted={() => {
          const accessSection = document.getElementById("how-to-access");
          if (accessSection) {
            accessSection.scrollIntoView({ behavior: "smooth" });
          } else {
            setGetStartedModalOpen(true);
          }
        }} 
        onReplayIntro={handleReplayIntro}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenClientPortal={() => setClientPortalOpen(true)}
      />

      {/* Main Universe Website Content */}
      <main className="relative z-10">
        {/* 1. Cinematic Universe Hero Section */}
        <Hero onReplayIntro={handleReplayIntro} />

        {/* 2. Official How to Request Free Access Section (Target of GET ACCESS FREE) */}
        <HowToAccessSection />

        {/* 3. About VelOrrbit Section */}
        <AboutSection />

        {/* 4. Trading System Features Section (6 Pillars) */}
        <FeaturesSection />

        {/* 5. MT5 Trading Visual Showcase */}
        <TradingTerminalShowcase />

        {/* 6. System Status Dashboard (Real-time Connectivity & Latency Telemetry) */}
        <SystemStatusDashboard />

        {/* 7. Live MT5 Investor Accounts (Investor Password Security Protocol) */}
        <LiveInvestorAccounts />

        {/* 8. Performance Showcase (Verified MT5 Account #32273 REAL) */}
        <PerformanceShowcase />

        {/* 9. Customer Reviews & Testimonials (Connected to Supabase / Admin) */}
        <ReviewsSection />

        {/* 10. Broker Options & Profit-Sharing Terms (EC Markets & Skyriss) */}
        <BrokerSection />

        {/* 11. Quick Support & Conversion Panel */}
        <SupportPanel />

        {/* 12. Contact, Community & Inquiries */}
        <ContactSection />
      </main>

      {/* 11. Futuristic Footer & Trading Risk Disclaimer */}
      <Footer onOpenAdmin={() => setAdminModalOpen(true)} />

      {/* Interactive Get Started Onboarding Modal */}
      <GetStartedModal
        isOpen={getStartedModalOpen}
        onClose={() => setGetStartedModalOpen(false)}
      />

      {/* Secure Admin Content & Reviews Manager (Connected to Supabase) */}
      <AdminDashboard
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />

      {/* Client registration, login, and referral rewards portal */}
      <ClientPortal
        isOpen={clientPortalOpen}
        onClose={() => setClientPortalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <SupabaseProvider>
      <ContentProvider>
        <MainApp />
      </ContentProvider>
    </SupabaseProvider>
  );
}
