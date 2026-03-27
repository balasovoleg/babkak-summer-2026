import { useState, useEffect } from "react";
import { Heart, RefreshCw, Download, Share, Home } from "lucide-react";
import { Link } from "react-router";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface MediaItem {
  key: string;
  url: string;
  type: "image" | "video";
  month: string;
  uploadedAt: string;
}

export function LocketWidget() {
  const [currentMedia, setCurrentMedia] = useState<MediaItem | null>(null);
  const [allMedia, setAllMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Загрузка всех медиа
  useEffect(() => {
    loadAllMedia();
    
    // Обновляем время каждую минуту
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  const loadAllMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-86e83646/media`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const mediaItems: MediaItem[] = [];

        // Собираем все фото и видео из всех месяцев
        Object.entries(data).forEach(([month, items]) => {
          if (Array.isArray(items)) {
            items.forEach((item: any) => {
              if (item.url && item.type !== "song") {
                mediaItems.push({
                  key: item.key || `${month}-${Date.now()}`,
                  url: item.url,
                  type: item.type === "video" ? "video" : "image",
                  month: month,
                  uploadedAt: item.uploadedAt || new Date().toISOString(),
                });
              }
            });
          }
        });

        setAllMedia(mediaItems);
        
        // Показываем случайное фото
        if (mediaItems.length > 0) {
          const randomIndex = Math.floor(Math.random() * mediaItems.length);
          setCurrentMedia(mediaItems[randomIndex]);
        }
      } else {
        console.warn(`⚠️ Failed to load media from server: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.warn("⚠️ Server unavailable, Locket widget will work without media:", error);
      // Приложение продолжит работать без медиа-файлов
    } finally {
      setLoading(false);
    }
  };

  const showRandomMedia = () => {
    if (allMedia.length > 0) {
      const randomIndex = Math.floor(Math.random() * allMedia.length);
      setCurrentMedia(allMedia[randomIndex]);
    }
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString("ru-RU", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const getMonthColor = (month: string) => {
    const colors: Record<string, string> = {
      may: "#a8e6cf",
      june: "#87ceeb",
      july: "#ffb366",
      august: "#ffb3d9",
      september: "#ffd966",
    };
    return colors[month] || "#f8b4d9";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Фоновое фото */}
      {currentMedia && !loading && (
        <div className="absolute inset-0">
          {currentMedia.type === "image" ? (
            <img
              src={currentMedia.url}
              alt="Locket Widget"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={currentMedia.url}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          )}
          {/* Градиент для читаемости */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>
      )}

      {/* Загрузка */}
      {loading && (
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg font-serif">Загрузка...</p>
        </div>
      )}

      {/* Нет медиа */}
      {!loading && allMedia.length === 0 && (
        <div className="relative z-10 text-center px-6">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-serif text-white mb-4">
            Пока нет фотографий
          </h2>
          <p className="text-white/80 mb-8">
            Загрузите фото в галерею, чтобы они появились здесь!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-900 rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            На главную
          </Link>
        </div>
      )}

      {/* Контент виджета */}
      {!loading && currentMedia && (
        <div className="relative z-10 w-full h-full flex flex-col">
          {/* Верхняя панель - Время и дата */}
          <div className="p-6 text-center">
            <div className="text-7xl md:text-8xl font-light text-white mb-2 tracking-tight drop-shadow-2xl">
              {formatTime()}
            </div>
            <div className="text-xl md:text-2xl text-white/90 font-serif capitalize drop-shadow-lg">
              {formatDate()}
            </div>
          </div>

          {/* Центральная часть - Фото */}
          <div className="flex-1 flex items-center justify-center px-6">
            {/* Рамка вокруг фото (эффект Locket) */}
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-3xl opacity-80 blur-xl"
                style={{
                  background: `linear-gradient(135deg, ${getMonthColor(currentMedia.month)}, #ffffff)`,
                }}
              />
              <div className="relative bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-2xl max-w-sm">
                {currentMedia.type === "image" ? (
                  <img
                    src={currentMedia.url}
                    alt="Memory"
                    className="w-full h-auto rounded-xl"
                  />
                ) : (
                  <video
                    src={currentMedia.url}
                    className="w-full h-auto rounded-xl"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
                {/* Месяц */}
                <div className="mt-3 text-center">
                  <span
                    className="inline-block px-4 py-1 rounded-full text-sm font-medium text-white"
                    style={{
                      backgroundColor: getMonthColor(currentMedia.month),
                    }}
                  >
                    {currentMedia.month === "may" && "Май 🌸"}
                    {currentMedia.month === "june" && "Июнь 🌊"}
                    {currentMedia.month === "july" && "Июль ☀️"}
                    {currentMedia.month === "august" && "Август 🌺"}
                    {currentMedia.month === "september" && "Сентябрь 🍂"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Нижняя панель - Кнопки */}
          <div className="p-6 flex items-center justify-center gap-4">
            {/* Обновить */}
            <button
              onClick={showRandomMedia}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-full font-medium hover:bg-white/30 transition-all shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="hidden md:inline">Следующее</span>
            </button>

            {/* На главную */}
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-white text-purple-900 rounded-full font-medium hover:bg-white/90 transition-all shadow-lg"
            >
              <Home className="w-5 h-5" />
              <span className="hidden md:inline">Главная</span>
            </Link>
          </div>

          {/* Инструкция для iOS (при первом открытии) */}
          {sessionStorage.getItem("locket-instructions-shown") !== "true" && (
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 max-w-sm mx-auto px-6 z-20">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 border-2 border-purple-200">
                <button
                  onClick={() => sessionStorage.setItem("locket-instructions-shown", "true")}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                >
                  ×
                </button>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <Download className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-purple-900 mb-1">
                      💡 Добавьте на главный экран!
                    </p>
                    <p className="text-xs text-purple-700">
                      Нажмите <Share className="inline w-3 h-3" /> → "На экран «Домой»"
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      Виджет будет всегда под рукой! 🌸
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}