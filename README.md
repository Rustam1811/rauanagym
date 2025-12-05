# FitCoach - Production-Ready Fitness Web App

A complete, production-grade fitness coaching platform built with Next.js 14, TypeScript, Tailwind CSS, and Firebase.

## 🚀 Features

### User-Facing Features
- ✅ **Authentication** - Firebase email/password auth with protected routes
- ✅ **Onboarding Flow** - Goal and level selection with program assignment
- ✅ **Dashboard** - Personalized home with today's workout, stats, and stories
- ✅ **Instagram-Style Stories** - Swipeable fullscreen stories with auto-advance
- ✅ **Workout Player** - Video instructions, timers, rest periods, progress tracking
- ✅ **Gamification** - XP, levels, streaks, badges system
- ✅ **Profile** - Stats, achievements, current program, settings

### Admin/Coach Features
- ✅ **Admin Dashboard** - Overview of users, programs, workouts, sessions
- ✅ **Program Management** - Create/edit programs with goal and level targeting
- ✅ **Workout Management** - Build workouts with exercises and ordering
- ✅ **Exercise Library** - Video uploads, camera recording, thumbnails
- ✅ **Story Management** - Create timed stories for different user segments
- ✅ **User Management** - View user stats and progress

### Technical Features
- ✅ **Video Recording** - Browser-based camera recording with preview
- ✅ **Real-time Data** - Firebase Firestore with optimistic updates
- ✅ **Responsive Design** - Mobile-first with desktop support
- ✅ **Type Safety** - Full TypeScript coverage
- ✅ **Clean Architecture** - Separation of concerns, reusable components

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Enable Firebase Storage
5. Copy your Firebase config

### 3. Environment Variables

Update `.env.local` with your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## 📊 Architecture

### Folder Structure
- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable React components
- `/lib` - Firebase utilities and business logic
- `/types` - TypeScript interfaces
- `/contexts` - React contexts for state management

### Key Design Patterns
- Server Components for data fetching
- Client Components for interactivity
- Protected routes with AuthGuard
- Centralized Firebase operations
- Type-safe Firestore queries

## 🎮 Gamification System

- **XP System**: Earn XP for completing workouts
- **Levels**: Progress through 10 levels
- **Streaks**: Maintain daily workout streaks
- **Badges**: Unlock achievements for milestones

## 📱 User Flow

1. **Sign Up/Login** → Email/password authentication
2. **Onboarding** → Select goal and experience level
3. **Dashboard** → View today's workout and progress
4. **Start Workout** → Follow video instructions with timers
5. **Complete Workout** → Earn XP, maintain streak, unlock badges
6. **Profile** → View stats and achievements

## 🔐 Security

Configure Firestore and Storage security rules in Firebase Console.

Example Firestore rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /programs/{programId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    match /sessions/{sessionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 🚀 Deployment

Deploy to Vercel:

```bash
npm i -g vercel
vercel
```

## 📄 License

MIT

---

**Built with Next.js 14, TypeScript, Tailwind CSS, and Firebase**
