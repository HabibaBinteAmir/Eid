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

const PaymentCard = ({ method, isShared, variant = "desktop", index = 0 }) => {
  const [showModal, setShowModal] = useState(false);
  const isDesktop = variant === "desktop";

  const logoClass = isDesktop
    ? "w-20 h-20 md:w-26 md:h-26 rounded-2xl flex items-center justify-center overflow-hidden"
    : "w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center overflow-hidden";

  const cardMaxWidth = isDesktop ? "260px" : "280px";
  const ctaMx = isDesktop ? "mx-5" : "mx-6";
  const ctaMb = isDesktop ? "mb-5" : "mb-6";

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
        className="payment-card"
        style={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px",
          overflow: "hidden",
          background: `color-mix(in srgb, ${method.color.bg} 20%, transparent)`,
          border: `2px solid ${method.color.bg}80`,
          backdropFilter: "blur(8px)",
          width: "100%",
          maxWidth: cardMaxWidth,
          margin: "0 auto",
          animation: "cardIn 650ms ease both",
          animationDelay: `${index * 120}ms`,
        }}
      >
        <div className="flex flex-col items-center pt-6 pb-4 px-4 dark:bg-transparent gap-4">
          <div
            className={logoClass}
            style={{
              background: "#fff",
              border: "2px solid #ffffff22",
              animation: "riseInSmall 650ms ease both",
              animationDelay: `${index * 120 + 80}ms`,
            }}
          >
            <img
              src={method.logo}
              alt={method.name}
              className="w-full h-full object-contain p-2"
            />
          </div>

          <span
            className="text-xl font-semibold px-3 py-2 rounded-full"
            style={{
              background: method.color.bg,
              color: method.color.text,
              animation: "riseInSmall 650ms ease both",
              animationDelay: `${index * 120 + 120}ms`,
            }}
          >
            {method.label}
          </span>

          <p
            className="text-white text-2xl font-bold"
            style={{
              animation: "riseInSmall 650ms ease both",
              animationDelay: `${index * 120 + 160}ms`,
            }}
          >
            {method.name}
          </p>

          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => setShowModal(true)}
              className="text-white text-xl border flex items-center gap-1 rounded-full px-2 py-1 transition-all hover:opacity-80"
              style={{
                background: `${method.color.bg}40`,
                borderColor: `${method.color.bg}80`,
              animation: "riseInSmall 650ms ease both",
              animationDelay: `${index * 120 + 200}ms`,
              }}
            >
              ▦ QR কোড
            </button>

            <span
              className="text-white text-xl border flex items-center gap-1 rounded-full px-2 py-1"
              style={{
                background: `${method.color.bg}40`,
                borderColor: `${method.color.bg}80`,
                animation: "riseInSmall 650ms ease both",
                animationDelay: `${index * 120 + 220}ms`,
              }}
            >
              <span className="text-red-400 animate-pulse text-sm">♥</span>
              ভালোবাসা
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className={`${ctaMx} ${ctaMb} py-4 rounded-xl font-bold text-white text-base tracking-wide hover:opacity-90 active:scale-95 transition-all`}
          style={{
            background: method.color.bg,
            animation: "riseInSmall 650ms ease both",
            animationDelay: `${index * 120 + 260}ms`,
          }}
        >
          সালামি দিন →
        </button>
      </div>
    </>
  );
};

export const Payment = ({ isShared }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 640);

  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

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
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  if (isMobile) {
    return (
      <div className="relative z-10 w-full" style={{ padding: "16px 0 32px" }}>
        <style>{`
          @keyframes cardIn {
            0% { opacity: 0; transform: translateY(14px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes riseInSmall {
            0% { opacity: 0; transform: translateY(10px) scale(0.99); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .payment-card {
            box-shadow: 0 0 0 rgba(250,204,21,0);
            transition: transform 200ms ease, box-shadow 200ms ease;
          }
          .payment-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 18px 40px rgba(0,0,0,0.35);
          }
        `}</style>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {PAYMENT_METHODS.map((method, idx) => (
            <div
              key={method.id}
              style={{
                minWidth: "100%",
                scrollSnapAlign: "start",
                flexShrink: 0,
                padding: "0 16px",
                boxSizing: "border-box",
              }}
            >
              <PaymentCard method={method} isShared={isShared} variant="mobile" index={idx} />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-3">
          {PAYMENT_METHODS.map((_, i) => (
            <div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "rgba(250,204,21,0.5)",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative z-10 w-full mx-auto"
      style={{ maxWidth: "860px", padding: "24px 0px 40px" }}
    >
      <style>{`
        @keyframes cardIn {
          0% { opacity: 0; transform: translateY(14px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes riseInSmall {
          0% { opacity: 0; transform: translateY(10px) scale(0.99); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .payment-card {
          box-shadow: 0 0 0 rgba(250,204,21,0);
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .payment-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.35);
        }
      `}</style>
      <Slider {...settings}>
        {PAYMENT_METHODS.map((method, idx) => (
          <div key={method.id} style={{ padding: "0 0px" }}>
            <PaymentCard method={method} isShared={isShared} variant="desktop" index={idx} />
          </div>
        ))}
      </Slider>
    </div>
  );
};