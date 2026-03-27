import { Square, CheckSquare } from "lucide-react";
import photo5a from "figma:asset/1a66a852ec9f4164babb4310637fbaaf7f63895a.png";
import photo5b from "figma:asset/5405546e4f57a91ec8104fadf2cfa9d1d9191e53.png";
import { useMonthData } from "../hooks/useMonthData";
import { MediaGallery } from "./MediaGallery";
import { MonthSong } from "./MonthSong";
import { MonthNavigation } from "./MonthNavigation";
import { SwipeableMonth } from "./SwipeableMonth";
import { SwipeHint } from "./SwipeHint";

const BG = "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=1920&q=95";

export function September() {
  const { items, note, setNote, toggleItem, updateItemText } = useMonthData("september");

  const color = "#f97316"; // Modern autumn orange

  return (
    <SwipeableMonth prevPath="/august" nextPath="/rewind">
      <div
        className="min-h-screen relative p-6 sm:p-8 lg:p-12"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Modern autumn overlay */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: "linear-gradient(135deg, rgba(255,247,237,0.96) 0%, rgba(254,237,213,0.94) 50%, rgba(253,224,189,0.96) 100%)",
            backdropFilter: "blur(40px)"
          }} 
        />

        {/* Swipe hint */}
        <SwipeHint />

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation */}
          <div className="mb-10">
            <MonthNavigation
              prevMonth={{ path: "/august", label: "Август" }}
              nextMonth={{ path: "/rewind", label: "Rewind" }}
              currentMonth="сентябрь"
              color={color}
            />
          </div>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8 items-start">
            {/* Left column - Photos */}
            <div className="space-y-4 lg:space-y-6">
              {/* First photo */}
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
                    src={photo5a}
                    alt="Сентябрь - дождливая улица"
                    className="w-full h-full object-cover"
                    style={{ filter: "saturate(0.9) contrast(1.05)" }}
                  />
                </div>
              </div>

              {/* Second photo */}
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
                    src={photo5b}
                    alt="Сентябрь - уютный момент"
                    className="w-full h-full object-cover"
                    style={{ filter: "saturate(0.9) contrast(1.05)" }}
                  />
                </div>
              </div>

              {/* Caption and media controls */}
              <div
                className="rounded-2xl p-4 shadow-lg"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.6)",
                }}
              >
                <p 
                  className="text-center text-sm font-medium mb-3"
                  style={{ color, fontFamily: "var(--font-sans)" }}
                >
                  🍂 Осенний золотой
                </p>
                
                {/* Media controls */}
                <div className="flex items-center justify-center gap-3">
                  <MediaGallery monthKey="september" />
                  <MonthSong monthKey="september" />
                </div>
              </div>
            </div>

            {/* Right column - Content */}
            <div className="space-y-6 lg:space-y-8">
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
                  className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-3"
                  style={{ 
                    fontFamily: "var(--font-display)",
                    color: "#c2410c",
                    lineHeight: 1.1
                  }}
                >
                  Сентябрь
                </h2>
                
                <p 
                  className="text-lg"
                  style={{ color: "#ea580c", fontFamily: "var(--font-sans)" }}
                >
                  События, путешествия и активности
                </p>
              </div>

              {/* Checklist */}
              <div
                className="rounded-2xl p-5 lg:p-6"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.7)",
                }}
              >
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ color: "#c2410c", fontFamily: "var(--font-display)" }}
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
                          <Square className="w-5 h-5" style={{ color: "#fed7aa" }} />
                        )}
                      </button>
                      
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) => updateItemText(index, e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none transition-opacity"
                        style={{
                          color: item.checked ? "#fed7aa" : "#c2410c",
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
                className="rounded-2xl p-5 lg:p-6"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.7)",
                }}
              >
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ color: "#c2410c", fontFamily: "var(--font-display)" }}
                >
                  Заметки
                </h3>
                
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Добавьте свои заметки о сентябре..."
                  className="w-full bg-transparent border-none outline-none resize-none"
                  rows={6}
                  style={{ 
                    color: "#c2410c",
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