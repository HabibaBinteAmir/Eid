import React, { useState, useEffect } from "react";
import banner from '../assets/banner.jpg';
import { SettingsModal } from "../components/SettingsModal";

export const Home = () => {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const handleEdit = () => {
    setTempName(name);
    setEditing(true);
  };

  const handleSave = () => {
    const trimmed = tempName.trim();
    if (trimmed) {
      setName(trimmed);
      localStorage.setItem("eid-name", trimmed);
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") setEditing(false);
  };


  const handleShare = () => {
    const data = {
      name: localStorage.getItem("eid-name") || "",
      upay: localStorage.getItem("eid-number-upay") || "",
      bkash: localStorage.getItem("eid-number-bkash") || "",
      nagad: localStorage.getItem("eid-number-nagad") || "",
      rocket: localStorage.getItem("eid-number-rocket") || "",
    };
    const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
    const url = `${window.location.origin}?data=${encoded}`;
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  // Detect shared link (from query ?data=...)
  const getSharedData = () => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("data");
    if (!encoded) return null;
    try {
      return JSON.parse(decodeURIComponent(atob(encoded)));
    } catch {
      return null;
    }
  };

  const sharedData = getSharedData();
  const isShared = !!sharedData;

  useEffect(() => {
    if (sharedData) {
      setName(sharedData.name || "");
    } else {
      const saved = localStorage.getItem("eid-name");
      if (saved) setName(saved);
    }
  }, [sharedData]);

  return (
    <div className="relative w-full">

      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${banner})` }}
      />

      {/* Dark Overlay */}
      <div className="fixed inset-0 bg-black/20" />
      {/* Floating action buttons */}
<div
  className="fixed top-4 right-4 z-20 flex gap-2"
>
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

{/* Hide edit hint if shared */}
{!isShared && (
  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>
    click your name to edit it
  </p>
)}

{/* Settings Modal */}
{showSettings && (
  <SettingsModal onClose={() => setShowSettings(false)} />
)}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-10 px-4 text-center">

        {/* Stars */}
        <div className="flex items-center gap-3 mb-1">
          <span className="text-yellow-400">✦</span>
          <span className="text-yellow-300 text-sm">❋</span>
          <span className="text-yellow-300 text-sm">❋</span>
          <span className="text-yellow-400">✦</span>
        </div>

        {/* Arabic */}
        <p className="text-yellow-400 text-base md:text-lg mb-1 tracking-wide font-serif">
          عيد مبارك
        </p>

        {/* Main Heading */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold animate-spin leading-tight tracking-wide drop-shadow-[0_2px_16px_rgba(245,200,66,0.5)]"
          style={{
            background: "linear-gradient(90deg, #ffffff, #facc15, #ffffff)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 2s linear infinite",
          }}
        >
          ঈদ মোবারক
        </h1>

        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
        `}</style>

        {/* Star divider */}
        <div className="flex items-center gap-2 my-2 text-yellow-500">
          <span className="text-xs">✦</span>
          <div className="w-16 md:w-24 h-px bg-yellow-500/50" />
          <span className="text-xs">✦</span>
          <div className="w-16 md:w-24 h-px bg-yellow-500/50" />
          <span className="text-xs">✦</span>
        </div>

        {/* Subtitle */}
        <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-sm md:max-w-md leading-relaxed">
          সবাইকে ঈদের শুভেচ্ছা। আসসালামু আলাইকুম। <br />আল্লাহ আপনার সব দোয়া কবুল করুন।
        </p>

        {/* Sender box */}
        <div className="mt-3 flex flex-col items-center gap-1">
          {editing ? (
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                autoFocus
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border border-yellow-400 rounded-xl px-4 py-2 bg-black/40 text-yellow-300 text-lg sm:text-xl text-center outline-none focus:ring-2 focus:ring-yellow-400 w-64"
                placeholder="Enter your name"
              />
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl text-sm transition-all"
              >
                Save ✓
              </button>
            </div>
          ) : (
            <div
              onClick={handleEdit}
              title="Click to edit your name"
              className="border border-yellow-500/60 rounded-xl px-6 py-2 bg-black/20 backdrop-blur-sm text-yellow-400 text-xl sm:text-2xl md:text-3xl font-semibold tracking-widest cursor-pointer hover:border-yellow-400 hover:bg-black/30 transition-all duration-300 group relative"
            >
              {name}
              <span className="absolute -top-2 -right-2 text-xs bg-yellow-500 text-black rounded-full px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                ✎ edit
              </span>
            </div>
          )}
          <p className="text-white/40 text-xs"></p>
        </div>

        {/* Bottom star divider */}
        <div className="flex items-center gap-2 my-2 text-yellow-500">
          <span className="text-xs">✦</span>
          <div className="w-10 h-px bg-yellow-500/40" />
          <span className="text-xs">✦</span>
          <div className="w-10 h-px bg-yellow-500/40" />
          <span className="text-xs">✦</span>
        </div>

        {/* CTA Button */}
        <button className="flex items-center gap-2 border border-yellow-500/70 rounded-full px-6 py-3 text-yellow-300 text-sm sm:text-base bg-black/30 backdrop-blur-sm hover:bg-yellow-500/20 hover:border-yellow-400 transition-all duration-300">
          <span>🎁</span>
          <span>সালামি দেওয়ার মাধ্যম নির্বাচন করুন</span>
          <span>✨</span>
        </button>

      </div>
    </div>
  );
};