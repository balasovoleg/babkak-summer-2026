import { Square, CheckSquare } from "lucide-react";
import photo1 from "figma:asset/3333b8b3f37fea198f48c75ebbd43a7001e29a54.png";
import { useMonthData } from "../hooks/useMonthData";
import { MediaGallery } from "./MediaGallery";
import { MonthSong } from "./MonthSong";
import { MonthNavigation } from "./MonthNavigation";
import { SwipeableMonth } from "./SwipeableMonth";
import { SwipeHint } from "./SwipeHint";
import { useState } from "react";

const BG = "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1920&q=95";
const FALLBACK_PHOTO = "https://images.unsplash.com/photo-1509218541462-aa68e407d0ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBmbG93ZXJzJTIwbmF0dXJlJTIwZ3JlZW58ZW58MXx8fHwxNzc0NTk4OTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function May() {
  const { items, note, setNote, toggleItem, updateItemText } = useMonthData("may");
  const [imgSrc, setImgSrc] = useState(photo1);
  const [imgError, setImgError] = useState(false);

  const color = "#10b981"; // Modern green

  const handleImageError = () => {
    if (!imgError) {
      console.log("May photo failed to load, using fallback");
      setImgSrc(FALLBACK_PHOTO);
      setImgError(true);
    }
  };

  return (
    <SwipeableMonth prevPath="/" nextPath="/june">
      <div
        className="min-h-screen relative p-6 sm:p-8 lg:p-12"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Modern green overlay */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "linear-gradient(135deg, rgba(236,253,245,0.96) 0%, rgba(220,252,231,0.94) 50%, rgba(209,250,229,0.96) 100%)",
            backdropFilter: "blur(40px)"
          }} 
        />

        {/* Swipe hint */}
        <SwipeHint />

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation */}
          <div className="mb-10">
            <MonthNavigation
              prevMonth={{ path: "/", label: "Главная" }}
              nextMonth={{ path: "/june", label: "Июнь" }}
              currentMonth="май"
              color={color}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Photo card */}
            <div
              className="rounded-3xl overflow-hidden shadow-xl"
              style={{
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.6)",
              }}
            >
              <div className="relative aspect-[4/5]">
                <img
                  src={imgSrc}
                  alt="Май"
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(0.9) contrast(1.05)" }}
                  onError={handleImageError}
                />
              </div>
              
              <div className="p-6 space-y-4">
                <p 
                  className="text-center text-sm font-medium"
                  style={{ color, fontFamily: "var(--font-sans)" }}
                >
                  🌿 Весеннее пробуждение
                </p>
                
                {/* Media controls */}
                <div className="flex items-center justify-center gap-3">
                  <MediaGallery monthKey="may" />
                  <MonthSong monthKey="may" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.8)"
                  }}
                >
                  <span 
                    className="text-xs font-medium tracking-[0.2em] uppercase"
                    style={{ color, fontFamily: "var(--font-display)" }}
                  >
                    2026
                  </span>
                </div>

                <h2
                  className="text-6xl sm:text-7xl font-semibold mb-3"
                  style={{ 
                    fontFamily: "var(--font-display)",
                    color: "#065f46",
                    lineHeight: 1.1
                  }}
                >
                  Май
                </h2>
                
                <p 
                  className="text-lg"
                  style={{ color: "#059669", fontFamily: "var(--font-sans)" }}
                >
                  События, путешествия и активности
                </p>
              </div>

              {/* Checklist */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.7)",
                }}
              >
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ color: "#065f46", fontFamily: "var(--font-display)" }}
                >
                  Чек-лист
                </h3>
                
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 group"
                    >
                      <button
                        onClick={() => toggleItem(index)}
                        className="flex-shrink-0 mt-1 transition-transform hover:scale-110"
                      >
                        {item.checked ? (
                          <CheckSquare className="w-5 h-5" style={{ color }} />
                        ) : (
                          <Square className="w-5 h-5" style={{ color: "#a7f3d0" }} />
                        )}
                      </button>
                      
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => updateItemText(index, e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none transition-opacity"
                        style={{
                          color: item.checked ? "#6ee7b7" : "#047857",
                          textDecoration: item.checked ? "line-through" : "none",
                          fontFamily: "var(--font-sans)"
                        }}
                        placeholder="Новая задача..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.7)",
                }}
              >
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ color: "#065f46", fontFamily: "var(--font-display)" }}
                >
                  Заметки
                </h3>
                
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Добавьте свои заметки о мае..."
                  className="w-full bg-transparent border-none outline-none resize-none"
                  rows={6}
                  style={{ 
                    color: "#047857",
                    fontFamily: "var(--font-sans)"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SwipeableMonth>
  );
}