/**
 * Global State Management with Zustand
 * Replaces prop drilling and scattered useState
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'ru' | 'en';
  notifications: boolean;
  sound: boolean;
}

interface OnboardingState {
  completed: boolean;
  currentStep: number;
  goal?: 'fat_loss' | 'muscle_gain' | 'health' | 'strength' | 'endurance';
  level?: 'beginner' | 'intermediate' | 'advanced';
}

interface AppState {
  // User preferences
  preferences: UserPreferences;
  setPreferences: (preferences: Partial<UserPreferences>) => void;

  // Onboarding
  onboarding: OnboardingState;
  setOnboardingStep: (step: number) => void;
  setOnboardingGoal: (goal: OnboardingState['goal']) => void;
  setOnboardingLevel: (level: OnboardingState['level']) => void;
  completeOnboarding: () => void;

  // UI State
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Active workout session
  activeWorkoutId: string | null;
  setActiveWorkout: (id: string | null) => void;

  // Network status
  isOnline: boolean;
  setOnlineStatus: (status: boolean) => void;

  // Reset all state
  reset: () => void;
}

const initialState = {
  preferences: {
    theme: 'light' as const,
    language: 'ru' as const,
    notifications: true,
    sound: true,
  },
  onboarding: {
    completed: false,
    currentStep: 0,
  },
  sidebarOpen: false,
  activeWorkoutId: null,
  isOnline: true,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      // Preferences
      setPreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),

      // Onboarding
      setOnboardingStep: (step) =>
        set((state) => ({
          onboarding: { ...state.onboarding, currentStep: step },
        })),

      setOnboardingGoal: (goal) =>
        set((state) => ({
          onboarding: { ...state.onboarding, goal },
        })),

      setOnboardingLevel: (level) =>
        set((state) => ({
          onboarding: { ...state.onboarding, level },
        })),

      completeOnboarding: () =>
        set((state) => ({
          onboarding: { ...state.onboarding, completed: true },
        })),

      // UI
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Workout
      setActiveWorkout: (id) => set({ activeWorkoutId: id }),

      // Network
      setOnlineStatus: (status) => set({ isOnline: status }),

      // Reset
      reset: () => set(initialState),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        preferences: state.preferences,
        onboarding: state.onboarding,
      }),
    }
  )
);
