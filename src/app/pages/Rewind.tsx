import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, Play } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-86e83646`;
const BG = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=95";

interface MediaItem {
  id: string;
  url: string;
  type: "photo" | "video";
  uploadedAt: string;
  month: string;
}

const MONTH_NAMES: Record<string, string> = {
  may: "Май",
  june: "Июнь",
  july: "Июль",
  august: "Август",
  september: "Сентябрь",
};

export default function Rewind() {
  const navigate = useNavigate();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAllMedia();
    const interval = setInterval(loadAllMedia, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadAllMedia = async () => {
    try {
      const response = await fetch(`${API_URL}/all-media`, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMedia(data.media || []);
      } else {
        console.warn(`⚠�� Failed to load media from server: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.warn("⚠️ Server unavailable, Rewind page will work without media:", error);
      // Приложение продолжит работать без медиа-файлов
    } finally {
      setIsLoading(false);
    }
  };

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
          background: "linear-gradient(135deg, rgba(255,250,245,0.96) 0%, rgba(255,245,240,0.94) 50%, rgba(250,245,255,0.96) 100%)",
          backdropFilter: "blur(40px)"
        }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm shadow-sm border border-white/40">
            <span 
              className="text-xs font-medium tracking-[0.2em] uppercase"
              style={{ 
                color: "#ea580c",
                fontFamily: "var(--font-display)"
              }}
            >
              Retrospective
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight"
            style={{ 
              fontFamily: "var(--font-display)",
              background: "linear-gradient(135deg, #ea580c 0%, #ec4899 50%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Summer Rewind 2026
          </h1>

          <p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Все воспоминания лета в одном месте ✨
          </p>
        </div>

        {/* Media Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <div 
              className="w-12 h-12 rounded-full border-2 border-transparent animate-spin"
              style={{
                borderTopColor: "#ea580c",
                borderRightColor: "#ec4899"
              }}
            />
          </div>
        ) : media.length === 0 ? (
          <div 
            className="rounded-3xl p-12 text-center max-w-2xl mx-auto"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)"
            }}
          >
            <p 
              className="text-2xl font-semibold mb-3"
              style={{ 
                fontFamily: "var(--font-display)",
                color: "#1f2937"
              }}
            >
              Пока нет воспоминаний
            </p>
            <p 
              className="text-gray-600"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Добавьте фото и видео в каждый месяц!
            </p>
          </div>
        ) : (
          <div 
            className="rounded-3xl p-6 sm:p-8 max-h-[70vh] overflow-y-auto"
            style={{
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.6)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)"
            }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {media.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden aspect-square"
                  style={{
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
                  }}
                >
                  {item.type === "video" ? (
                    <>
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        <div 
                          className="w-14 h-14 rounded-full flex items-center justify-center"
                          style={{
                            background: "rgba(255,255,255,0.95)",
                            backdropFilter: "blur(8px)"
                          }}
                        >
                          <Play className="w-6 h-6 ml-1" style={{ color: "#ea580c" }} fill="currentColor" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.url}
                      alt="Memory"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  )}
                  
                  {/* Month label */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-3"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)"
                    }}
                  >
                    <p 
                      className="text-white text-sm font-medium"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {MONTH_NAMES[item.month]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate("/finale")}
            className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #ea580c, #ec4899)",
              color: "#fff",
              boxShadow: "0 8px 32px rgba(234,88,12,0.3), 0 0 0 1px rgba(255,255,255,0.2)",
              fontFamily: "var(--font-display)"
            }}
          >
            Финал
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}