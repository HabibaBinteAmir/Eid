import React, { useState, useEffect } from "react";

const EDIT_PASSWORD = "your-password-here";

const PAYMENT_METHODS = [
  {
    id: "upay",
    name: "উপায়",
    label: "Upay Salami",
    color: { bg: "#16a34a", text: "#fff" },
    logoFallback: "উ",
  },
  {
    id: "bkash",
    name: "বিকাশ",
    label: "bKash Salami",
    color: { bg: "#e11d73", text: "#fff" },
    logoFallback: "বি",
  },
  {
    id: "nagad",
    name: "নগদ",
    label: "Nagad Salami",
    color: { bg: "#f97316", text: "#fff" },
    logoFallback: "ন",
  },
];

const PaymentCard = ({ method }) => {
  const [number, setNumber] = useState("");
  const [editing, setEditing] = useState(false);
  const [tempNumber, setTempNumber] = useState("");
  const [askPassword, setAskPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`eid-number-${method.id}`);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved) setNumber(saved);
  }, [method.id]);

  const handleNumberClick = () => {
    setAskPassword(true);
    setPasswordInput("");
    setWrongPassword(false);
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === EDIT_PASSWORD) {
      setAskPassword(false);
      setTempNumber(number);
      setEditing(true);
    } else {
      setWrongPassword(true);
    }
  };

  const handleSave = () => {
    const trimmed = tempNumber.trim();
    if (trimmed) {
      setNumber(trimmed);
      localStorage.setItem(`eid-number-${method.id}`, trimmed);
    }
    setEditing(false);
  };

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "rgba(0,0,0,0.45)",
        border: `1.5px solid ${method.color.bg}55`,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center pt-6 pb-4 px-4 gap-3">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{ background: "#fff", border: "2px solid #ffffff22" }}
        >
          <span className="text-3xl font-bold" style={{ color: method.color.bg }}>
            {method.logoFallback}
          </span>
        </div>

        {/* Badge */}
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: method.color.bg, color: method.color.text }}
        >
          {method.label}
        </span>

        {/* Name */}
        <p className="text-white text-2xl font-bold">{method.name}</p>

        {/* Tags */}
        <div className="flex gap-2">
          <span className="text-white/60 text-xs border border-white/20 rounded-full px-2 py-0.5">
            ▦ QR কোড
          </span>
          <span className="text-white/60 text-xs border border-white/20 rounded-full px-2 py-0.5">
            ♥ ভালোবাসা
          </span>
        </div>
      </div>

      {/* Number / Edit / Password */}
      <div className="px-4 pb-4 flex flex-col items-center gap-2">
        {askPassword && (
          <div className="flex flex-col items-center gap-2 w-full">
            <input
              autoFocus
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlePasswordSubmit();
                if (e.key === "Escape") setAskPassword(false);
              }}
              placeholder="Password"
              className="w-full text-center rounded-xl px-3 py-2 text-sm outline-none bg-black/40 text-white border border-white/30 focus:border-yellow-400"
            />
            {wrongPassword && <p className="text-red-400 text-xs">❌ Wrong password</p>}
            <div className="flex gap-2">
              <button
                onClick={handlePasswordSubmit}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-black transition-all"
                style={{ background: method.color.bg }}
              >
                Unlock ✓
              </button>
              <button
                onClick={() => setAskPassword(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-white/70 bg-white/10 hover:bg-white/20 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {editing && (
          <div className="flex flex-col items-center gap-2 w-full">
            <input
              autoFocus
              type="tel"
              value={tempNumber}
              onChange={(e) => setTempNumber(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") setEditing(false);
              }}
              placeholder="01XXXXXXXXX"
              className="w-full text-center rounded-xl px-3 py-2 text-sm outline-none bg-black/40 text-white border border-yellow-400 focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-black"
              style={{ background: method.color.bg }}
            >
              Save ✓
            </button>
          </div>
        )}

        {!editing && !askPassword && (
          <div
            onClick={handleNumberClick}
            className="w-full text-center text-white/50 text-sm border border-dashed border-white/20 rounded-xl py-2 cursor-pointer hover:border-yellow-400 hover:text-white/80 transition-all"
          >
            {number || "Click to add number"}
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        className="mx-4 mb-4 py-3 rounded-xl font-bold text-white text-base tracking-wide hover:opacity-90 active:scale-95 transition-all"
        style={{ background: method.color.bg }}
      >
        সালামি দিন →
      </button>
    </div>
  );
};

export const Payment = () => {
  return (
  <div className="w-full pt-10 pb-30 px-4">

      {/* Header */}
   

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {PAYMENT_METHODS.map((method) => (
          <PaymentCard key={method.id} method={method} />
        ))}
      </div>

    </div>
  );
};