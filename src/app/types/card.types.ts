// src/app/types/card.types.ts
export type CardType = "credit" | "debit" | "prepaid";
export type CardBrand = "visa" | "mastercard" | "amex";
export type CardStatus = "active" | "pending" | "blocked" | "delivered" | "processing";
export type CardReason = "lost" | "stolen" | "damaged" | "expired" | "additional";

export interface Card {
  id: string;
  type: CardType;
  brand: CardBrand;
  lastFour: string;
  expiry: string;
  status: CardStatus;
  limit?: number;
  availableCredit?: number;
  isVirtual: boolean;
  isPhysical: boolean;
  issuedAt: string;
  deliveredAt?: string;
  reason?: CardReason;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: "standard" | "premium" | "metal";
  cards: Card[];
  balance: number;
}