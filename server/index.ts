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
  app.use(express.static(path.join(__dirname, '../public'), {
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
  app.get('*', (_req: Request, res: Response) => {
    // Static file serving - in production, consider:
    // 1. Using a CDN for better performance
    // 2. Implementing rate limiting to prevent abuse
    // 3. Adding proper caching headers
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

