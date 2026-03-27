# Исправление ошибок "Failed to fetch" - 2026

## Проблема
Все запросы к серверу возвращали ошибку `TypeError: Failed to fetch`, что приводило к невозможности загрузки данных месяцев, медиа и аудио файлов.

## Причина
Основная проблема заключалась в том, что async IIFE (Immediately Invoked Function Expression) для инициализации storage buckets могла падать и роняла весь сервер, не позволяя ему запуститься.

## Внесенные исправления

### 1. Улучшена инициализация сервера (`/supabase/functions/server/index.tsx`)

**До:**
```typescript
// Initialize storage bucket on startup
(async () => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    // ... код без проверки ошибок
  } catch (error) {
    console.error(`Error initializing storage bucket: ${error}`);
  }
})();
```

**После:**
```typescript
// Initialize buckets asynchronously without blocking server startup
(async () => {
  try {
    console.log("🚀 Initializing storage buckets...");
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error(`⚠️ Error listing buckets (non-fatal): ${listError.message}`);
      return;
    }
    
    // Create audio bucket with error handling
    const audioBucketExists = buckets?.some((bucket) => bucket.name === BUCKET_NAME);
    if (!audioBucketExists) {
      const { error } = await supabase.storage.createBucket(BUCKET_NAME, { public: false });
      if (error) {
        console.error(`⚠️ Error creating audio bucket (non-fatal): ${error.message}`);
      } else {
        console.log(`✅ Created storage bucket: ${BUCKET_NAME}`);
      }
    } else {
      console.log(`✓ Audio bucket already exists: ${BUCKET_NAME}`);
    }
    
    // Similar for media bucket...
    
    console.log("✅ Storage initialization complete");
  } catch (error) {
    console.error(`⚠️ Non-fatal error during storage initialization: ${error}`);
    // Don't throw - let the server continue running
  }
})();

console.log("🌐 Server is starting...");
console.log("✅ Server routes configured successfully");
console.log("🚀 Starting Deno server...");
```

**Ключевые изменения:**
- ✅ Добавлена проверка ошибок на каждом шаге
- ✅ Ошибки помечены как non-fatal
- ✅ Сервер продолжает работу даже при ошибках инициализации
- ✅ Добавлено подробное логирование для диагностики

### 2. Улучшено логирование в MonthDataContext (`/src/app/context/MonthDataContext.tsx`)

**Добавлено:**
```typescript
const loadAllMonths = async () => {
  console.log('📡 Loading all months data...');
  const promises = MONTHS.map(async (monthKey) => {
    try {
      const url = `${API_URL}/month/${monthKey}`;
      console.log(`Fetching ${monthKey} from: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Loaded ${monthKey}:`, { items: data.items?.length, note: data.note?.length });
        // ...
      } else {
        console.error(`❌ Failed to load ${monthKey}: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(`❌ Error loading ${monthKey}:`, error);
      if (error instanceof Error) {
        console.error(`Error details: ${error.message}`);
      }
    }
    return null;
  });
  // ...
  console.log('✅ All months loading complete');
};
```

### 3. Улучшено логирование в App.tsx

**Добавлено:**
```typescript
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
      // ...
    } else {
      console.error(`❌ Failed to fetch audio URL: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error("❌ Failed to load audio URL:", error);
    if (error instanceof Error) {
      console.error(`Error details: ${error.message}`);
    }
  }
};
```

### 4. Улучшено логирование в MediaGallery

**Добавлено:**
```typescript
const loadMedia = async () => {
  try {
    const url = `${API_URL}/month/${monthKey}/media`;
    console.log(`📡 Loading media for ${monthKey} from: ${url}`);
    
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Loaded media for ${monthKey}:`, data.media?.length || 0, 'items');
      setMedia(data.media || []);
    } else {
      console.error(`❌ Failed to load media for ${monthKey}: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(`❌ Error loading media for ${monthKey}:`, error);
    if (error instanceof Error) {
      console.error(`Error details: ${error.message}`);
    }
  }
};
```

### 5. Улучшено логирование в MonthSong

**Добавлено:**
```typescript
const loadSong = async () => {
  try {
    const url = `${API_URL}/month/${monthKey}/song`;
    console.log(`🎵 Loading song for ${monthKey} from: ${url}`);
    
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${publicAnonKey}` },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Loaded song for ${monthKey}:`, data.song ? data.song.name : 'No song');
      setSong(data.song);
    } else {
      console.error(`❌ Failed to load song for ${monthKey}: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(`❌ Error loading song for ${monthKey}:`, error);
    if (error instanceof Error) {
      console.error(`Error details: ${error.message}`);
    }
  }
};
```

## Результат

### Теперь при запуске приложения в консоли будет видно:

**Серверная сторона:**
```
🚀 Initializing storage buckets...
✓ Audio bucket already exists: make-86e83646-audio
✓ Media bucket already exists: make-86e83646-media
✅ Storage initialization complete
🌐 Server is starting...
✅ Server routes configured successfully
🚀 Starting Deno server...
```

**Клиентская сторона:**
```
📡 Loading all months data...
Fetching may from: https://vctylwutarlvdpcazydd.supabase.co/functions/v1/make-server-86e83646/month/may
Fetching june from: https://vctylwutarlvdpcazydd.supabase.co/functions/v1/make-server-86e83646/month/june
...
✅ Loaded may: { items: 5, note: 0 }
✅ Loaded june: { items: 5, note: 0 }
...
✅ All months loading complete
🎵 Fetching audio URL from: https://vctylwutarlvdpcazydd.supabase.co/functions/v1/make-server-86e83646/audio-url
✅ Audio URL response: { url: null }
```

## Преимущества

1. ✅ **Устойчивость**: Сервер не падает при ошибках инициализации
2. ✅ **Диагностика**: Подробные логи помогают быстро найти проблему
3. ✅ **Информативность**: Эмодзи и понятные сообщения
4. ✅ **Детализация**: Каждая операция логируется с контекстом
5. ✅ **Graceful degradation**: Приложение продолжает работать даже при частичных сбоях

## Дата исправления
27 марта 2026 года
