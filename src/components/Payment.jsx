import React, { useState, useRef, useEffect } from "react";
import upay from "../assets/upay.png";
import bkash from "../assets/bkash.png";
import nagod from "../assets/nagod.png";
import rocket from "../assets/rocket.png";
import { PaymentModal } from "./PaymentModal";

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

const PaymentCard = ({ method, isShared }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <PaymentModal
          method={method}
          isShared={isShared}
          onClose={() => setShowModal(false)}
        />
      )}

      <div
        className="flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: `color-mix(in srgb, ${method.color.bg} 20%, transparent)`,
          border: `2px solid ${method.color.bg}80`,
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex flex-col items-center pt-6 pb-4 px-4 gap-3">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center overflow-hidden"
            style={{ background: "#fff", border: "2px solid #ffffff22" }}
          >
            <img
              src={method.logo}
              alt={method.name}
              className="w-full h-full object-contain p-2"
            />
          </div>

          <span
            className="text-sm sm:text-md font-semibold px-4 sm:px-6 py-2 rounded-full"
            style={{ background: method.color.bg, color: method.color.text }}
          >
            {method.label}
          </span>

          <p className="text-white text-xl sm:text-2xl font-bold">
            {method.name}
          </p>

          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="text-white text-xs border flex items-center gap-1 rounded-full px-2 py-1 transition-all hover:opacity-80"
              style={{
                background: `${method.color.bg}40`,
                borderColor: `${method.color.bg}80`,
              }}
            >
              ▦ QR কোড
            </button>

            <span
              className="text-white text-xs border flex items-center gap-1 rounded-full px-2 py-1"
              style={{
                background: `${method.color.bg}40`,
                borderColor: `${method.color.bg}80`,
              }}
            >
              <span className="text-red-400 animate-pulse text-sm">♥</span>
              ভালোবাসা
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mx-4 mb-4 py-3 rounded-xl font-bold text-white text-sm sm:text-base tracking-wide hover:opacity-90 active:scale-95 transition-all"
          style={{ background: method.color.bg }}
        >
          সালামি দিন →
        </button>
      </div>
    </>
  );
};

export const Payment = ({ isShared }) => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // 🔥 Auto smooth scroll
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      const container = scrollRef.current;
      const firstChild = container.firstElementChild;
      if (!firstChild) return;

      const gap = 16;
      const scrollAmount = firstChild.offsetWidth + gap;

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="group relative z-10 w-full max-w-5xl mx-auto pt-6 pb-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4
                   [-ms-overflow-style:none] [scrollbar-width:none]
                   [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {PAYMENT_METHODS.map((method) => (
          <div
            key={method.id}
            className="snap-center shrink-0 w-[85vw] sm:w-[45%] lg:w-[30%]"
          >
            <PaymentCard method={method} isShared={isShared} />
          </div>
        ))}
      </div>
    </div>
  );
};