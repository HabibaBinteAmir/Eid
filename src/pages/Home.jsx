import React, { useState, useEffect } from "react";
import banner from '../assets/banner.jpg';
import { SettingsModal } from "../components/SettingsModal";
import { Payment } from "../components/Payment";
import {
  createSharedLink,
  getGlobalSettings,
  getSharedParam,
  getSharedData,
} from "../lib/eidData";

export const Home = () => {
  const [name, setName] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [settings, setSettings] = useState(null);

  const sharedParam = getSharedParam();
  const isShared = !!sharedParam;

  const handleShare = () => {
    if (isShared || isSharing) return;

    (async () => {
      setIsSharing(true);
      const current = settings || (await getGlobalSettings());
      const data = {
        name: current.name || "",
        upay: current.upay || "",
        bkash: current.bkash || "",
        nagad: current.nagad || "",
        rocket: current.rocket || "",
      };
      const queryParam = await createSharedLink(data);
      const url = `${window.location.origin}/${queryParam}`;
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setIsSharing(false);
      setTimeout(() => setShareCopied(false), 2000);
    })();
  };

  useEffect(() => {
    let cancelled = false;

    if (isShared) {
      (async () => {
        const data = await getSharedData(sharedParam);
        if (!cancelled && data) {
          setName(data.name || "আপনার নাম");
          setSettings(data);
        }
      })();
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      const current = await getGlobalSettings();
      if (cancelled) return;
      setSettings(current);
      setName(current.name || "");
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShared, sharedParam?.type, sharedParam?.value, showSettings]);

  return (
    <div className="relative w-full">

      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${banner})` }}
      />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/20" />
      {/* Floating action buttons (main link only) */}
      {!isShared && (
        <div className="fixed top-4 right-4 z-20 flex gap-2">
          {/* Share button */}
          <button
            onClick={handleShare}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-110"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              color: shareCopied ? "#4ade80" : "#ffffff",
            }}
            title="Share"
          >
            {shareCopied ? "✓" : "⎘"}
          </button>

          {/* Settings button */}
          <button
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-110"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              color: "#ffffff",
            }}
            title="Settings"
          >
            ⚙
          </button>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-10 px-4 text-center">

        {/* Stars */}
        <div
          className="flex items-center gap-3 mb-1"
          style={{ animation: "riseIn 700ms ease both", animationDelay: "80ms" }}
        >
          <span className="text-yellow-400">✦</span>
          <span className="text-yellow-300 text-sm">❋</span>
          <span className="text-yellow-300 text-sm">❋</span>
          <span className="text-yellow-400">✦</span>
        </div>

        {/* Arabic */}
        <p
          className="text-yellow-400 text-base md:text-lg mb-1 tracking-wide font-serif"
          style={{ animation: "riseIn 700ms ease both", animationDelay: "140ms" }}
        >
          عيد مبارك
        </p>

        {/* Main Heading */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-wide drop-shadow-[0_2px_16px_rgba(245,200,66,0.5)]"
          style={{
            background: "linear-gradient(90deg, #ffffff, #facc15, #ffffff)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 2s linear infinite, riseIn 900ms ease both",
          }}
        >
          ঈদ মোবারক
        </h1>

        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }

          @keyframes riseIn {
            0% { opacity: 0; transform: translateY(14px) scale(0.99); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        {/* Star divider */}
        <div
          className="flex items-center gap-2 my-2 text-yellow-500"
          style={{ animation: "riseIn 700ms ease both", animationDelay: "220ms" }}
        >
          <span className="text-xs">✦</span>
          <div className="w-16 md:w-24 h-px bg-yellow-500/50" />
          <span className="text-xs">✦</span>
          <div className="w-16 md:w-24 h-px bg-yellow-500/50" />
          <span className="text-xs">✦</span>
        </div>

        {/* Subtitle */}
        <p
          className="text-white/80 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-sm md:max-w-md leading-relaxed"
          style={{ animation: "riseIn 700ms ease both", animationDelay: "300ms" }}
        >
          আসসালামু আলাইকুম। সবাইকে ঈদের শুভেচ্ছা। <br />আল্লাহ আপনার সব দোয়া কবুল করুন।
        </p>

        {/* Sender box */}
        <div
          className="mt-3 flex flex-col items-center gap-1"
          style={{ animation: "riseIn 700ms ease both", animationDelay: "380ms" }}
        >
          <div
            className="border border-yellow-500/60 rounded-xl px-6 py-2 bg-black/20 backdrop-blur-sm text-yellow-400 text-xl sm:text-2xl md:text-3xl font-semibold tracking-widest hover:border-yellow-400 hover:bg-black/30 transition-all duration-300 group relative"
            style={{ opacity: name ? 1 : 0.7 }}
          >
            {name || "আপনার নাম"}
          </div>
        </div>

        {/* Bottom star divider */}
        <div className="flex items-center gap-2 my-2 text-yellow-500">
          <span className="text-xs">✦</span>
          <div className="w-10 h-px bg-yellow-500/40" />
          <span className="text-xs">✦</span>
          <div className="w-10 h-px bg-yellow-500/40" />
          <span className="text-xs">✦</span>
        </div>
        <button
          className="flex items-center gap-2 border border-yellow-500/70 rounded-full px-6 py-3 text-yellow-300 text-sm sm:text-base bg-black/30 backdrop-blur-sm hover:bg-yellow-500/20 hover:border-yellow-400 transition-all duration-300"
          style={{ animation: "riseIn 700ms ease both", animationDelay: "460ms" }}
        >
          <span>🎁</span>
          <span>সালামি দেওয়ার মাধ্যম নির্বাচন করুন</span>
          <span>✨</span>
        </button>

        {/* Payment Methods */}
        <div className="w-full mt-4" style={{ animation: "riseIn 700ms ease both", animationDelay: "460ms", maxWidth: "100%", overflow: "hidden" }}>
          <Payment isShared={isShared} />
        </div>

      </div>
    </div>
  );
};