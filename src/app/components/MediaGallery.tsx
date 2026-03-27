import { useState, useEffect, useRef } from "react";
import { Image, X, Upload } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-86e83646`;

interface MediaItem {
  id: string;
  url: string;
  type: "photo" | "video";
  uploadedAt: string;
}

interface MediaGalleryProps {
  monthKey: string;
}

export function MediaGallery({ monthKey }: MediaGalleryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load media on mount and periodically
  useEffect(() => {
    loadMedia();
    const interval = setInterval(loadMedia, 10000); // Увеличено до 10 секунд
    return () => clearInterval(interval);
  }, [monthKey]);

  const loadMedia = async () => {
    try {
      const url = `${API_URL}/month/${monthKey}/media`;
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Loaded ${data.media?.length || 0} media items for ${monthKey}`);
        setMedia(data.media || []);
      }
    } catch (error) {
      // Silently fail - backend unavailable
      console.warn(`⚠️ Media backend unavailable for ${monthKey}`);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (media.length >= 30) {
      alert("На данный месяц загружено максимальное количество babkak memory ✨");
      return;
    }

    setIsUploading(true);

    for (let i = 0; i < files.length && media.length + i < 30; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        console.log(`📤 Uploading file: ${file.name}`);
        
        const response = await fetch(`${API_URL}/month/${monthKey}/media`, {
          method: "POST",
          headers: { Authorization: `Bearer ${publicAnonKey}` },
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`✅ Successfully uploaded file`);
          setMedia((prev) => [...prev, data.media]);
        } else {
          const errorText = await response.text();
          console.error(`❌ Upload failed:`, errorText);
          
          try {
            const error = JSON.parse(errorText);
            alert(`Ошибка загрузки: ${error.error || errorText}`);
          } catch {
            alert(`Backend недоступен. Пожалуйста, попробуйте позже.`);
          }
          break;
        }
      } catch (error) {
        console.error("❌ Error uploading file:", error);
        alert(`Backend недоступен. Файлы временно не могут быть загружены.`);
        break;
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (fileId: string) => {
    try {
      const response = await fetch(`${API_URL}/month/${monthKey}/media/${encodeURIComponent(fileId)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${publicAnonKey}` },
      });

      if (response.ok) {
        setMedia((prev) => prev.filter((item) => item.id !== fileId));
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/50 hover:bg-white/80 transition-all shadow-sm"
      >
        <Image className="w-5 h-5" />
        <span className="text-sm font-medium">
          {media.length}/30
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/50">
            <div className="p-6 border-b border-gray-200/50 flex items-center justify-between">
              <h2 className="text-2xl font-serif">Babkak Memory ({media.length}/30)</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {media.length < 30 && (
                <div className="mb-6">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id={`media-upload-${monthKey}`}
                  />
                  <label
                    htmlFor={`media-upload-${monthKey}`}
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl border-2 border-dashed border-pink-300 cursor-pointer hover:from-pink-200 hover:to-purple-200 transition-all"
                  >
                    <Upload className="w-6 h-6 text-pink-600" />
                    <span className="font-medium text-pink-900">
                      {isUploading ? "Загрузка..." : "Загрузить фото или видео"}
                    </span>
                  </label>
                </div>
              )}

              {media.length === 30 && (
                <div className="mb-6 p-4 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl border border-amber-300 text-center">
                  <p className="font-serif text-lg text-amber-900">
                    ✨ На данный месяц загружено максимальное количество babkak memory ✨
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {media.map((item) => (
                  <div key={item.id} className="relative group rounded-2xl overflow-hidden shadow-lg aspect-square">
                    {item.type === "video" ? (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt="Memory"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {media.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="font-serif">Пока нет загруженных воспоминаний</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}