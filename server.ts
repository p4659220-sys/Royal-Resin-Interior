import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Ensure persistent directories exist on server
  const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
  const DATA_DIR = path.join(process.cwd(), 'data');
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Serve uploaded images statically with caching
  app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '30d' }));

  // ==========================================
  // PERMANENT IMAGE UPLOAD & MEDIA VAULT API
  // ==========================================
  
  // 1. Upload Image to Permanent Server Storage
  app.post("/api/upload", (req, res) => {
    try {
      const { image, name, category } = req.body;
      if (!image) {
        return res.status(400).json({ error: "No image provided" });
      }

      // Check base64 format
      let extension = 'jpg';
      let base64Data = image;
      const matches = image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const mimeSubtype = matches[1].toLowerCase();
        if (mimeSubtype.includes('png')) extension = 'png';
        else if (mimeSubtype.includes('webp')) extension = 'webp';
        else if (mimeSubtype.includes('svg')) extension = 'svg';
        else extension = 'jpg';
        base64Data = matches[2];
      } else if (image.includes('base64,')) {
        base64Data = image.split('base64,')[1];
      }

      const buffer = Buffer.from(base64Data, 'base64');
      const safeName = (name || 'photo').replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
      const filename = `media_${Date.now()}_${safeName.slice(0, 15)}.${extension}`;
      const filepath = path.join(UPLOADS_DIR, filename);

      fs.writeFileSync(filepath, buffer);
      const publicUrl = `/uploads/${filename}`;

      // Save record in data/media_vault.json
      const mediaVaultFile = path.join(DATA_DIR, 'media_vault.json');
      let vault: any[] = [];
      if (fs.existsSync(mediaVaultFile)) {
        try {
          vault = JSON.parse(fs.readFileSync(mediaVaultFile, 'utf8'));
        } catch (e) {
          vault = [];
        }
      }

      const newMediaItem = {
        id: `media-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
        name: name || filename,
        url: publicUrl,
        category: category || 'General',
        sizeBytes: buffer.length,
        uploadedAt: new Date().toISOString()
      };

      vault.unshift(newMediaItem);
      fs.writeFileSync(mediaVaultFile, JSON.stringify(vault, null, 2), 'utf8');

      console.log(`[Media Vault] Saved permanent image: ${publicUrl} (${buffer.length} bytes)`);

      res.json({
        success: true,
        url: publicUrl,
        media: newMediaItem
      });
    } catch (err: any) {
      console.error("[Media Vault] Upload error:", err);
      res.status(500).json({ error: err.message || "Failed to save image" });
    }
  });

  // 2. Get list of all images in central media vault
  app.get("/api/media", (req, res) => {
    try {
      const mediaVaultFile = path.join(DATA_DIR, 'media_vault.json');
      if (fs.existsSync(mediaVaultFile)) {
        const vault = JSON.parse(fs.readFileSync(mediaVaultFile, 'utf8'));
        return res.json({ success: true, media: vault });
      }
      res.json({ success: true, media: [] });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 3. Delete an image from media vault (explicit user action)
  app.delete("/api/media/:id", (req, res) => {
    try {
      const { id } = req.params;
      const queryUrl = (req.query.url as string) || '';
      const mediaVaultFile = path.join(DATA_DIR, 'media_vault.json');
      if (fs.existsSync(mediaVaultFile)) {
        let vault = JSON.parse(fs.readFileSync(mediaVaultFile, 'utf8'));
        
        // Find matching items by id, direct url, or filename
        const targetItems = vault.filter((m: any) => 
          m.id === id || 
          (queryUrl && m.url === queryUrl) || 
          m.url === id || 
          (m.url && m.url.includes(id))
        );

        for (const item of targetItems) {
          if (item && item.url && item.url.startsWith('/uploads/')) {
            const cleanPath = item.url.startsWith('/') ? item.url.slice(1) : item.url;
            const diskPath = path.join(process.cwd(), cleanPath);
            if (fs.existsSync(diskPath)) {
              try { 
                fs.unlinkSync(diskPath); 
                console.log(`[Media Vault] Deleted disk file: ${diskPath}`);
              } catch (e) {
                console.warn('[Media Vault] Unlink error:', e);
              }
            }
          }
        }

        vault = vault.filter((m: any) => 
          m.id !== id && 
          (!queryUrl || m.url !== queryUrl) && 
          m.url !== id &&
          (!m.url || !m.url.includes(id))
        );
        fs.writeFileSync(mediaVaultFile, JSON.stringify(vault, null, 2), 'utf8');
        console.log(`[Media Vault] Deleted item ${id}. Remaining: ${vault.length}`);
      }
      res.json({ success: true, message: "Media deleted successfully" });
    } catch (err: any) {
      console.error("[Media Vault] Delete error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // 4. Save entire database state to server disk
  app.post("/api/store", (req, res) => {
    try {
      const storeFile = path.join(DATA_DIR, 'database.json');
      fs.writeFileSync(storeFile, JSON.stringify(req.body, null, 2), 'utf8');
      res.json({ success: true, message: "Server database synchronized" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 5. Read entire database state from server disk
  app.get("/api/store", (req, res) => {
    try {
      const storeFile = path.join(DATA_DIR, 'database.json');
      if (fs.existsSync(storeFile)) {
        const data = JSON.parse(fs.readFileSync(storeFile, 'utf8'));
        return res.json({ success: true, data });
      }
      res.json({ success: false, message: "No database on server yet" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // API endpoints supporting multipart/form-data and JSON submissions
  app.post("/api/bookings", (req, res) => {
    console.log("[Server API] Received site visit booking submission");
    res.json({ 
      success: true, 
      message: "Site visit booking received successfully", 
      bookingId: `BK-${Math.floor(1000 + Math.random() * 9000)}` 
    });
  });

  app.post("/api/enquiries", (req, res) => {
    console.log("[Server API] Received project enquiry submission");
    res.json({ 
      success: true, 
      message: "Project enquiry received successfully", 
      enquiryId: `ENQ-${Math.floor(1000 + Math.random() * 9000)}` 
    });
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
