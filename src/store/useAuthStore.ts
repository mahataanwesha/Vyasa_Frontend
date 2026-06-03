import { create } from 'zustand';
import { authApi } from '../api/auth';
import type { User } from '../api/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signup: (userData: Omit<User, 'id'> & { password?: string }) => Promise<void>;
  login: (credentials: { email?: string; password?: string }) => Promise<void>;
  completeDoctorOnboarding: (profileData: any) => Promise<void>;
  completeHospitalOnboarding: (profileData: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.signup(userData);
      if (response.user) {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        set({
          user: response.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        throw new Error('User not found in response');
      }
    } catch (err: any) {
      set({ error: err.message || 'Registration failed', isLoading: false });
      throw err;
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(credentials);
      if (response.user) {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        set({
          user: response.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        throw new Error('User not found in response');
      }
    } catch (err: any) {
      set({ error: err.message || 'Login failed', isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authApi.logout();
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (err) {
      // Force clear state locally even if server logout request fails
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await authApi.getMe();
      if (response.user) {
        set({ user: response.user, isAuthenticated: true, isLoading: false });
      } else {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (err) {
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  completeDoctorOnboarding: async (profileData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.updateDoctorProfile(profileData);
      if (response.user) {
        set({
          user: response.user,
          isLoading: false,
        });
      } else {
        throw new Error('Onboarding synchronization failed on server.');
      }
    } catch (err: any) {
      set({ error: err.message || 'Onboarding failed', isLoading: false });
      throw err;
    }
  },

  completeHospitalOnboarding: async (profileData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.updateHospitalProfile(profileData);
      if (response.user) {
        set({
          user: response.user,
          isLoading: false,
        });
      } else {
        throw new Error('Hospital onboarding failed on server.');
      }
    } catch (err: any) {
      set({ error: err.message || 'Onboarding failed', isLoading: false });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));
