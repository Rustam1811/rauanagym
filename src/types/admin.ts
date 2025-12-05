// src/types/admin.ts

export type WorkoutDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type WorkoutCategory = 'strength' | 'cardio' | 'yoga' | 'mobility' | 'hiit' | 'other';

export interface Workout {
  id: string;
  title: string;
  slug: string;
  category: WorkoutCategory;
  difficulty: WorkoutDifficulty;
  durationMinutes: number;
  calories: number;
  xp: number;
  tags: string[];
  coverImageUrl: string;
  isRecommended: boolean;
  isPublished: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export type ProgramLevel = 'beginner' | 'intermediate' | 'advanced';
export type ProgramStatus = 'draft' | 'active' | 'archived';

export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: ProgramLevel;
  weeks: number; // Duration in weeks
  workoutsPerWeek: number;
  durationDays: number;
  durationWeeks: number;
  totalWorkouts: number;
  imageUrl: string; // Cover image
  coverImageUrl: string;
  isPremium: boolean;
  isPublished: boolean;
  status: ProgramStatus;
  workoutIds: string[]; // workout ids ordered
  workouts: string[]; // workout ids ordered (alias)
  tags: string[]; // Program tags
  createdAt: string;
  updatedAt: string;
}

export interface Clan {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  membersCount: number;
  minLevel: number;
  isOpen: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'user' | 'coach' | 'admin';

export interface AdminUser {
  id: string; // uid
  displayName: string;
  email: string;
  role: UserRole;
  xp: number;
  streak: number;
  activeProgramId?: string | null;
  createdAt: string;
}

export interface AppSettings {
  id: 'app';
  defaultXPPerWorkout: number;
  defaultCaloriesPerMinute: number;
  featureToggles: {
    enableArena: boolean;
    enablePrograms: boolean;
    enablePremium: boolean;
  };
  updatedAt: string;
}
