import React from "react";
import ReactDOM from "react-dom";
import { QRCodeSVG } from "qrcode.react";
import { SuccessModal } from "./SuccessModal";

const INSTRUCTIONS = {
  upay: [
    "আপনার Upay অ্যাপ ওপেন করুন",
    '"Send Money" অপশনে ট্যাপ করুন',
    "নিচের নম্বরটি দিন অথবা QR স্ক্যান করুন",
    "সালামির পরিমাণ ও রেফারেন্স দিন",
    "PIN দিয়ে কনফার্ম করুন",
  ],
  bkash: [
    "আপনার bKash অ্যাপ ওপেন করুন",
    '"Send Money" অপশনে ট্যাপ করুন',
    "নিচের নম্বরটি দিন অথবা QR স্ক্যান করুন",
    "সালামির পরিমাণ ও রেফারেন্স দিন",
    "PIN দিয়ে কনফার্ম করুন",
  ],
  nagad: [
    "আপনার Nagad অ্যাপ ওপেন করুন",
    '"Send Money" অপশনে ট্যাপ করুন',
    "নিচের নম্বরটি দিন অথবা QR স্ক্যান করুন",
    "সালামির পরিমাণ ও রেফারেন্স দিন",
    "PIN দিয়ে কনফার্ম করুন",
  ],
  rocket: [
    "আপনার Rocket অ্যাপ ওপেন করুন",
    '"Send Money" অপশনে ট্যাপ করুন',
    "নিচের নম্বরটি দিন অথবা QR স্ক্যান করুন",
    "সালামির পরিমাণ ও রেফারেন্স দিন",
    "PIN দিয়ে কনফার্ম করুন",
  ],
};

export const PaymentModal = ({ method, isShared, onClose }) => {
  const [number, setNumber] = React.useState("");
  const [editing, setEditing] = React.useState(false);
  const [tempNumber, setTempNumber] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  // Load number from localStorage on open
  React.useEffect(() => {
    
    const saved = localStorage.getItem(`eid-number-${method.id}`);
    if (saved) setNumber(saved);
  }, [method.id]);

  const handleSave = () => {
    const trimmed = tempNumber.trim();
    if (trimmed) {
      setNumber(trimmed);
      localStorage.setItem(`eid-number-${method.id}`, trimmed);
    }
    setEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden"
        style={{ background: "#1a1a1a" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex flex-col items-center pt-8 pb-6 px-4 gap-2"
          style={{
            background: `linear-gradient(160deg, ${method.color.bg}, #1a1a1a)`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 glow-text:hover text-white/60 hover:text-white text-xl transition-all"
          >
            ✕
          </button>
          <div className="w-16 h-16 rounded-2xl  glow-text:hover overflow-hidden bg-white flex items-center justify-center">
            <img
              src={method.logo}
              alt={method.name}
              className="w-full h-full object-contain p-1.5"
            />
          </div>
          <p className= " glow-text:hover text-white text-2xl font-bold">{method.name}</p>
          <p className="glow-text:hover text-white/70 text-sm">দিয়ে সালামি পাঠান</p>
        </div>

        {/* Instructions */}
        <div className="px-5 py-4 flex flex-col gap-2">
          {INSTRUCTIONS[method.id].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className="min-w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: method.color.bg }}
              >
                {i + 1}
              </span>
              <p className="text-white/80 text-sm leading-relaxed">{step}</p>
            </div>
          ))}
        </div>

        {/* Number section */}
        <div className="px-5 pb-4 flex gap-3">
          <div
            className="flex-1 flex flex-col gap-2 rounded-2xl p-3"
            style={{ background: "#2a2a2a" }}
          >
            <p className="text-white/50 text-xs text-center">
              {number ? "ট্যাপ করে নম্বর কপি করুন" : "নম্বর যোগ করুন"}
            </p>

            {/* Edit mode — only if not shared */}
            {!isShared && editing ? (
              <div className="flex flex-col gap-2">
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
                  className="w-full py-1.5 rounded-xl text-xs font-semibold text-black transition-all"
                  style={{ background: method.color.bg }}
                >
                  Save ✓
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (number) {
                    handleCopy();
                  } else if (!isShared) {
                    setTempNumber("");
                    setEditing(true);
                  }
                }}
                className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-bold text-base transition-all"
                style={{
                  background: "#111",
                  border: `1.5px solid ${method.color.bg}`,
                  color: method.color.bg,
                }}
              >
                {number ? (
                  <>
                    {number}
                    <span className="text-xs">{copied ? "✓" : "⧉"}</span>
                  </>
                ) : (
                  <span className="text-white/40 text-sm font-normal">
                    {isShared ? "নম্বর নেই" : "+ নম্বর যোগ করুন"}
                  </span>
                )}
              </button>
            )}

            {/* Edit link — only if number exists and not shared */}
            {!isShared && number && !editing && (
              <button
                onClick={() => { setTempNumber(number); setEditing(true); }}
                className="text-white/30 text-xs text-center hover:text-white/60 transition-all"
              >
                ✎ নম্বর পরিবর্তন করুন
              </button>
            )}
          </div>

          {/* QR — only show if number exists */}
          {number && (
            <div
              className="flex flex-col items-center justify-center gap-1 rounded-2xl p-3"
              style={{ background: "#2a2a2a" }}
            >
              <p className="text-white/50 text-xs">QR স্ক্যান</p>
              <div className="bg-white rounded-xl p-1.5">
                <QRCodeSVG value={number} size={80} />
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
       <div className="px-5 pb-6">
  <button
    onClick={() => setShowSuccess(true)}
    className="w-full py-3 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
    style={{ background: method.color.bg }}
  >
    <span>♥</span> সালামি পাঠিয়েছি
  </button>
</div>

{/* Success modal */}
{showSuccess && (
  <SuccessModal
    senderName=""
    onClose={() => { setShowSuccess(false); onClose(); }}
  />
)}
      </div>
    </div>,
    document.body
  );
};