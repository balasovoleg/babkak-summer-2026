import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Link } from "react-router";

interface MonthNavigationProps {
  prevMonth?: { path: string; label: string };
  nextMonth?: { path: string; label: string };
  currentMonth: string;
  color: string;
}

export function MonthNavigation({ prevMonth, nextMonth, currentMonth, color }: MonthNavigationProps) {
  return (
    <div className="flex items-center justify-between">
      {/* Previous */}
      {prevMonth ? (
        <Link
          to={prevMonth.path}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 group"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.8)",
          }}
        >
          <ChevronLeft 
            className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" 
            style={{ color }}
          />
          <span 
            className="text-sm font-medium hidden sm:inline"
            style={{ color, fontFamily: "var(--font-sans)" }}
          >
            {prevMonth.label}
          </span>
        </Link>
      ) : (
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.8)",
          }}
        >
          <Home className="w-5 h-5" style={{ color }} />
          <span 
            className="text-sm font-medium hidden sm:inline"
            style={{ color, fontFamily: "var(--font-sans)" }}
          >
            Главная
          </span>
        </Link>
      )}

      {/* Current month indicator */}
      <div 
        className="px-6 py-2.5 rounded-full text-center"
        style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.9)",
        }}
      >
        <span 
          className="text-xs font-medium tracking-[0.2em] uppercase"
          style={{ color, fontFamily: "var(--font-display)" }}
        >
          ✦ {currentMonth} ✦
        </span>
      </div>

      {/* Next */}
      {nextMonth ? (
        <Link
          to={nextMonth.path}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 group"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.8)",
          }}
        >
          <span 
            className="text-sm font-medium hidden sm:inline"
            style={{ color, fontFamily: "var(--font-sans)" }}
          >
            {nextMonth.label}
          </span>
          <ChevronRight 
            className="w-5 h-5 transition-transform group-hover:translate-x-0.5" 
            style={{ color }}
          />
        </Link>
      ) : (
        <Link
          to="/rewind"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 group"
          style={{
            background: color,
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: `0 4px 16px ${color}40`,
          }}
        >
          <span 
            className="text-sm font-semibold text-white"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Rewind
          </span>
          <ChevronRight 
            className="w-5 h-5 text-white transition-transform group-hover:translate-x-0.5" 
          />
        </Link>
      )}
    </div>
  );
}
