# 🎯 Admin Panel Documentation

## Overview
Production-ready Admin Panel for GYM Hero fitness platform. Built with Next.js 15 App Router, TypeScript, Tailwind CSS, and Firebase.

## 🚀 Quick Start

### 1. Login to Admin Panel
```
URL: http://localhost:3000/admin
Phone: +7777777777 (or just 7777777777)
```

### 2. Seed Database (First Time)
```bash
npx tsx scripts/seed-admin.ts
```

This creates:
- ✅ 5 Sample Workouts
- ✅ 3 Sample Programs  
- ✅ 3 Sample Clans
- ✅ 3 Sample Users
- ✅ App Settings

### 3. Firebase Rules (Development)
Current rules are **OPEN** for development:
```javascript
match /{document=**} {
  allow read, write: if true;
}
```

⚠️ **Before Production**: Replace with `firestore.rules.backup` for proper auth.

## 📁 Admin Panel Structure

```
/admin                    → Dashboard (stats, quick actions, recent activity)
/admin/workouts           → Workouts list (CRUD complete)
/admin/workouts/new       → Create workout
/admin/workouts/[id]      → Edit workout
/admin/programs           → Programs list (TODO)
/admin/programs/[id]      → Program CRUD (TODO)
/admin/arena              → Clans management (TODO)
/admin/users              → User management (TODO)
/admin/settings           → App settings (TODO)
```

## 🎨 Design System

### Colors
- **Background**: slate-950, slate-900
- **Cards**: slate-900/50 with backdrop-blur-xl
- **Borders**: white/5, white/10
- **Accents**: blue-500 to purple-600 gradients
- **Success**: green-400
- **Warning**: yellow-400
- **Error**: red-400

### Responsive Breakpoints
```
Mobile:     default    → Full width, hamburger menu
Tablet:     768px+     → Show category column
Desktop:    1024px+    → Sidebar always visible
Wide:       1280px+    → Full table with all columns
```

### Components
- `AdminCard`: Container with glassmorphic background
- `EmptyState`: Beautiful empty states with CTA
- `LoadingSkeletons`: Animated loading placeholders
- `GradientButton`: Primary action button
- `WorkoutsTable`: Responsive table with publish toggle

## 🔥 Features Implemented

### ✅ Dashboard
- 4 Stat cards with live data
- Quick actions with working links
- Recent activity feed
- Latest workouts/programs preview

### ✅ Workouts CRUD
- **List**: Responsive table with filters
- **Create**: Full form with validation
- **Edit**: Pre-filled form with auto-slug
- **Publish**: Toggle published status
- **Delete**: Soft delete support
- **Search**: Client-side filtering (TODO)

### ✅ Mobile-First Design
- Hamburger menu for mobile
- Collapsible sidebar with overlay
- Responsive stat cards (2 cols → 4 cols)
- Adaptive table (hide columns on small screens)
- Touch-friendly buttons

## 🛠️ Technical Details

### Data Layer (`src/lib/firebase/admin/`)
```typescript
// workouts.ts
getWorkouts()                    // Fetch all
getWorkoutById(id)               // Fetch one
createWorkout(data)              // Create
updateWorkout(id, data)          // Update
deleteWorkout(id)                // Delete

// Same pattern for:
programs.ts, clans.ts, users.ts, settings.ts
```

### Types (`src/types/admin.ts`)
```typescript
Workout: 17 fields (title, slug, category, difficulty, etc.)
Program: 14 fields (title, level, durationWeeks, etc.)
Clan: 8 fields (name, memberCount, level, xp)
AdminUser: 7 fields (uid, role, xp, level)
AppSettings: 4 fields (appName, version, maintenance)
```

### Authentication
**Current**: localStorage-based (`admin-phone` key)
```typescript
Phone 7777777777 → localStorage → AdminGuard → /admin
Other phones → /hero/home
```

**Future**: Firebase Auth with phone verification
```typescript
signInWithPhoneNumber(phoneNumber)
  .then(confirmationResult)
  .then(verify code)
  .then(check role === 'admin')
```

## 📝 TODO List

### High Priority
- [ ] Programs CRUD pages (replicate workouts pattern)
- [ ] Arena/Clans management
- [ ] Users list with role management
- [ ] Settings page with app config

### Medium Priority
- [ ] Search & Filters (workouts, programs)
- [ ] Bulk actions (delete, publish)
- [ ] Image upload to Firebase Storage
- [ ] Video upload with progress
- [ ] Analytics dashboard with charts

### Low Priority
- [ ] Export data (CSV, JSON)
- [ ] Activity logs
- [ ] Notifications system
- [ ] Dark/Light theme toggle

## 🔐 Security Notes

### Development (Current)
- ✅ Open Firestore rules for fast iteration
- ✅ localStorage-based admin check
- ⚠️ No real authentication

### Production (Required)
1. **Enable Firebase Auth**: Phone verification
2. **Update Firestore Rules**: Role-based access
3. **Middleware**: Server-side auth check
4. **Environment Variables**: Secure API keys

## 🚢 Deployment Checklist

- [ ] Replace firestore.rules with secure version
- [ ] Implement Firebase Phone Auth
- [ ] Add server-side middleware protection
- [ ] Remove localStorage auth fallback
- [ ] Add rate limiting
- [ ] Enable Firebase App Check
- [ ] Set up monitoring (Sentry, Firebase Analytics)

## 🎓 Pattern: Adding New Section

Want to add `/admin/exercises` CRUD? Follow this pattern:

### 1. Define Type (`src/types/admin.ts`)
```typescript
export interface Exercise {
  id: string;
  name: string;
  // ...other fields
}
```

### 2. Create Data Layer (`src/lib/firebase/admin/exercises.ts`)
```typescript
export async function getExercises() {
  const snapshot = await db.collection('exercises').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
// + getById, create, update, delete
```

### 3. Create Pages
```
/app/admin/exercises/page.tsx        → List page
/app/admin/exercises/[id]/page.tsx   → Create/Edit form
```

### 4. Create Table Component
```
/components/admin/ExercisesTable.tsx → Reuse WorkoutsTable pattern
```

### 5. Add to Sidebar
```typescript
// AdminSidebar.tsx
{ icon: Activity, label: 'Exercises', href: '/admin/exercises' }
```

## 📞 Support

Issues? Questions?
- Check Firebase Console: https://console.firebase.google.com
- Review error logs in browser DevTools
- Run seed script if data missing: `npx tsx scripts/seed-admin.ts`

---

**Built with ❤️ by Senior Developer**
Last Updated: December 2025
