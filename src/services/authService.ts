import { User } from "../types";
import { auth, googleProvider } from "./firebaseConfig";

export const authService = {
  loginWithGoogle: async (): Promise<User | null> => {
    try {
      if (!auth || !googleProvider) {
        alert("Lỗi kết nối: Chưa tìm thấy cấu hình Firebase. Hãy kiểm tra file .env");
        console.error("Firebase auth is null. Check your VITE_FIREBASE_* env variables.");
        return null;
      }

      // 1. Trigger Google Popup
      const result = await auth.signInWithPopup(googleProvider);
      const fbUser = result.user;
      
      if (!fbUser) return null;

      // 2. Map Firebase User to App User
      const user: User = {
        id: fbUser.uid,
        name: fbUser.displayName || 'User',
        email: fbUser.email || '',
        avatar: fbUser.photoURL || `https://ui-avatars.com/api/?name=${fbUser.displayName || 'U'}&background=random`,
        provider: 'google',
        tier: 'free' // In a real app, fetch this from your Database (Firestore)
      };

      // 3. Save session
      authService.saveSession(user);
      return user;
    } catch (error: any) {
      console.error("Google Login Error:", error);
      if (error?.code === 'auth/popup-closed-by-user') {
        return null; // Ignore if user closed popup
      }
      alert(`Đăng nhập thất bại: ${error.message}`);
      return null;
    }
  },

  loginWithApple: async (): Promise<User | null> => {
    alert("Tính năng đăng nhập Apple đang phát triển. Vui lòng dùng Google.");
    return null;
  },

  loginWithEmail: async (email: string): Promise<User | null> => {
     alert("Hệ thống khuyến khích sử dụng Google Login để bảo mật tốt nhất.");
     return null;
  },

  // Simulate payment
  upgradeUser: async (currentUser: User): Promise<User> => {
    const upgradedUser = { ...currentUser, tier: 'premium' as const };
    authService.saveSession(upgradedUser);
    return upgradedUser;
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem('numio_user');
    return stored ? JSON.parse(stored) : null;
  },

  saveSession: (user: User) => {
    localStorage.setItem('numio_user', JSON.stringify(user));
  },

  logout: async () => {
    try {
      if (auth) await auth.signOut();
    } catch (e) {
      console.error("Logout error", e);
    }
    localStorage.removeItem('numio_user');
  }
};