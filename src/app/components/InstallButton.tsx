import { useState, useEffect } from "react";
import { Download, X, Share, PlusSquare } from "lucide-react";

export function InstallButton() {
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Проверяем iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iOS = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(iOS);

    // Проверяем, установлено ли приложение
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    // @ts-ignore
    const isIOSStandalone = window.navigator.standalone === true;
    setIsInstalled(standalone || isIOSStandalone);
  }, []);

  // Не показываем если уже установлено или на странице Locket
  if (isInstalled || window.location.pathname === '/locket') return null;

  return (
    <>
      {/* Modern floating install button */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 group"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
          fontFamily: "var(--font-sans)"
        }}
      >
        <div className="relative">
          <Download className="w-4 h-4 text-purple-600 transition-transform group-hover:-translate-y-0.5" />
          <div 
            className="absolute inset-0 blur-md opacity-50"
            style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
          />
        </div>
        <span 
          className="text-sm font-medium"
          style={{ 
            background: "linear-gradient(135deg, #7c3aed, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          Установить
        </span>
      </button>

      {/* Modern modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowModal(false)}
        >
          <div 
            className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.98), rgba(250,245,255,0.98))",
              backdropFilter: "blur(20px)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Content */}
            <div className="p-8">
              {/* Icon */}
              <div className="flex items-center justify-center mb-6">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center relative"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                    boxShadow: "0 8px 32px rgba(124,58,237,0.3)"
                  }}
                >
                  <Download className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Title */}
              <h2 
                className="text-2xl font-semibold text-center mb-2"
                style={{ 
                  fontFamily: "var(--font-display)",
                  color: "#1f2937"
                }}
              >
                Установить приложение
              </h2>
              
              <p 
                className="text-center text-gray-600 mb-8"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Быстрый доступ к летним воспоминаниям 🌸
              </p>

              {/* Instructions */}
              {isIOS ? (
                <div className="space-y-4">
                  <div 
                    className="rounded-2xl p-5 space-y-4"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(0,0,0,0.06)"
                    }}
                  >
                    <p 
                      className="text-sm font-medium text-gray-900 mb-4"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Инструкция для iPhone/iPad:
                    </p>
                    
                    <div className="space-y-4">
                      {/* Step 1 */}
                      <div className="flex items-start gap-3">
                        <div 
                          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
                        >
                          1
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800" style={{ fontFamily: "var(--font-sans)" }}>
                            Нажмите <strong>Поделиться</strong>
                          </p>
                          <div 
                            className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                            style={{ background: "rgba(59,130,246,0.1)" }}
                          >
                            <Share className="w-4 h-4 text-blue-600" />
                            <span className="text-xs text-blue-900 font-medium">Внизу экрана</span>
                          </div>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex items-start gap-3">
                        <div 
                          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                        >
                          2
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800" style={{ fontFamily: "var(--font-sans)" }}>
                            Выберите <strong>"На экран «Домой»"</strong>
                          </p>
                          <div 
                            className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                            style={{ background: "rgba(16,185,129,0.1)" }}
                          >
                            <PlusSquare className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-900 font-medium">Добавить</span>
                          </div>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="flex items-start gap-3">
                        <div 
                          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
                        >
                          3
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800" style={{ fontFamily: "var(--font-sans)" }}>
                            Готово! Иконка появится на экране 🎉
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tip */}
                  <div 
                    className="rounded-xl p-4 text-center"
                    style={{ 
                      background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(236,72,153,0.08))"
                    }}
                  >
                    <p className="text-sm text-gray-700" style={{ fontFamily: "var(--font-sans)" }}>
                      💡 После установки работает как обычное приложение!
                    </p>
                  </div>
                </div>
              ) : (
                /* Android/Desktop */
                <div className="space-y-4">
                  <div 
                    className="rounded-2xl p-5 space-y-4"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(0,0,0,0.06)"
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
                      >
                        1
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800" style={{ fontFamily: "var(--font-sans)" }}>
                          Нажмите баннер <strong>"Установить"</strong> вверху
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div 
                        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
                      >
                        2
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800" style={{ fontFamily: "var(--font-sans)" }}>
                          Или в меню (⋮) → <strong>"Установить приложение"</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="rounded-xl p-4 text-center"
                    style={{ 
                      background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(236,72,153,0.08))"
                    }}
                  >
                    <p className="text-sm text-gray-700" style={{ fontFamily: "var(--font-sans)" }}>
                      💡 Быстрый запуск, работает офлайн!
                    </p>
                  </div>
                </div>
              )}

              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-6 px-6 py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                  boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
                  fontFamily: "var(--font-display)"
                }}
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
