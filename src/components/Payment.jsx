import React, { useState, useEffect } from "react";
import upay from "../assets/upay.png";
import bkash from "../assets/bkash.png";
import nagod from "../assets/nagod.png";
import rocket from "../assets/rocket.png";
import Slider from "react-slick";

const PAYMENT_METHODS = [
  {
    id: "upay",
    name: "উপায়",
    label: "Upay Salami",
    color: { bg: "#1a6e35", text: "#fff" },
    logo: upay,
  },
  {
    id: "bkash",
    name: "বিকাশ",
    label: "bKash Salami",
    color: { bg: "#e11d73", text: "#fff" },
    logo: bkash,
  },
  {
    id: "nagad",
    name: "নগদ",
    label: "Nagad Salami",
    color: { bg: "#f97316", text: "#fff" },
    logo: nagod,
  },
  {
    id: "rocket",
    name: "রকেট",
    label: "Rocket Salami",
    color: { bg: "#8b008b", text: "#fff" },
    logo: rocket,
  },
];

// ✅ Arrows defined at top level — outside everything
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-15 h-15 flex items-center justify-center rounded-full bg-yellow-400/10 border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-400 transition-all opacity-0 group-hover:opacity-100"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute  right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-15 h-15 flex items-center justify-center rounded-full bg-yellow-400/10 border border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/20 hover:border-yellow-400 transition-all opacity-0 group-hover:opacity-100"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </button>
);

const PaymentCard = ({ method }) => {
  const [number, setNumber] = useState("");
  const [editing, setEditing] = useState(false);
  const [tempNumber, setTempNumber] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(`eid-number-${method.id}`);
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: `color-mix(in srgb, ${method.color.bg} 20%, transparent)`,
        border: `2px solid ${method.color.bg}80`,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Top section */}
      <div className="flex flex-col items-center pt-6 pb-4 px-4 gap-3">

        {/* Logo */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden"
          style={{ background: "#fff", border: "2px solid #ffffff22" }}
        >
          <img
            src={method.logo}
            alt={method.name}
            className="w-full h-full object-contain p-2"
          />
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
          <span className="text-white/60 text-xs border flex items-center border-white/20 rounded-full px-2 py-0.5">
            ▦ QR কোড
          </span>
          <span className="text-white/60 text-xs border flex items-center border-white/20 rounded-full px-2 py-0.5">
            <span className="text-red-700 animate-pulse text-2xl">♥</span> ভালোবাসা
          </span>
        </div>
      </div>

      {/* Number / Edit */}
      <div className="px-4 pb-4 flex flex-col items-center gap-2">
        {editing ? (
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
        ) : (
          <div
            onClick={() => { setTempNumber(number); setEditing(true); }}
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

 return (
  <div className="group relative z-10 w-full pt-6 pb-10 px-8 max-w-5xl mx-auto">
    <Slider {...settings}>
      {PAYMENT_METHODS.map((method) => (
        <div key={method.id} className="px-2">
          <PaymentCard method={method} />
        </div>
      ))}
    </Slider>
  </div>
);
};