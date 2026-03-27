import { ChevronRight, Heart, Download } from "lucide-react";
import { Link } from "react-router";
import groupPhoto from "figma:asset/625d745ab89a842ea88976a737d1b12372f4c718.png";
import { InstallButton } from "./InstallButton";
import { Settings } from "./Settings";
import { useState } from "react";

const BG = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=95";
const FALLBACK_PHOTO = "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1920&q=95";

export function Cover() {
  const [imgSrc, setImgSrc] = useState(groupPhoto);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    if (!imgError) {
      console.log("Cover photo failed to load, using fallback");
      setImgSrc(FALLBACK_PHOTO);
      setImgError(true);
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Modern gradient overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: "linear-gradient(135deg, rgba(250,240,255,0.95) 0%, rgba(255,245,250,0.92) 50%, rgba(245,250,255,0.95) 100%)",
          backdropFilter: "blur(40px)"
        }} 
      />

      {/* Floating install button - top right */}
      <div className="absolute top-6 right-6 z-50">
        <InstallButton />
      </div>

      {/* Settings button - top left */}
      <div className="absolute top-6 left-6 z-50">
        <Settings />
      </div>

      <div className="relative w-full max-w-7xl mx-auto py-12 sm:py-16">
        {/* Header section */}
        <div className="text-center mb-8 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm shadow-sm border border-white/40">
            <span 
              className="text-xs font-medium tracking-[0.2em] uppercase"
              style={{ 
                color: "#9b6dd6",
                fontFamily: "var(--font-display)"
              }}
            >
              Лето 2026
            </span>
          </div>
          
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight"
            style={{ 
              fontFamily: "var(--font-display)",
              background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Babkak 2026
          </h1>
          
          <p 
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Интерактивный чек-лист событий, путешествий и активностей
          </p>
        </div>

        {/* Main photo card - hero style */}
        <div className="max-w-5xl mx-auto mb-10">
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
            }}
          >
            {/* Photo */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={imgSrc}
                alt="Наша команда"
                className="w-full h-full object-cover"
                style={{ filter: "saturate(0.9) contrast(1.05)" }}
                onError={handleImageError}
              />
              
              {/* Overlay gradient on photo */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 50%)"
                }}
              />
            </div>

            {/* Action bar - moved outside photo on mobile, overlay on desktop */}
            <div className="relative sm:absolute sm:bottom-0 sm:left-0 sm:right-0 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-4">
              {/* Locket button */}
              <Link
                to="/locket"
                target="_blank"
                className="flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,240,250,0.95))",
                  color: "#ec4899",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 32px rgba(236,72,153,0.25), 0 0 0 1px rgba(255,255,255,0.8)",
                  fontFamily: "var(--font-sans)"
                }}
              >
                <Heart className="w-4 h-4" fill="currentColor" />
                Локет виджет
              </Link>

              {/* Caption */}
              <p 
                className="text-sm text-center font-medium px-4 py-2 rounded-full"
                style={{ 
                  background: "rgba(0,0,0,0.3)",
                  color: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(8px)",
                  fontFamily: "var(--font-sans)"
                }}
              >
                Вместе создадим незабываемые воспоминания ✨
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Main CTA */}
          <Link
            to="/may"
            className="group flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              color: "#fff",
              boxShadow: "0 10px 40px rgba(124,58,237,0.3), 0 0 0 1px rgba(255,255,255,0.2)",
              fontFamily: "var(--font-display)"
            }}
          >
            Начать путешествие
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Secondary info */}
          <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600">
            <span style={{ fontFamily: "var(--font-sans)" }}>Май — Сентябрь</span>
            <span className="text-gray-400">��</span>
            <span style={{ fontFamily: "var(--font-sans)" }}>5 месяцев</span>
          </div>
        </div>
      </div>
    </div>
  );
}