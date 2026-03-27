import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Create Supabase client
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// Initialize storage bucket on startup
const BUCKET_NAME = "make-86e83646-audio";
const MEDIA_BUCKET = "make-86e83646-media";

// Initialize buckets asynchronously without blocking server startup
(async () => {
  try {
    console.log("🚀 Initializing storage buckets...");
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error(`⚠️ Error listing buckets (non-fatal): ${listError.message}`);
      return;
    }
    
    // Create audio bucket
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
    
    // Create media bucket for photos/videos
    const mediaBucketExists = buckets?.some((bucket) => bucket.name === MEDIA_BUCKET);
    if (!mediaBucketExists) {
      const { error } = await supabase.storage.createBucket(MEDIA_BUCKET, { public: false });
      if (error) {
        console.error(`⚠️ Error creating media bucket (non-fatal): ${error.message}`);
      } else {
        console.log(`✅ Created storage bucket: ${MEDIA_BUCKET}`);
      }
    } else {
      console.log(`✓ Media bucket already exists: ${MEDIA_BUCKET}`);
    }
    
    console.log("✅ Storage initialization complete");
  } catch (error) {
    console.error(`⚠️ Non-fatal error during storage initialization: ${error}`);
    // Don't throw - let the server continue running
  }
})();

console.log("🌐 Server is starting...");

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-86e83646/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Upload audio file
app.post("/make-server-86e83646/upload-audio", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get("audio");
    
    if (!file || !(file instanceof File)) {
      return c.json({ error: "No audio file provided" }, 400);
    }

    const fileName = `background-music-${Date.now()}.mp3`;
    const fileBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(fileBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, uint8Array, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (error) {
      console.error("Upload error:", error);
      return c.json({ error: "Failed to upload file", details: error.message }, 500);
    }

    // Get signed URL (valid for 1 year)
    const { data: urlData } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(fileName, 31536000); // 1 year in seconds

    if (!urlData) {
      return c.json({ error: "Failed to create signed URL" }, 500);
    }

    // Store the audio URL in KV
    await kv.set("background_music_url", urlData.signedUrl);

    return c.json({ 
      success: true, 
      url: urlData.signedUrl 
    });
  } catch (error) {
    console.error(`Error uploading audio: ${error}`);
    return c.json({ error: "Failed to upload audio", details: String(error) }, 500);
  }
});

// Get current audio URL
app.get("/make-server-86e83646/audio-url", async (c) => {
  try {
    const url = await kv.get("background_music_url");
    return c.json({ url: url || null });
  } catch (error) {
    console.error(`Error getting audio URL: ${error}`);
    return c.json({ error: "Failed to get audio URL", details: String(error) }, 500);
  }
});

// Get month data (items + note)
app.get("/make-server-86e83646/month/:monthKey", async (c) => {
  try {
    const monthKey = c.req.param("monthKey");
    const itemsKey = `summer2026_${monthKey}_items`;
    const noteKey = `summer2026_${monthKey}_note`;
    
    const itemsValue = await kv.get(itemsKey);
    const noteValue = await kv.get(noteKey);
    
    // Ensure correct types
    const validItems = Array.isArray(itemsValue) ? itemsValue : [];
    const validNote = typeof noteValue === 'string' ? noteValue : '';
    
    return c.json({
      items: validItems,
      note: validNote
    });
  } catch (error) {
    console.log(`Error getting month data: ${error}`);
    return c.json({ error: "Failed to get month data", details: String(error) }, 500);
  }
});

// Save month data (items + note)
app.post("/make-server-86e83646/month/:monthKey", async (c) => {
  try {
    const monthKey = c.req.param("monthKey");
    const body = await c.req.json();
    const { items, note } = body;
    
    // Validate types before saving
    if (!Array.isArray(items)) {
      console.error(`Invalid items type for ${monthKey}:`, typeof items);
      return c.json({ error: "Items must be an array" }, 400);
    }
    
    if (typeof note !== 'string') {
      console.error(`Invalid note type for ${monthKey}:`, typeof note);
      return c.json({ error: "Note must be a string" }, 400);
    }
    
    const itemsKey = `summer2026_${monthKey}_items`;
    const noteKey = `summer2026_${monthKey}_note`;
    
    // Save with validated data
    await kv.set(itemsKey, items);
    await kv.set(noteKey, note);
    
    console.log(`✓ Saved ${monthKey}: ${items.length} items, note: ${note.length} chars`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error saving month data: ${error}`);
    return c.json({ error: "Failed to save month data", details: String(error) }, 500);
  }
});

// Upload media file (photo/video) for a month
app.post("/make-server-86e83646/month/:monthKey/media", async (c) => {
  try {
    const monthKey = c.req.param("monthKey");
    console.log(`📤 Media upload request for ${monthKey}`);
    
    const formData = await c.req.formData();
    const file = formData.get("file");
    
    if (!file || !(file instanceof File)) {
      console.error(`❌ No file provided in upload request for ${monthKey}`);
      return c.json({ error: "No file provided" }, 400);
    }

    console.log(`📁 File info: name=${file.name}, type=${file.type}, size=${file.size}`);

    // Get current media list
    const mediaKey = `summer2026_${monthKey}_media`;
    const currentMedia = await kv.get(mediaKey) || [];
    
    console.log(`📊 Current media count for ${monthKey}: ${Array.isArray(currentMedia) ? currentMedia.length : 0}`);
    
    // Check limit
    if (Array.isArray(currentMedia) && currentMedia.length >= 30) {
      console.log(`⚠️ Media limit reached for ${monthKey}`);
      return c.json({ error: "Maximum 30 files reached for this month" }, 400);
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${monthKey}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const fileBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(fileBuffer);

    console.log(`💾 Uploading to storage: ${fileName}`);

    // Determine content type
    let contentType = "application/octet-stream";
    if (file.type) {
      contentType = file.type;
    }

    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(fileName, uint8Array, {
        contentType,
        upsert: false,
      });

    if (error) {
      console.error("❌ Media upload error:", error);
      return c.json({ error: "Failed to upload file", details: error.message }, 500);
    }

    console.log(`✅ File uploaded to storage: ${fileName}`);

    // Get signed URL (valid for 10 years)
    const { data: urlData } = await supabase.storage
      .from(MEDIA_BUCKET)
      .createSignedUrl(fileName, 315360000); // 10 years

    if (!urlData) {
      console.error(`❌ Failed to create signed URL for ${fileName}`);
      return c.json({ error: "Failed to create signed URL" }, 500);
    }

    console.log(`🔗 Created signed URL for ${fileName}`);

    // Save media metadata
    const mediaItem = {
      id: fileName,
      url: urlData.signedUrl,
      type: file.type.startsWith('video/') ? 'video' : 'photo',
      uploadedAt: new Date().toISOString(),
    };

    const updatedMedia = Array.isArray(currentMedia) ? [...currentMedia, mediaItem] : [mediaItem];
    await kv.set(mediaKey, updatedMedia);

    console.log(`✅ Uploaded media for ${monthKey}: ${updatedMedia.length}/30`);

    return c.json({ 
      success: true, 
      media: mediaItem,
      count: updatedMedia.length
    });
  } catch (error) {
    console.error(`❌ Error uploading media:`, error);
    if (error instanceof Error) {
      console.error(`Error details: ${error.message}`, error.stack);
    }
    return c.json({ error: "Failed to upload media", details: String(error) }, 500);
  }
});

// Get media files for a month
app.get("/make-server-86e83646/month/:monthKey/media", async (c) => {
  try {
    const monthKey = c.req.param("monthKey");
    const mediaKey = `summer2026_${monthKey}_media`;
    const media = await kv.get(mediaKey) || [];
    
    return c.json({ media: Array.isArray(media) ? media : [] });
  } catch (error) {
    console.error(`Error getting media: ${error}`);
    return c.json({ error: "Failed to get media", details: String(error) }, 500);
  }
});

// Delete media file
app.delete("/make-server-86e83646/month/:monthKey/media/:fileId", async (c) => {
  try {
    const monthKey = c.req.param("monthKey");
    const fileId = c.req.param("fileId");
    
    const mediaKey = `summer2026_${monthKey}_media`;
    const currentMedia = await kv.get(mediaKey) || [];
    
    // Find and remove the file
    const updatedMedia = currentMedia.filter((item: any) => item.id !== fileId);
    
    // Delete from storage
    await supabase.storage.from(MEDIA_BUCKET).remove([fileId]);
    
    // Update KV
    await kv.set(mediaKey, updatedMedia);
    
    console.log(`✓ Deleted media ${fileId} from ${monthKey}`);
    
    return c.json({ success: true, count: updatedMedia.length });
  } catch (error) {
    console.error(`Error deleting media: ${error}`);
    return c.json({ error: "Failed to delete media", details: String(error) }, 500);
  }
});

// Upload song of the month
app.post("/make-server-86e83646/month/:monthKey/song", async (c) => {
  try {
    const monthKey = c.req.param("monthKey");
    console.log(`🎵 Song upload request for ${monthKey}`);
    
    const formData = await c.req.formData();
    const file = formData.get("song");
    
    if (!file || !(file instanceof File)) {
      console.error(`❌ No song file provided for ${monthKey}`);
      return c.json({ error: "No song file provided" }, 400);
    }

    console.log(`🎵 Song file info: name=${file.name}, type=${file.type}, size=${file.size}`);

    const fileName = `songs/${monthKey}-${Date.now()}.mp3`;
    const fileBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(fileBuffer);

    console.log(`💾 Uploading song to storage: ${fileName}`);

    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, uint8Array, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (error) {
      console.error("❌ Song upload error:", error);
      return c.json({ error: "Failed to upload song", details: error.message }, 500);
    }

    console.log(`✅ Song uploaded to storage: ${fileName}`);

    // Get signed URL (valid for 10 years)
    const { data: urlData } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(fileName, 315360000);

    if (!urlData) {
      console.error(`❌ Failed to create signed URL for song ${fileName}`);
      return c.json({ error: "Failed to create signed URL" }, 500);
    }

    console.log(`🔗 Created signed URL for song ${fileName}`);

    // Save song metadata
    const songKey = `summer2026_${monthKey}_song`;
    const songData = {
      url: urlData.signedUrl,
      name: file.name,
      uploadedAt: new Date().toISOString(),
    };
    
    await kv.set(songKey, songData);

    console.log(`✅ Uploaded song for ${monthKey}: ${file.name}`);

    return c.json({ success: true, song: songData });
  } catch (error) {
    console.error(`❌ Error uploading song:`, error);
    if (error instanceof Error) {
      console.error(`Error details: ${error.message}`, error.stack);
    }
    return c.json({ error: "Failed to upload song", details: String(error) }, 500);
  }
});

// Get song of the month
app.get("/make-server-86e83646/month/:monthKey/song", async (c) => {
  try {
    const monthKey = c.req.param("monthKey");
    const songKey = `summer2026_${monthKey}_song`;
    const song = await kv.get(songKey);
    
    return c.json({ song: song || null });
  } catch (error) {
    console.error(`Error getting song: ${error}`);
    return c.json({ error: "Failed to get song", details: String(error) }, 500);
  }
});

// Get all media from all months (for rewind page)
app.get("/make-server-86e83646/all-media", async (c) => {
  try {
    const months = ["may", "june", "july", "august", "september"];
    const allMedia: any[] = [];
    
    for (const month of months) {
      const mediaKey = `summer2026_${month}_media`;
      const media = await kv.get(mediaKey) || [];
      
      if (Array.isArray(media)) {
        media.forEach((item: any) => {
          allMedia.push({ ...item, month });
        });
      }
    }
    
    // Sort by upload date (newest first)
    allMedia.sort((a, b) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
    
    return c.json({ media: allMedia });
  } catch (error) {
    console.warn(`⚠️ Error getting all media (server may be starting):`, error instanceof Error ? error.message : String(error));
    return c.json({ media: [] }, 200); // Возвращаем пустой массив вместо ошибки
  }
});

// Get all media organized by month (for Locket widget)
app.get("/make-server-86e83646/media", async (c) => {
  try {
    const months = ["may", "june", "july", "august", "september"];
    const mediaByMonth: Record<string, any[]> = {};
    
    for (const month of months) {
      const mediaKey = `summer2026_${month}_media`;
      const media = await kv.get(mediaKey) || [];
      mediaByMonth[month] = Array.isArray(media) ? media : [];
    }
    
    return c.json(mediaByMonth);
  } catch (error) {
    console.warn(`⚠️ Error getting media by month (server may be starting):`, error instanceof Error ? error.message : String(error));
    return c.json({}, 200); // Возвращаем пустой объект вместо ошибки
  }
});

console.log("✅ Server routes configured successfully");

Deno.serve(app.fetch);