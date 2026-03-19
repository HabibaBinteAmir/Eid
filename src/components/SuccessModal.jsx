import React from "react";
import ReactDOM from "react-dom";

const CONFETTI_COLORS = ["#facc15", "#c084fc", "#f97316", "#60a5fa", "#f472b6", "#fde68a", "#a78bfa"];

const CONFETTI_PIECES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  width: Math.floor(Math.random() * 12) + 6,
  height: Math.floor(Math.random() * 12) + 6,
  color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  left: Math.floor(Math.random() * 100),
  top: Math.floor(Math.random() * 100),
  opacity: (Math.random() * 0.9 + 0.1).toFixed(2),
  rotate: Math.floor(Math.random() * 360),
  borderRadius: Math.random() > 0.5 ? "50%" : "3px",
  duration: (Math.random() * 3 + 2).toFixed(1),
  delay: (Math.random() * 2).toFixed(1),
}));

const Confetti = () => (
  <>
    {CONFETTI_PIECES.map((p) => (
      <div
        key={p.id}
        className="absolute"
        style={{
          width: p.width,
          height: p.height,
          background: p.color,
          left: `${p.left}%`,
          top: `${p.top}%`,
          opacity: p.opacity,
          transform: `rotate(${p.rotate}deg)`,
          borderRadius: p.borderRadius,
          animation: `float ${p.duration}s ease-in-out infinite alternate`,
          animationDelay: `${p.delay}s`,
        }}
      />
    ))}
  </>
);

const LINES = [
  "আপনার এই ভালোবাসা ও মেহ আমাকে অনেক অনুপ্রাণিত করেছে।",
  "আল্লাহ আপনাকে উত্তম প্রতিদান দিন।",
];

export const SuccessModal = ({ onClose }) => {
  const senderName = localStorage.getItem("eid-name") || "";
  const [visibleLines, setVisibleLines] = React.useState([]);

  React.useEffect(() => {
    LINES.forEach((_, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, i * 600 + 300);
    });
  }, []);

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-15px) rotate(180deg); }
          }
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
          }
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Top section — matches banner twilight */}
        <div
          className="relative flex flex-col items-center pt-10 pb-8 px-4 gap-3 overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #1e1b4b, #312e81, #7c3aed, #c026d3)",
          }}
        >
          <Confetti />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all text-lg"
            style={{ color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.15)" }}
          >
            ✕
          </button>

          {/* Stars + Moon */}
          <div className="relative z-10 flex flex-col items-center gap-1">
            <div className="flex gap-2 text-lg mb-1" style={{ color: "#fde68a" }}>
              <span>✦</span><span>✦</span><span>✦</span>
            </div>
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "3px solid rgba(255,255,255,0.25)",
              }}
            >
              🌙
            </div>
          </div>

          {/* Title */}
          <h2
            className="relative z-10 text-2xl font-extrabold text-center mt-1"
            style={{
              background: "linear-gradient(90deg, #fef9c3, #facc15, #fef9c3)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 2s linear infinite",
            }}
          >
            জাযাকাল্লাহু খাইরান!
          </h2>

          <p className="relative z-10 text-sm text-center" style={{ color: "rgba(255,255,255,0.85)" }}>
            আপনার সালামি পেয়ে অনেক খুশি হলাম 🎉
          </p>
        </div>

        {/* Body — dark matching website */}
        <div
          className="flex flex-col gap-4 px-5 py-5"
          style={{ background: "linear-gradient(180deg, #1e1040, #150d30)" }}
        >
          {/* Animated lines */}
          <div
            className="rounded-2xl px-4 py-4 text-center text-sm leading-relaxed flex flex-col gap-2"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1.5px solid rgba(167,139,250,0.3)",
            }}
          >
            {LINES.map((line, i) => (
              <p
                key={i}
                style={{
                  color: i === 1 ? "#facc15" : "rgba(255,255,255,0.85)",
                  fontWeight: i === 1 ? "bold" : "normal",
                  opacity: visibleLines.includes(i) ? 1 : 0,
                  transform: visibleLines.includes(i) ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* Eid Mubarak */}
          <div
            className="w-full py-3 rounded-2xl font-extrabold text-xl text-center"
            style={{
              background: "linear-gradient(135deg, #facc15, #f59e0b)",
              color: "#78350f",
            }}
          >
            ঈদ মোবারক! 🌙
          </div>

          {/* Sender name */}
          <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            - {senderName}
          </p>

          {/* Hearts */}
          <div className="flex justify-center gap-3 pb-2">
            {["#e11d73", "#f97316", "#e11d73"].map((color, i) => (
              <span
                key={i}
                style={{
                  color,
                  fontSize: i === 1 ? "28px" : "22px",
                  animation: "heartbeat 1s ease-in-out infinite",
                  animationDelay: `${i * 200}ms`,
                  display: "inline-block",
                }}
              >
                ♥
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};