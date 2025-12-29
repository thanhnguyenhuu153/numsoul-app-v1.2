import { User } from "../types";

// Simulating a backend delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  loginWithGoogle: async (): Promise<User> => {
    await delay(1000); // Simulate network request
    // Mock: In a real app, you would fetch the 'tier' from your database
    return {
      id: 'g_12345',
      name: 'Google User',
      email: 'user@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Google+User&background=DB4437&color=fff',
      provider: 'google',
      tier: 'free'
    };
  },

  loginWithApple: async (): Promise<User> => {
    await delay(1000);
    return {
      id: 'a_67890',
      name: 'Apple User',
      email: 'user@icloud.com',
      avatar: 'https://ui-avatars.com/api/?name=Apple+User&background=000&color=fff',
      provider: 'apple',
      tier: 'free'
    };
  },

  loginWithEmail: async (email: string): Promise<User> => {
    await delay(1000);
    const name = email.split('@')[0];
    return {
      id: `e_${Date.now()}`,
      name: name,
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=6366f1&color=fff`,
      provider: 'email',
      tier: 'free'
    };
  },

  // Simulate upgrading a user
  upgradeUser: async (currentUser: User): Promise<User> => {
    await delay(1500); // Simulate payment processing
    const upgradedUser = { ...currentUser, tier: 'premium' as const };
    authService.saveSession(upgradedUser);
    return upgradedUser;
  },

  // Check if session exists in local storage
  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem('numio_user');
    return stored ? JSON.parse(stored) : null;
  },

  saveSession: (user: User) => {
    localStorage.setItem('numio_user', JSON.stringify(user));
  },

  logout: () => {
    localStorage.removeItem('numio_user');
  }
};