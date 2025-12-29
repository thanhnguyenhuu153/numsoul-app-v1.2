import { UserData, Language } from "../types";
import { encryptionService } from "./encryptionService";

const DATA_KEY = 'numsoul_secure_data';
const USAGE_KEY = 'numsoul_daily_usage';
const WEEKLY_USAGE_KEY = 'numsoul_weekly_usage';

interface DailyUsage {
  date: string; // YYYY-MM-DD
  count: number;
}

interface WeeklyUsage {
  week: number;
  year: number;
  profiles: string[];
}

export const storageService = {
  saveData: (data: UserData) => {
    try {
      const jsonStr = JSON.stringify(data);
      const encrypted = encryptionService.encrypt(jsonStr);
      localStorage.setItem(DATA_KEY, encrypted);
    } catch (e) {
      console.error("Failed to save secure data");
    }
  },

  loadData: (): UserData | null => {
    try {
      const encrypted = localStorage.getItem(DATA_KEY);
      if (!encrypted) return null;
      
      const decrypted = encryptionService.decrypt(encrypted);
      if (!decrypted) return null;

      return JSON.parse(decrypted);
    } catch (e) {
      return null;
    }
  },

  clearData: () => {
    localStorage.removeItem(DATA_KEY);
    localStorage.removeItem(USAGE_KEY);
    localStorage.removeItem(WEEKLY_USAGE_KEY);
  },
  
  getCurrentWeekNumber: () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime() + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return Math.ceil(day / 7);
  },

  getProfileId: (name: string, dob: string): string => {
    const clean = (name + dob).toLowerCase().replace(/\s/g, '');
    let hash = 0;
    for (let i = 0; i < clean.length; i++) {
      hash = ((hash << 5) - hash) + clean.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString();
  },

  // --- Daily Limit Logic ---
  
  getDailyUsage: (): number => {
    try {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const stored = localStorage.getItem(USAGE_KEY);
      
      if (stored) {
        const usage: DailyUsage = JSON.parse(stored);
        // If the date stored matches today, return count
        if (usage.date === today) {
          return usage.count;
        }
      }
      // If no data or new day, reset to 0
      return 0;
    } catch (e) {
      return 0;
    }
  },

  incrementDailyUsage: () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const currentCount = storageService.getDailyUsage();
      const newUsage: DailyUsage = {
        date: today,
        count: currentCount + 1
      };
      localStorage.setItem(USAGE_KEY, JSON.stringify(newUsage));
    } catch (e) {
      console.error("Failed to update usage");
    }
  },

  canDrawOracle: (): boolean => {
    const MAX_DAILY_LIMIT = 3;
    return storageService.getDailyUsage() < MAX_DAILY_LIMIT;
  },

  // --- Weekly Forecast Limit Logic ---

  canCallAPI: (profileId: string, isPremium: boolean): boolean => {
    if (isPremium) return true;
    
    try {
      const stored = localStorage.getItem(WEEKLY_USAGE_KEY);
      if (!stored) return true;

      const usage: WeeklyUsage = JSON.parse(stored);
      const currentWeek = storageService.getCurrentWeekNumber();
      const currentYear = new Date().getFullYear();

      // Reset if new week/year
      if (usage.week !== currentWeek || usage.year !== currentYear) {
        return true;
      }

      // Allow if this profile was already generated this week (allow re-fetch/language switch)
      if (usage.profiles.includes(profileId)) return true;
      
      // Limit to 1 unique profile per week for free tier
      const MAX_WEEKLY_PROFILES = 1;
      return usage.profiles.length < MAX_WEEKLY_PROFILES;
    } catch (e) {
      return true;
    }
  },

  trackUsage: (profileId: string) => {
    try {
      const currentWeek = storageService.getCurrentWeekNumber();
      const currentYear = new Date().getFullYear();
      let usage: WeeklyUsage = { week: currentWeek, year: currentYear, profiles: [] };

      const stored = localStorage.getItem(WEEKLY_USAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // If same week, use existing data
        if (parsed.week === currentWeek && parsed.year === currentYear) {
          usage = parsed;
        }
      }

      if (!usage.profiles.includes(profileId)) {
        usage.profiles.push(profileId);
        localStorage.setItem(WEEKLY_USAGE_KEY, JSON.stringify(usage));
      }
    } catch (e) {
      console.error("Failed to track weekly usage", e);
    }
  }
};