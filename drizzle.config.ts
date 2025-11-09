import { defineConfig } from "drizzle-kit";

/**
 * Drizzle ORM configuration for Vercel deployment
 * 
 * Environment Variables (required):
 * - DATABASE_URL: PostgreSQL connection string (e.g., from Neon, Supabase, or Vercel Postgres)
 *   Format: postgresql://user:password@host:port/database
 * 
 * For Vercel deployment:
 * 1. Add DATABASE_URL to your Vercel project environment variables
 * 2. Ensure your database allows connections from Vercel's IP ranges
 * 3. Use connection pooling for serverless functions (e.g., Neon serverless driver)
 */
if (!process.env.DATABASE_URL) {
  console.warn(
    "WARNING: DATABASE_URL environment variable is not set. " +
    "Database operations will fail. Please configure DATABASE_URL in your environment."
  );
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://placeholder:placeholder@localhost:5432/placeholder",
  },
});
