import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { audioManager } from "../utils/audioManager";

interface BackgroundMusicProps {
  audioUrl: string;
}

export function BackgroundMusic({ audioUrl }: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Initialize audio manager with URL
  useEffect(() => {
    audioManager.initialize(audioUrl);
    
    // Subscribe to state changes
    const unsubscribe = audioManager.subscribe(() => {
      setIsPlaying(audioManager.isPlaying);
    });

    return () => {
      unsubscribe();
    };
  }, [audioUrl]);

  // Sync volume with audio manager
  useEffect(() => {
    audioManager.setVolume(volume);
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioManager.pause();
    } else {
      audioManager.play();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white/80 backdrop-blur-md rounded-full shadow-lg p-3 flex items-center gap-3 border border-white/50">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md touch-manipulation"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-white" />
          ) : (
            <VolumeX className="w-5 h-5 text-white" />
          )}
        </button>

        {isPlaying && (
          <div className="flex items-center gap-2 pr-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 h-2 bg-gray-300 rounded-full appearance-none cursor-pointer touch-manipulation
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-purple-500
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-thumb]:active:scale-125
                [&::-webkit-slider-thumb]:transition-transform
                [&::-moz-range-thumb]:w-4 
                [&::-moz-range-thumb]:h-4 
                [&::-moz-range-thumb]:rounded-full 
                [&::-moz-range-thumb]:bg-purple-500
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:cursor-pointer
                [&::-moz-range-thumb]:shadow-md
                [&::-moz-range-thumb]:active:scale-125
                [&::-moz-range-thumb]:transition-transform"
              aria-label="Volume control"
            />
          </div>
        )}
      </div>
    </div>
  );
}