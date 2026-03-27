import { useState } from "react";
import { Music } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface MusicUploaderProps {
  onUploadSuccess: (url: string) => void;
}

export function MusicUploader({ onUploadSuccess }: MusicUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("audio/")) {
      setError("Пожалуйста, выберите аудио файл");
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError("Файл слишком большой. Максимум 50MB");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("audio", file);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-86e83646/upload-audio`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Ошибка сервера" }));
        throw new Error(errorData.error || "Ошибка загрузки");
      }

      const data = await response.json();
      console.log("✅ Upload successful:", data);
      onUploadSuccess(data.url);
    } catch (err) {
      console.warn("⚠️ Upload error:", err);
      const errorMessage = err instanceof Error ? err.message : "Сервер недоступен";
      setError(errorMessage);
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <label
        className={`
          bg-white/40 backdrop-blur-sm rounded-full shadow-md
          w-10 h-10 flex items-center justify-center
          border border-white/30 cursor-pointer
          hover:bg-white/60 hover:scale-110 transition-all
          ${isUploading ? "opacity-50 cursor-not-allowed animate-pulse" : ""}
        `}
        title="Загрузить музыку"
      >
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />
        {isUploading ? (
          <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Music className="w-4 h-4 text-purple-400/70" />
        )}
      </label>
      
      {error && (
        <div className="absolute bottom-12 left-0 whitespace-nowrap bg-red-100/90 backdrop-blur-sm border border-red-300 text-red-700 px-3 py-2 rounded-lg text-xs shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
}