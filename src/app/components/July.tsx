import { Square, CheckSquare } from "lucide-react";
import photo3 from "figma:asset/d412e5d471bb82eabcf478b13c40b86f097682c3.png";
import { useMonthData } from "../hooks/useMonthData";
import { MediaGallery } from "./MediaGallery";
import { MonthSong } from "./MonthSong";
import { MonthNavigation } from "./MonthNavigation";
import { SwipeableMonth } from "./SwipeableMonth";
import { SwipeHint } from "./SwipeHint";

const BG = "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1920&q=95";

export function July() {
  const { items, note, setNote, toggleItem, updateItemText } = useMonthData("july");

  const color = "#f59e0b"; // Modern orange

  return (
    <SwipeableMonth prevPath="/june" nextPath="/august">
      <div
        className="min-h-screen relative p-6 sm:p-8 lg:p-12"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Modern orange overlay */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "linear-gradient(135deg, rgba(255,251,235,0.96) 0%, rgba(254,243,199,0.94) 50%, rgba(253,230,138,0.96) 100%)",
            backdropFilter: "blur(40px)"
          }} 
        />

        {/* Swipe hint */}
        <SwipeHint />

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation */}
          <div className="mb-10">
            <MonthNavigation
              prevMonth={{ path: "/june", label: "Июнь" }}
              nextMonth={{ path: "/august", label: "Август" }}
              currentMonth="июль"
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
                  src={photo3}
                  alt="Июль"
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(0.9) contrast(1.05)" }}
                />
              </div>
              
              <div className="p-6 space-y-4">
                <p 
                  className="text-center text-sm font-medium"
                  style={{ color, fontFamily: "var(--font-sans)" }}
                >
                  ☀️ Жаркое лето
                </p>
                
                {/* Media controls */}
                <div className="flex items-center justify-center gap-3">
                  <MediaGallery monthKey="july" />
                  <MonthSong monthKey="july" />
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
                    color: "#b45309",
                    lineHeight: 1.1
                  }}
                >
                  Июль
                </h2>
                
                <p 
                  className="text-lg"
                  style={{ color: "#d97706", fontFamily: "var(--font-sans)" }}
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
                  style={{ color: "#b45309", fontFamily: "var(--font-display)" }}
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
                          <Square className="w-5 h-5" style={{ color: "#fbbf24" }} />
                        )}
                      </button>
                      
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => updateItemText(index, e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none transition-opacity"
                        style={{
                          color: item.checked ? "#fbbf24" : "#b45309",
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
                  style={{ color: "#b45309", fontFamily: "var(--font-display)" }}
                >
                  Заметки
                </h3>
                
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Добавьте свои заметки о июле..."
                  className="w-full bg-transparent border-none outline-none resize-none"
                  rows={6}
                  style={{ 
                    color: "#b45309",
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