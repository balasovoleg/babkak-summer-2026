import { ChevronLeft, Home, Sparkles } from "lucide-react";
import { Link } from "react-router";
import groupPhoto from "figma:asset/625d745ab89a842ea88976a737d1b12372f4c718.png";
import newGroupPhoto from "figma:asset/32f90440d29553921e7a5c4de1ddd250df83a43e.png";

const BG = "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1920&q=95";

export function Finale() {
  return (
    <div
      className="min-h-screen relative p-6 sm:p-8 lg:p-12"
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
          background: "linear-gradient(135deg, rgba(255,250,240,0.97) 0%, rgba(250,245,255,0.95) 50%, rgba(255,245,250,0.97) 100%)",
          backdropFilter: "blur(40px)"
        }} 
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Back button */}
        <div className="flex justify-start mb-8">
          <Link
            to="/september"
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(0,0,0,0.05)"
            }}
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
            <span 
              className="text-sm font-medium text-gray-700"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Назад
            </span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm shadow-sm border border-white/40">
            <span 
              className="text-xs font-medium tracking-[0.2em] uppercase"
              style={{ 
                color: "#c084fc",
                fontFamily: "var(--font-display)"
              }}
            >
              Май — Сентябрь 2026
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight"
            style={{ 
              fontFamily: "var(--font-display)",
              background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Наше лето
          </h1>

          <p 
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Воспоминания, которые остались навсегда ✨
          </p>

          {/* Month indicators */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { label: "Май", color: "#10b981", emoji: "🌸" },
              { label: "Июнь", color: "#3b82f6", emoji: "☀️" },
              { label: "Июль", color: "#f59e0b", emoji: "🌊" },
              { label: "Август", color: "#ec4899", emoji: "💕" },
              { label: "Сентябрь", color: "#f97316", emoji: "🍂" },
            ].map((m) => (
              <div 
                key={m.label} 
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.8)"
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ background: m.color }}
                />
                <span className="text-sm font-medium" style={{ color: m.color, fontFamily: "var(--font-sans)" }}>
                  {m.emoji} {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Photos - Modern layout */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Photo 1 */}
          <div
            className="rounded-3xl overflow-hidden shadow-xl"
            style={{
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
            }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={groupPhoto}
                alt="Наша команда"
                className="w-full h-full object-cover"
                style={{ filter: "saturate(0.9) contrast(1.05)" }}
              />
            </div>
          </div>

          {/* Photo 2 */}
          <div
            className="rounded-3xl overflow-hidden shadow-xl"
            style={{
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
            }}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={newGroupPhoto}
                alt="Наша команда 2"
                className="w-full h-full object-contain"
                style={{ filter: "saturate(0.9) contrast(1.05)", background: "rgba(0,0,0,0.02)" }}
              />
            </div>
          </div>
        </div>

        {/* Message card */}
        <div
          className="rounded-3xl p-8 sm:p-10 mb-10 text-center max-w-3xl mx-auto"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)"
          }}
        >
          <Sparkles 
            className="w-12 h-12 mx-auto mb-4"
            style={{ color: "#ec4899" }}
          />
          
          <p 
            className="text-xl sm:text-2xl font-semibold mb-4"
            style={{ 
              fontFamily: "var(--font-display)",
              color: "#1f2937"
            }}
          >
            Пять месяцев приключений
          </p>
          
          <p 
            className="text-base sm:text-lg text-gray-600 mb-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            События, путешествия и незабываемые моменты
          </p>
          
          <p 
            className="text-lg font-medium mt-6"
            style={{ 
              fontFamily: "var(--font-sans)",
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Спасибо за это удивительное путешествие 💜
          </p>
        </div>

        {/* Home button */}
        <div className="flex justify-center">
          <Link
            to="/"
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              color: "#fff",
              boxShadow: "0 8px 32px rgba(124,58,237,0.3), 0 0 0 1px rgba(255,255,255,0.2)",
              fontFamily: "var(--font-display)"
            }}
          >
            <Home className="w-5 h-5" />
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
