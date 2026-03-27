import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Проверяем, установлено ли приложение
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Показываем промпт через 3 секунды после загрузки
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Проверяем, было ли приложение установлено
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA: User accepted the install prompt');
    } else {
      console.log('PWA: User dismissed the install prompt');
    }

    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Не показываем снова в этой сессии
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Не показываем если уже установлено, отклонено в этой сессии, нет промпта, или на странице Locket
  if (
    isInstalled || 
    !showInstallPrompt || 
    !deferredPrompt ||
    sessionStorage.getItem('pwa-install-dismissed') ||
    window.location.pathname === '/locket'
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 animate-in slide-in-from-bottom-4">
      <div className="bg-gradient-to-br from-pink-100 to-purple-100 backdrop-blur-md rounded-2xl shadow-2xl p-4 border-2 border-white/50 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="font-serif text-lg text-purple-900 mb-1">
              Установить приложение?
            </h3>
            <p className="text-sm text-purple-800 mb-3">
              Быстрый доступ к вашим летним воспоминаниям прямо с главного экрана! 🌸
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                Установить
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 bg-white/60 text-purple-900 rounded-xl font-medium hover:bg-white/80 transition-all"
              >
                Не сейчас
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-purple-700" />
          </button>
        </div>
      </div>
    </div>
  );
}