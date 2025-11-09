// Shared types and utilities
export interface User {
  id: string;
  walletAddress: string;
  createdAt: Date;
}

export interface Raffle {
  id: string;
  title: string;
  description: string;
  entryPrice: number;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
}

export interface RaffleEntry {
  id: string;
  raffleId: string;
  userId: string;
  entryCount: number;
  createdAt: Date;
}
