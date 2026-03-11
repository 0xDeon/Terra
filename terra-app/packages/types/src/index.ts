export interface User {
  id: string;
  walletAddress: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  createdAt: string;
}

export interface Creator {
  id: string;
  userId: string;
  category: string;
  subscriberCount: number;
  coinSymbol: string;
  verified: boolean;
}

export interface Coin {
  id: string;
  creatorId: string;
  symbol: string;
  name: string;
  totalSupply: number;
  currentPrice: number;
  marketCap: number;
}

export interface NFTAsset {
  id: string;
  creatorId: string;
  tokenId: string;
  metadataUri: string;
  name: string;
  description: string;
  mintedAt: string;
}

export interface ReputationBadge {
  id: string;
  userId: string;
  badgeType: string;
  tier: number;
  earnedAt: string;
}

export interface CommunityTier {
  id: string;
  creatorId: string;
  name: string;
  minCoinBalance: number;
  perks: string[];
}
