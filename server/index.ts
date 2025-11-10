import express, { type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Performance: Serve static files with caching in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1y',
    immutable: true,
  }));
}

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Serve React app in production
// TODO: Add rate limiting middleware before production deployment
// See PERFORMANCE.md for express-rate-limit implementation
// Example: app.use(rateLimit({ windowMs: 60000, max: 60 }))
if (process.env.NODE_ENV === 'production') {
  // Fallback handler for SPA routing - serves index.html for client-side routes
  app.use((req: Request, res: Response) => {
    // Skip API routes - they should return 404 if not found
    if (req.url.startsWith('/api')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    // Serve index.html for all other routes (SPA client-side routing)
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

