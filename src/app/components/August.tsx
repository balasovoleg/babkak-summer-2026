import { Square, CheckSquare } from "lucide-react";
import photo4 from "figma:asset/d091cef3b0451c21ebeba15b321ee6f80768d7ee.png";
import { useMonthData } from "../hooks/useMonthData";
import { MediaGallery } from "./MediaGallery";
import { MonthSong } from "./MonthSong";
import { MonthNavigation } from "./MonthNavigation";
import { SwipeableMonth } from "./SwipeableMonth";
import { SwipeHint } from "./SwipeHint";

const BG = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&q=95";

export function August() {
  const { items, note, setNote, toggleItem, updateItemText } = useMonthData("august");

  const color = "#ec4899"; // Modern pink

  return (
    <SwipeableMonth prevPath="/july" nextPath="/september">
      <div
        className="min-h-screen relative p-6 sm:p-8 lg:p-12"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Modern pink overlay */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "linear-gradient(135deg, rgba(253,242,248,0.96) 0%, rgba(252,231,243,0.94) 50%, rgba(251,207,232,0.96) 100%)",
            backdropFilter: "blur(40px)"
          }} 
        />

        {/* Swipe hint */}
        <SwipeHint />

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation */}
          <div className="mb-10">
            <MonthNavigation
              prevMonth={{ path: "/july", label: "Июль" }}
              nextMonth={{ path: "/september", label: "Сентябрь" }}
              currentMonth="август"
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
                  src={photo4}
                  alt="Август"
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(0.9) contrast(1.05)" }}
                />
              </div>
              
              <div className="p-6 space-y-4">
                <p 
                  className="text-center text-sm font-medium"
                  style={{ color, fontFamily: "var(--font-sans)" }}
                >
                  💕 Романтика лета
                </p>
                
                {/* Media controls */}
                <div className="flex items-center justify-center gap-3">
                  <MediaGallery monthKey="august" />
                  <MonthSong monthKey="august" />
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
                    color: "#be185d",
                    lineHeight: 1.1
                  }}
                >
                  Август
                </h2>
                
                <p 
                  className="text-lg"
                  style={{ color: "#db2777", fontFamily: "var(--font-sans)" }}
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
                  style={{ color: "#be185d", fontFamily: "var(--font-display)" }}
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
                          <Square className="w-5 h-5" style={{ color: "#f9a8d4" }} />
                        )}
                      </button>
                      
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => updateItemText(index, e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none transition-opacity"
                        style={{
                          color: item.checked ? "#f9a8d4" : "#be185d",
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
                  style={{ color: "#be185d", fontFamily: "var(--font-display)" }}
                >
                  Заметки
                </h3>
                
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Добавьте свои заметки о августе..."
                  className="w-full bg-transparent border-none outline-none resize-none"
                  rows={6}
                  style={{ 
                    color: "#be185d",
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