import { useState } from "react";
import { Settings as SettingsIcon, X, Info, Heart, Code } from "lucide-react";

export function Settings() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Settings button - floating */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 group"
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.8)",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease"
        }}
        aria-label="Настройки"
      >
        <div className="relative">
          <SettingsIcon className="w-5 h-5 text-gray-700 transition-transform group-hover:rotate-90" />
          <div 
            className="absolute inset-0 blur-md opacity-0 group-hover:opacity-50 transition-opacity"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #ec4899)"
            }}
          />
        </div>
      </button>

      {/* Settings modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden border border-white/60"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "var(--font-sans)"
            }}
          >
            {/* Header */}
            <div 
              className="p-6 border-b border-gray-200/50 flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.1))"
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #ec4899)"
                  }}
                >
                  <SettingsIcon className="w-5 h-5 text-white" />
                </div>
                <h2 
                  className="text-2xl font-semibold"
                  style={{ 
                    fontFamily: "var(--font-display)",
                    background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  Настройки
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(85vh-180px)]">
              {/* About section */}
              <div 
                className="p-5 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.05), rgba(236,72,153,0.05))",
                  border: "1px solid rgba(124,58,237,0.1)"
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Info className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">О приложении</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Интерактивная презентация-чеклист событий, путешествий и активностей 
                      с мая по сентябрь 2026 года. Создано с любовью для сохранения 
                      ваших летних воспоминаний ✨
                    </p>
                  </div>
                </div>
              </div>

              {/* Features section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">
                  Возможности для развития
                </h3>
                
                <div 
                  className="p-4 rounded-xl border border-gray-200 bg-white/50 hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Синхронизация данных</h4>
                      <p className="text-sm text-gray-600">
                        Все чеклисты и заметки сохраняются автоматически и доступны 
                        всем пользователям в реальном времени
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-4 rounded-xl border border-gray-200 bg-white/50 hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">📸</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Медиа-галерея</h4>
                      <p className="text-sm text-gray-600">
                        До 30 фото и видео для каждого месяца с автоматической 
                        синхронизацией через Supabase Storage
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-4 rounded-xl border border-gray-200 bg-white/50 hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">🎵</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Песни месяца</h4>
                      <p className="text-sm text-gray-600">
                        Загружайте любимые треки для каждого месяца и создавайте 
                        музыкальное сопровождение ваших воспоминаний
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-4 rounded-xl border border-gray-200 bg-white/50 hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">📱</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">PWA поддержка</h4>
                      <p className="text-sm text-gray-600">
                        Установите приложение на любое устройство и пользуйтесь 
                        даже без интернета благодаря Service Worker
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech stack */}
              <div 
                className="p-5 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(59,130,246,0.05), rgba(147,51,234,0.05))",
                  border: "1px solid rgba(59,130,246,0.1)"
                }}
              >
                <div className="flex items-start gap-3">
                  <Code className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Технологии</h3>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Tailwind CSS", "Supabase", "Vite", "PWA"].map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-white/80 text-gray-700 border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer info */}
              <div className="pt-4 border-t border-gray-200/50 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
                  <Heart className="w-4 h-4 text-pink-500" fill="currentColor" />
                  <span>Создано с любовью в 2026</span>
                </div>
                <p className="text-xs text-gray-400">
                  Версия 2.0 — Обновленный дизайн
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}