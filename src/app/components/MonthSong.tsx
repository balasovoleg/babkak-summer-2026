import { useState, useEffect, useRef } from "react";
import { Music, Play, Pause, Upload, X } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-86e83646`;

interface SongData {
  url: string;
  name: string;
  uploadedAt: string;
}

interface MonthSongProps {
  monthKey: string;
}

export function MonthSong({ monthKey }: MonthSongProps) {
  const [song, setSong] = useState<SongData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load song on mount
  useEffect(() => {
    loadSong();
  }, [monthKey]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const loadSong = async () => {
    try {
      const url = `${API_URL}/month/${monthKey}/song`;
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Loaded song for ${monthKey}:`, data.song ? data.song.name : 'No song');
        setSong(data.song);
      }
    } catch (error) {
      // Silently fail - backend unavailable
      console.warn(`⚠️ Song backend unavailable for ${monthKey}`);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("song", file);

    try {
      console.log(`📤 Uploading song: ${file.name}`);
      
      const response = await fetch(`${API_URL}/month/${monthKey}/song`, {
        method: "POST",
        headers: { Authorization: `Bearer ${publicAnonKey}` },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Successfully uploaded song`);
        setSong(data.song);
      } else {
        const errorText = await response.text();
        console.error(`❌ Song upload failed:`, errorText);
        alert(`Backend недоступен. Песни временно не могут быть загружены.`);
      }
    } catch (error) {
      console.error("❌ Error uploading song:", error);
      alert(`Backend недоступен. Песни временно не могут быть загружены.`);
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const togglePlay = () => {
    if (!song || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Initialize audio element when song changes
  useEffect(() => {
    if (song) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(song.url);
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }
  }, [song]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/50 hover:bg-white/80 transition-all shadow-sm"
      >
        <Music className="w-5 h-5" />
        {song && <span className="text-sm">♪</span>}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-white/50">
            <div className="p-6 border-b border-gray-200/50 flex items-center justify-between">
              <h2 className="text-2xl font-serif">Песня месяца</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {!song ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id={`song-upload-${monthKey}`}
                  />
                  <label
                    htmlFor={`song-upload-${monthKey}`}
                    className="flex flex-col items-center justify-center gap-4 px-6 py-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-dashed border-purple-300 cursor-pointer hover:from-purple-200 hover:to-pink-200 transition-all"
                  >
                    <Music className="w-12 h-12 text-purple-600" />
                    <span className="font-medium text-purple-900 text-center">
                      {isUploading ? "Загрузка..." : "Загрузить песню месяца"}
                    </span>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 text-center">
                    <Music className="w-12 h-12 mx-auto mb-3 text-purple-600" />
                    <p className="font-serif text-lg text-purple-900 mb-1">
                      {song.name}
                    </p>
                    <p className="text-sm text-purple-700">
                      {new Date(song.uploadedAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>

                  <button
                    onClick={togglePlay}
                    className="w-full py-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl font-medium flex items-center justify-center gap-3 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-6 h-6" />
                        Пауза
                      </>
                    ) : (
                      <>
                        <Play className="w-6 h-6" />
                        Воспроизвести
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="audio/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id={`song-replace-${monthKey}`}
                    />
                    <label
                      htmlFor={`song-replace-${monthKey}`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm text-purple-700 hover:text-purple-900 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      Заменить песню
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}