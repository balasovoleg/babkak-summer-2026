import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function SwipeHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Показываем подсказку только при первом посещении
    const hasSeenHint = sessionStorage.getItem("swipe-hint-seen");
    
    if (!hasSeenHint) {
      const timer = setTimeout(() => {
        setShow(true);
        // Автоматически скрываем через 3 секунды
        setTimeout(() => {
          setShow(false);
          sessionStorage.setItem("swipe-hint-seen", "true");
        }, 3000);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4"
      style={{
        animation: "fadeIn 0.3s ease-out"
      }}
    >
      <div 
        className="flex items-center gap-3 px-6 py-3 rounded-full"
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
        }}
      >
        <ChevronLeft className="w-5 h-5 text-white animate-pulse" />
        <span 
          className="text-sm font-medium text-white"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Свайпайте для навигации
        </span>
        <ChevronRight className="w-5 h-5 text-white animate-pulse" />
      </div>
    </div>
  );
}
