# Collectiblez - Solana NFT Raffle Platform

## Overview
Collectiblez is a full-stack NFT raffle platform on Solana, inspired by NBA Top Shot. Its core purpose is to facilitate NFT raffles with DRAGON SPL token integration for entries and a comprehensive marketplace for NFT trading. The platform aims to provide a secure, engaging, and high-performance environment for digital collectible enthusiasts, featuring a unique holographic UI and robust backend systems.

## User Preferences
I prefer detailed explanations.
I want iterative development.
Ask before making major changes.
Do not make changes to the folder `shared/`.
Do not make changes to the file `server/seed.ts`.
I prefer simple language.

## System Architecture

### UI/UX Decisions
The platform features an NBA Top Shot-inspired holographic UI with cosmic gradients and shimmer effects. It uses a dark cosmic theme with a primary purple/blue holographic gradient and cyan/teal accents. Typography includes Space Grotesk for display and Inter for body text. Custom components, built on shadcn/ui primitives, feature gradient borders, glow effects, and animated countdowns.

### Technical Implementations
- **Frontend:** React, TypeScript, Vite, TailwindCSS, shadcn/ui, TanStack Query for state management, Wouter for routing.
- **Backend:** Node.js, Express, TypeScript, with an in-memory storage implementation ready for PostgreSQL migration.
- **Database:** PostgreSQL (Neon) with Drizzle ORM for schema definition and Zod for validation.
- **Solana Integration:** Designed for DRAGON SPL token integration (Mint: `LdC8eFrB6idSmbpZCkSi8DFateB8vjhv2H2r8Epindi`) for raffle entries and marketplace transactions. Solana environment configuration supports both Devnet and Mainnet (with Helius RPC).

### Feature Specifications
- **Raffle System:** Supports creating raffles, user entry, winner selection, and prize distribution.
- **Marketplace:** Enables NFT trading.
- **Admin Dashboard:** Provides tools for raffle management and analytics, including NFT minting.
- **Authentication (Planned):** Integration with Privy for wallet authentication and JWT-based session management.
- **Blockchain Interaction:** Solana transaction signing for entries, on-chain verification of DRAGON token transfers, and cryptographically secure winner selection using blockhashes via the deployed Anchor raffle program (ID: `BYhrkv1yPFJrtyKbL5UBF2GvabQw3His9tF5AV2JgzRy`).

### System Design Choices
- **Modular Structure:** Organized into `client/`, `server/`, `shared/`, and `db/` for clear separation of concerns.
- **Type Safety:** Extensive use of TypeScript, Drizzle ORM, and Zod for end-to-end type safety and validation.
- **Scalability:** Designed with a robust PostgreSQL schema, anticipating future growth and feature expansion.
- **Development Workflow:** Uses `npm` scripts for development and relies on environment variables for configuration.
- **Anchor Raffle Program:** Includes a complete on-chain raffle program built with Anchor Framework, providing secure, trustless NFT raffles with DRAGON SPL token integration. The program handles NFT escrow, DRAGON token entry payments, and cryptographically secure winner selection using Solana blockhashes.

## External Dependencies

- **PostgreSQL (Neon):** Primary database for persistent storage.
- **Privy:** Planned for wallet authentication and user management.
- **Solana Blockchain:** Core platform for NFT raffles and DRAGON token transactions.
- **Helius RPC:** Recommended for Mainnet Solana RPC connection.
- **Metaplex Foundation SDK:** Used for fetching NFT metadata and minting.
- **Vite:** Frontend build tool.
- **TanStack Query:** Data fetching and state management for the frontend.
- **shadcn/ui:** UI component library primitives.
- **Express:** Backend web framework.
- **Anchor Framework:** Used for building the on-chain Solana raffle program.