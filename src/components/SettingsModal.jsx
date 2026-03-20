import React from "react";
import ReactDOM from "react-dom";
import { getGlobalSettings, saveGlobalSettings } from "../lib/eidData";

const PAYMENT_METHODS = [
  { id: "bkash", label: "bKash", color: "#e11d73" },
  { id: "nagad", label: "Nagad", color: "#f97316" },
  { id: "rocket", label: "Rocket", color: "#8b008b" },
  { id: "upay", label: "Upay", color: "#1a6e35" },
];

export const SettingsModal = ({ onClose }) => {
  const [name, setName] = React.useState("");
  const [numbers, setNumbers] = React.useState(() => {
    const obj = {};
    PAYMENT_METHODS.forEach((m) => {
      obj[m.id] = "";
    });
    return obj;
  });

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const current = await getGlobalSettings();
      if (cancelled) return;
      setName(current.name || "");
      setNumbers({
        upay: current.upay || "",
        bkash: current.bkash || "",
        nagad: current.nagad || "",
        rocket: current.rocket || "",
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = () => {
    const next = {
      name: name.trim(),
      upay: (numbers.upay || "").trim(),
      bkash: (numbers.bkash || "").trim(),
      nagad: (numbers.nagad || "").trim(),
      rocket: (numbers.rocket || "").trim(),
    };

    (async () => {
      await saveGlobalSettings(next);
      onClose();
    })();
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center px-4 py-6"
      style={{ background: "rgba(0,0,0,0.70)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <style>{`
        .settings-scroll::-webkit-scrollbar { display: none; }
        .settings-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .settings-input:focus { box-shadow: 0 0 0 2px rgba(250,204,21,0.3); }
      `}</style>

      <div
        className="relative w-full rounded-3xl overflow-hidden flex flex-col"
        style={{
          maxWidth: "420px",
          maxHeight: "90vh",
          background: "linear-gradient(160deg, rgba(30,25,10,0.97) 0%, rgba(15,12,5,0.98) 100%)",
          border: "1.5px solid rgba(250,204,21,0.25)",
          boxShadow: "0 0 60px rgba(250,204,21,0.08), 0 30px 80px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold top accent line */}
        <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #facc15, transparent)" }} />

        {/* Header */}
        <div
          className="flex items-center justify-between px-6 pt-5 pb-4 shrink-0"
          style={{ borderBottom: "1px solid rgba(250,204,21,0.12)" }}
        >
          <div>
            <p className="text-yellow-400 font-bold text-lg tracking-wide">✨ সেটিংস</p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", marginTop: "2px" }}>
              আপনার পেমেন্ট নম্বরগুলো এখানে দিন
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-white/50 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all duration-200"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            ✕
          </button>
        </div>

        {/* Body — scrollable, no scrollbar */}
        <div className="settings-scroll px-6 py-5 flex flex-col gap-4 overflow-y-auto flex-1">

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              👤 আপনার নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="settings-input"
              style={{
                background: "rgba(250,204,21,0.06)",
                border: "1.5px solid rgba(250,204,21,0.4)",
                borderRadius: "12px",
                padding: "11px 14px",
                color: "#facc15",
                fontSize: "15px",
                outline: "none",
                width: "100%",
                transition: "box-shadow 200ms ease",
              }}
            />
          </div>

          {/* Payment numbers */}
          {PAYMENT_METHODS.map((method) => (
            <div
              key={method.id}
              className="flex flex-col gap-2.5 rounded-2xl p-4"
              style={{
                background: `color-mix(in srgb, ${method.color} 6%, rgba(255,255,255,0.03))`,
                border: `1px solid ${method.color}35`,
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                  style={{ background: method.color, color: "#fff", letterSpacing: "0.03em" }}
                >
                  {method.label}
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>📱 নম্বর</span>
              </div>

              <input
                type="tel"
                value={numbers[method.id]}
                onChange={(e) => setNumbers((prev) => ({ ...prev, [method.id]: e.target.value }))}
                placeholder="01XXXXXXXXX"
                className="settings-input"
                style={{
                  background: "rgba(0,0,0,0.35)",
                  border: `1px solid ${method.color}50`,
                  borderRadius: "10px",
                  padding: "9px 13px",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                  width: "100%",
                  transition: "box-shadow 200ms ease",
                }}
              />

              <button
                className="flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
                style={{ color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer" }}
              >
                ▦ QR কোড আপলোড
              </button>
            </div>
          ))}
        </div>

        {/* Save button */}
        <div className="px-6 pb-6 pt-3 shrink-0" style={{ borderTop: "1px solid rgba(250,204,21,0.10)" }}>
          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-2xl font-bold text-black text-base transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)",
              boxShadow: "0 4px 20px rgba(250,204,21,0.25)",
            }}
          >
            সেভ করুন ✓
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};