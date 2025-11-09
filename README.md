# Vertigo - Solana NFT Platform

A full-stack web application for managing Solana NFTs, built with React, Express, and PostgreSQL.

## Architecture Overview

This application consists of two main parts:

1. **Frontend (Client)**: React application built with Vite
2. **Backend (Server)**: Express.js API server with WebSocket support

## Deployment Guide

### Vercel Deployment (Frontend Only)

Vercel can host the static frontend, but **the Express backend requires separate hosting** as Vercel's serverless functions don't support long-running processes or WebSocket connections.

#### Frontend Deployment to Vercel

1. **Connect Repository**
   - Log in to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

2. **Configure Build Settings**
   - Framework Preset: `Vite`
   - Build Command: `npm run build` (or leave default)
   - Output Directory: `dist/public`
   - Install Command: `npm install`

3. **Environment Variables**
   Add the following to your Vercel project (Settings > Environment Variables):
   
   **Required:**
   - `DATABASE_URL`: PostgreSQL connection string (use Neon, Supabase, or Vercel Postgres)
   - `SESSION_SECRET`: Generate with `openssl rand -base64 32`
   - `ADMIN_WALLETS`: Comma-separated Solana wallet addresses
   - `SOLANA_ENV`: `devnet` or `mainnet`
   - `METAPLEX_ADMIN_KEYPAIR_PATH`: Path to admin keypair file
   
   **Optional:**
   - `SOLANA_RPC_URL`: Custom RPC endpoint
   - `SOLANA_HELIUS_API_KEY`: For mainnet (get from https://helius.dev)
   - `PORT`: Default is 5000 (ignored by Vercel)

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your frontend

#### Backend Deployment (Required)

The Express server must be hosted separately. Recommended options:

**Option 1: Railway**
1. Create account at [Railway](https://railway.app)
2. Create new project from GitHub repo
3. Add environment variables (same as above)
4. Railway will auto-detect and deploy the Express app

**Option 2: Render**
1. Create account at [Render](https://render.com)
2. Create new Web Service from GitHub repo
3. Build Command: `npm install && npm run build`
4. Start Command: `npm run start`
5. Add environment variables

**Option 3: Digital Ocean App Platform**
1. Create account at [Digital Ocean](https://digitalocean.com)
2. Create new App from GitHub repo
3. Configure build and start commands
4. Add environment variables

**Option 4: Fly.io**
1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Login: `fly auth login`
3. Initialize: `fly launch`
4. Deploy: `fly deploy`

### Database Setup

#### Using Neon (Recommended for Vercel)

1. Create account at [Neon](https://neon.tech)
2. Create new project and database
3. Copy connection string (it includes connection pooling by default)
4. Add as `DATABASE_URL` environment variable
5. Run migrations: `npm run db:push`

**Why Neon?**
- Built for serverless environments
- Connection pooling included
- Compatible with `@neondatabase/serverless` driver (already in dependencies)
- Free tier available

#### Using Vercel Postgres

1. In Vercel dashboard, go to Storage tab
2. Create new Postgres database
3. Connection string is automatically added to environment variables
4. Run migrations: `npm run db:push`

#### Using Supabase

1. Create account at [Supabase](https://supabase.com)
2. Create new project
3. Go to Settings > Database
4. Copy connection string (use "Session mode" for connection pooling)
5. Add as `DATABASE_URL` environment variable

### API Routes and Serverless Considerations

**Current Architecture:**
- Backend uses Express.js with session management, WebSocket support, and file uploads
- Not compatible with Vercel's serverless functions (which have execution time limits and no persistent connections)

**Migration Options:**

If you need to use Vercel exclusively, consider:

1. **Move to Next.js API Routes** (Major Refactor)
   - Replace Express routes with Next.js API routes in `/api` directory
   - Use external WebSocket service (e.g., Pusher, Ably)
   - Use Vercel Blob for file uploads
   - Use Vercel KV or external Redis for sessions

2. **Keep Current Architecture** (Recommended)
   - Deploy frontend to Vercel
   - Deploy backend to Railway/Render/etc
   - Update frontend API URLs to point to backend deployment
   - Both services can use same Neon database

## Local Development

### Prerequisites

- Node.js 20+ 
- PostgreSQL database (local or cloud)
- npm or yarn

### Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/OrdinalDragons/Vertigo.git
   cd Vertigo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Access application**
   - Open http://localhost:5000

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build frontend and backend for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Wouter** - Routing
- **TanStack Query** - Data fetching
- **Radix UI** - Accessible components
- **Framer Motion** - Animations

### Backend
- **Express** - Web framework
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database (via Neon serverless driver)
- **Passport.js** - Authentication
- **Multer** - File uploads
- **WebSocket (ws)** - Real-time communication

### Blockchain
- **Solana Web3.js** - Solana blockchain interaction
- **Metaplex** - NFT metadata and token standards
- **SPL Token** - Token program interactions

## Environment Variables Reference

See `.env.example` for complete documentation.

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `SESSION_SECRET` | Session encryption key | Generate with `openssl rand -base64 32` |
| `ADMIN_WALLETS` | Admin wallet addresses (comma-separated) | `Wallet111...,Wallet222...` |
| `SOLANA_ENV` | Solana network | `devnet` or `mainnet` |
| `METAPLEX_ADMIN_KEYPAIR_PATH` | Path to NFT minting keypair | `./secrets/metaplex-admin.json` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SOLANA_RPC_URL` | Custom RPC endpoint | Solana default endpoints |
| `SOLANA_HELIUS_API_KEY` | Helius API key for mainnet | N/A |
| `PORT` | Server port | `5000` |

## Security Notes

1. **Never commit secrets** - Use environment variables for all sensitive data
2. **Secure keypairs** - Store Metaplex admin keypair securely, never in repository
3. **Database access** - Ensure database allows connections from deployment platform
4. **Session secret** - Use strong, randomly generated session secrets in production
5. **Admin wallets** - Verify wallet addresses before adding to ADMIN_WALLETS

## Database Connection Pooling

This application uses `@neondatabase/serverless` which provides:
- Connection pooling for serverless environments
- WebSocket-based connections (works around serverless limitations)
- Automatic connection management

For other PostgreSQL providers, ensure connection pooling is enabled.

## Troubleshooting

### Build fails on Vercel
- Check that all environment variables are set
- Verify `DATABASE_URL` is accessible from Vercel
- Check build logs for missing dependencies

### Backend won't start
- Verify `DATABASE_URL` is correct and accessible
- Check that `PORT` is available
- Ensure `SESSION_SECRET` is set

### Database connection errors
- Check DATABASE_URL format
- Verify database allows connections from deployment IP
- For Neon, ensure you're using the pooled connection string
- Check firewall rules

### NFT minting fails
- Verify `METAPLEX_ADMIN_KEYPAIR_PATH` is correct
- Ensure admin wallet has sufficient SOL
- Check Solana network status (devnet/mainnet)
- Verify RPC endpoint is responding

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review deployment logs for errors
