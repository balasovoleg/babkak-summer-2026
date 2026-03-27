// Global audio manager that exists outside React lifecycle
class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<() => void> = new Set();
  private _isPlaying = false;
  private _volume = 0.5;
  private currentUrl = '';

  initialize(url: string) {
    // Don't reinitialize if same URL
    if (this.currentUrl === url && this.audio) {
      console.log('Audio already initialized with this URL');
      return;
    }

    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio.load();
    }

    this.currentUrl = url;
    this.audio = new Audio();
    this.audio.crossOrigin = 'anonymous'; // Enable CORS
    this.audio.src = url;
    this.audio.loop = true;
    this.audio.volume = this._volume;
    this.audio.preload = 'metadata';

    // Setup event listeners
    this.audio.addEventListener('play', () => {
      console.log('Audio started playing');
      this._isPlaying = true;
      this.notifyListeners();
    });

    this.audio.addEventListener('pause', () => {
      console.log('Audio paused');
      this._isPlaying = false;
      this.notifyListeners();
    });

    this.audio.addEventListener('ended', () => {
      console.log('Audio ended');
      this._isPlaying = false;
      this.notifyListeners();
    });

    this.audio.addEventListener('error', (e) => {
      const error = this.audio?.error;
      console.error('Audio error details:', {
        code: error?.code,
        message: error?.message,
        MEDIA_ERR_ABORTED: error?.code === 1,
        MEDIA_ERR_NETWORK: error?.code === 2,
        MEDIA_ERR_DECODE: error?.code === 3,
        MEDIA_ERR_SRC_NOT_SUPPORTED: error?.code === 4,
        src: this.audio?.src,
      });
      this._isPlaying = false;
      this.notifyListeners();
    });

    this.audio.addEventListener('loadedmetadata', () => {
      console.log('Audio metadata loaded, duration:', this.audio?.duration);
    });

    this.audio.addEventListener('canplay', () => {
      console.log('Audio can play');
    });

    console.log('Audio manager initialized with URL:', url);
  }

  async play() {
    if (!this.audio) {
      console.error('Audio not initialized');
      return;
    }

    try {
      // Reset audio to beginning if it ended
      if (this.audio.ended) {
        this.audio.currentTime = 0;
      }

      await this.audio.play();
      console.log('Audio playing successfully');
    } catch (error) {
      console.error('Failed to play audio:', error);
      // Check if it's an autoplay restriction
      if (error instanceof Error && error.name === 'NotAllowedError') {
        console.warn('Autoplay blocked. User interaction required.');
      }
      this._isPlaying = false;
      this.notifyListeners();
    }
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
  }

  setVolume(volume: number) {
    this._volume = volume;
    if (this.audio) {
      this.audio.volume = volume;
    }
  }

  get isPlaying() {
    return this._isPlaying;
  }

  get volume() {
    return this._volume;
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  destroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio.load();
      this.audio = null;
    }
    this.listeners.clear();
    this.currentUrl = '';
  }
}

// Export singleton instance
export const audioManager = new AudioManager();