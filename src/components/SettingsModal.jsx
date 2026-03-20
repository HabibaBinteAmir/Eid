import React from "react";
import ReactDOM from "react-dom";

const PAYMENT_METHODS = [
  { id: "bkash", label: "bKash", color: "#e11d73" },
  { id: "nagad", label: "Nagad", color: "#f97316" },
  { id: "rocket", label: "Rocket", color: "#8b008b" },
  { id: "upay", label: "Upay", color: "#1a6e35" },
];

export const SettingsModal = ({ onClose }) => {
  const [name, setName] = React.useState(localStorage.getItem("eid-name") || "");
  const [numbers, setNumbers] = React.useState(() => {
    const obj = {};
    PAYMENT_METHODS.forEach((m) => {
      obj[m.id] = localStorage.getItem(`eid-number-${m.id}`) || "";
    });
    return obj;
  });

  const handleSave = () => {
    localStorage.setItem("eid-name", name.trim());
    PAYMENT_METHODS.forEach((m) => {
      localStorage.setItem(`eid-number-${m.id}`, numbers[m.id].trim());
    });
    onClose();
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center px-4 pt-16"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden"
        style={{ background: "#1a1a1a", colorScheme: "light" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 pt-5 pb-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div>
            <p className="text-white font-bold text-lg">✨ সেটিংস</p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>
              আপনার পেমেন্ট নম্বরগুলো এখানে দিন
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white transition-all"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 flex flex-col gap-4" style={{ maxHeight: "70vh", overflowY: "auto" }}>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
              👤 আপনার নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1.5px solid #facc15",
                borderRadius: "10px",
                padding: "10px 14px",
                color: "#facc15",
                fontSize: "15px",
                outline: "none",
                width: "100%",
              }}
            />
          </div>

          {/* Payment numbers */}
          {PAYMENT_METHODS.map((method) => (
            <div
              key={method.id}
              className="flex flex-col gap-2 rounded-2xl p-4"
              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${method.color}40` }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: method.color, color: "#fff" }}
                >
                  {method.label}
                </span>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>📱 নম্বর</span>
              </div>

              <input
                type="tel"
                value={numbers[method.id]}
                onChange={(e) => setNumbers((prev) => ({ ...prev, [method.id]: e.target.value }))}
                placeholder="01XXXXXXXXX"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: `1px solid ${method.color}60`,
                  borderRadius: "8px",
                  padding: "8px 12px",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                  width: "100%",
                }}
              />

              <button
                className="flex items-center gap-1 text-xs"
                style={{ color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer" }}
              >
                ▦ QR কোড আপলোড
              </button>
            </div>
          ))}
        </div>

        {/* Save button */}
        <div className="px-5 pb-5 pt-2">
          <button
            onClick={handleSave}
            className="w-full py-3 rounded-2xl font-bold text-black text-base transition-all hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #facc15, #f59e0b)" }}
          >
            সেভ করুন ✓
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};