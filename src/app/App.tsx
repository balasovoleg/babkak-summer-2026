import { RouterProvider } from "react-router";
import { router } from "./routes";
import { BackgroundMusic } from "./components/BackgroundMusic";
import { MusicUploader } from "./components/MusicUploader";
import { MonthDataProvider } from "./context/MonthDataContext";
import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export default function App() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Track path changes
  useEffect(() => {
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  // Load audio URL from server on mount
  useEffect(() => {
    const loadAudioUrl = async () => {
      try {
        const url = `https://${projectId}.supabase.co/functions/v1/make-server-86e83646/audio-url`;
        console.log('🎵 Fetching audio URL from:', url);
        
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Audio URL response:', data);
          if (data.url) {
            setAudioUrl(data.url);
            console.log('✅ Audio URL loaded successfully');
          } else {
            console.log('ℹ️ No audio URL available yet');
          }
        } else {
          console.warn(`⚠️ Failed to fetch audio URL: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.warn("⚠️ Server unavailable, background music will not play:", error);
        // Приложение продолжит работать без фоновой музыки
      } finally {
        setIsLoading(false);
      }
    };

    loadAudioUrl();
  }, []);

  const handleUploadSuccess = (url: string) => {
    setAudioUrl(url);
    console.log("New audio URL set:", url);
  };

  const isLocketPage = currentPath === '/locket';

  return (
    <MonthDataProvider>
      <RouterProvider router={router} />
      {!isLocketPage && <MusicUploader onUploadSuccess={handleUploadSuccess} />}
      {!isLocketPage && !isLoading && audioUrl && <BackgroundMusic audioUrl={audioUrl} />}
    </MonthDataProvider>
  );
}