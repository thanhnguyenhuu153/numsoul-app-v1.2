export enum Language {
  EN = 'en',
  VI = 'vi'
}

export type SubscriptionTier = 'free' | 'premium';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'apple' | 'email';
  tier: SubscriptionTier;
}

export interface UserProfile {
  fullName: string;
  birthDate: string; // YYYY-MM-DD
}

export interface WeeklyForecast {
  weekNumber: number;
  year: number;
  content: string;
  lastUpdated: number; // Timestamp
  lang: Language; // Track language of content
}

export interface UserData {
  profile: UserProfile | null;
  report: NumerologyReport | null;
  overviewReading: string;
  pinnaclesReading?: string; // Added separate field for pinnacles
  yearForecastReading: string;
  weeklyForecast: WeeklyForecast | null;
}

export interface NumerologyReport {
  lifePathNumber: number;
  destinyNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  personalYear: number;
  birthChart: number[]; // Array of numbers present in birth date
  pinnacles: {
    first: number;
    second: number;
    third: number;
    fourth: number;
    challenge?: number;
  };
  pinnacleYears: {
    first: number;
    second: number;
    third: number;
    fourth: number;
  };
}

export interface OracleCard {
  number: number;
  name: Record<Language, string>;
  keywords: Record<Language, string[]>;
}

export type Tab = 'home' | 'report' | 'forecast' | 'oracle';