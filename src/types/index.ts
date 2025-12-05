// Firestore data models

export type UserGoal = 'fat_loss' | 'muscle_gain' | 'health' | 'strength' | 'endurance';
export type UserLevel = 'beginner' | 'intermediate' | 'advanced';
export type SubscriptionTier = 'free' | 'plus';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: 'user' | 'admin';
  goal?: UserGoal;
  level: number; // Changed from UserLevel to number for XP system
  experienceLevel?: UserLevel; // Renamed old level to experienceLevel
  currentProgramId?: string;
  subscription: SubscriptionTier;
  isPremium?: boolean;
  
  // Gamification
  xp: number; // Current XP in level
  totalXP: number; // Total XP earned
  streak: number; // Current streak
  longestStreak?: number; // Longest streak ever
  
  // Statistics
  totalWorkouts: number; // Renamed from totalWorkoutsCompleted
  totalCalories: number;
  totalMinutes: number;
  
  badges: string[];
  goals?: string[];
  
  // Timestamps
  createdAt: Date;
  updatedAt?: Date;
  lastWorkoutDate?: Date;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  level: UserLevel;
  goal: UserGoal;
  durationWeeks: number;
  workoutsPerWeek: number;
  isPremium: boolean;
  workoutIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Workout {
  id: string;
  programId: string;
  dayIndex: number; // Day 1, 2, 3 etc.
  title: string;
  description: string;
  exerciseIds: string[];
  estimatedDurationMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ExerciseType = 'time' | 'reps';

export interface Exercise {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  type: ExerciseType;
  targetTimeSeconds?: number; // For time-based exercises
  targetReps?: number; // For rep-based exercises
  muscleGroup: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SessionStatus = 'completed' | 'in_progress' | 'aborted';

export interface CompletedExercise {
  exerciseId: string;
  completedAt: Date;
  actualTimeSeconds?: number;
  actualReps?: number;
}

export interface Session {
  id: string;
  userId: string;
  programId?: string;
  workoutId: string;
  startedAt: Date;
  finishedAt?: Date;
  status: SessionStatus;
  completedExercises: CompletedExercise[] | string[]; // Support both formats
  earnedXp: number;
  duration?: number; // in minutes
  caloriesBurned?: number;
}

export type StoryType = 'video' | 'image';
export type StorySegment = 'all' | 'premium' | 'beginners' | 'intermediate' | 'advanced';

export interface Story {
  id: string;
  type: StoryType;
  mediaUrl: string;
  thumbnailUrl?: string;
  title: string;
  order: number;
  segment: StorySegment;
  createdAt: Date;
  expiresAt?: Date;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
  requirement: string;
}

// UI state types
export interface UserProgress {
  weekNumber: number;
  daysCompleted: number;
  totalDays: number;
  currentLevel: number;
  xpToNextLevel: number;
}

// Form types
export interface OnboardingData {
  goal: UserGoal;
  level: UserLevel;
}

export interface ProgramFormData {
  title: string;
  description: string;
  level: UserLevel;
  goal: UserGoal;
  durationWeeks: number;
  isPremium: boolean;
}

export interface WorkoutFormData {
  programId: string;
  dayIndex: number;
  title: string;
  description: string;
  estimatedDurationMinutes: number;
}

export interface ExerciseFormData {
  title: string;
  description: string;
  type: ExerciseType;
  targetTimeSeconds?: number;
  targetReps?: number;
  muscleGroup: string;
}

export interface StoryFormData {
  type: StoryType;
  title: string;
  segment: StorySegment;
  order: number;
}
