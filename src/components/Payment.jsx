import React, { useState } from "react";
import upay from "../assets/upay.png";
import bkash from "../assets/bkash.png";
import nagod from "../assets/nagod.png";
import rocket from "../assets/rocket.png";
import Slider from "react-slick";
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

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full bg-black/50 border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-400 transition-all opacity-0 group-hover:opacity-100"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center rounded-full bg-black/50 border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-400 transition-all opacity-0 group-hover:opacity-100"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </button>
);

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
        style={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          overflow: "hidden",
          background: `color-mix(in srgb, ${method.color.bg} 20%, transparent)`,
          border: `2px solid ${method.color.bg}80`,
          backdropFilter: "blur(8px)",
          width: "100%",
          maxWidth: "300px",
          margin: "0 auto",
        }}
      >
        <div className="flex flex-col items-center pt-6 pb-4 px-4 gap-3">

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

          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: method.color.bg, color: method.color.text }}
          >
            {method.label}
          </span>

          <p className="text-white text-2xl font-bold">{method.name}</p>

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
          className="mx-4 mb-4 py-3 rounded-xl font-bold text-white text-base tracking-wide hover:opacity-90 active:scale-95 transition-all"
          style={{ background: method.color.bg }}
        >
          সালামি দিন →
        </button>
      </div>
    </>
  );
};

// ✅ exported component wrapping the return
export const Payment = ({ isShared }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div
      className="group relative z-10 w-full mx-auto"
      style={{ maxWidth: "1024px", padding: "24px 16px 40px" }}
    >
      <Slider {...settings}>
        {PAYMENT_METHODS.map((method) => (
          <div key={method.id} style={{ padding: "0 6px" }}>
            <PaymentCard method={method} isShared={isShared} />
          </div>
        ))}
      </Slider>
    </div>
  );
};