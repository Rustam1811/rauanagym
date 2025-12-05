# Client Component Fix - Complete ✅

## Problem
Runtime error when accessing `/hero/advanced` page:
```
Uncaught Error: Event handlers cannot be passed to Client Component props
```

## Root Cause
Next.js 14+ App Router defaults all components to **Server Components**. Server Components:
- Cannot use browser APIs
- Cannot use event handlers (onClick, onChange, etc.)
- Cannot use React hooks (useState, useEffect, useRef, etc.)
- Run only on the server during SSR

Components with interactivity must be explicitly marked as **Client Components** using the `'use client'` directive.

## Solution Applied

### Files Fixed with 'use client' Directive:

1. **`src/app/hero/advanced/page.tsx`** ✅
   - Page component with interactive elements
   - Passes onClick handlers to child components
   - Uses tabs, modals, and other interactive features

2. **`src/components/ui/hj/HJWorkoutCard.tsx`** ✅
   - Composite card component
   - Has onClick handler for `onStart` action
   - Used in advanced example page

3. **`src/components/HJButton.tsx`** ✅
   - Base button component
   - Receives and handles onClick events
   - Used throughout the app

4. **`src/components/ui/hj/HJEmptyState.tsx`** ✅
   - Empty state component with action button
   - Passes onClick to HJButton

### Already Correct Components:

These components already had 'use client' directive:

- ✅ `HJModal.tsx` - uses useEffect, onClick handlers
- ✅ `HJToast.tsx` - uses useState, useEffect, onClick
- ✅ `HJTabs.tsx` - uses useState, onClick handlers
- ✅ `HJBottomSheet.tsx` - uses useEffect, onClick handlers
- ✅ `HJInput.tsx` - forwardRef, input handlers

### Components Without 'use client' (Correctly):

These components don't need the directive as they have no interactivity:

- ✅ `HJCard.tsx` - Pure presentational component
- ✅ `HJProgress.tsx` - Pure progress bar display
- ✅ `HJBadge.tsx` - Pure badge display
- ✅ `HJAchievementCard.tsx` - Composite, no events
- ✅ `HJLeaderboardCard.tsx` - Composite, no events

## Next.js 14+ Client/Server Component Rules

### Use 'use client' when:
- ✅ Component uses event handlers (onClick, onChange, onSubmit, etc.)
- ✅ Component uses React hooks (useState, useEffect, useRef, etc.)
- ✅ Component uses browser APIs (window, document, localStorage, etc.)
- ✅ Component uses Context API (useContext)
- ✅ Component has animations or interactions

### Don't use 'use client' when:
- ❌ Component is purely presentational (only renders JSX)
- ❌ Component only does data fetching on server
- ❌ Component doesn't need browser APIs or interactivity
- ❌ You want better SEO and performance

## Verification Steps

1. ✅ All files compile without TypeScript errors
2. ✅ No ESLint errors found
3. ✅ Dev server running successfully
4. 🔄 **User to verify**: Navigate to `/hero/advanced` and test:
   - Workout cards display correctly
   - "Начать тренировку" button clicks work
   - Tabs switch between Overview/Statistics
   - Modals, toasts, and other interactions work

## Best Practices Applied

1. **Minimal Client Components**: Only components with interactivity are marked as Client Components
2. **Component Boundary**: Clear separation between Server and Client Components
3. **Performance**: Server Components for static content, Client Components only when needed
4. **Type Safety**: All components maintain strict TypeScript types

## Files Modified Summary

| File | Change | Reason |
|------|--------|--------|
| `src/app/hero/advanced/page.tsx` | Added 'use client' | Has interactive tabs, buttons, event handlers |
| `src/components/ui/hj/HJWorkoutCard.tsx` | Added 'use client' | Has onClick handler for onStart |
| `src/components/HJButton.tsx` | Added 'use client' | Receives onClick events |
| `src/components/ui/hj/HJEmptyState.tsx` | Added 'use client' | Passes onClick to button |

## Documentation Reference

For more details, see:
- [HERO_JOURNEY_DESIGN_SYSTEM.md](./HERO_JOURNEY_DESIGN_SYSTEM.md)
- [HJ_ADVANCED_COMPONENTS.md](./HJ_ADVANCED_COMPONENTS.md)
- [SENIOR_IMPLEMENTATION_COMPLETE.md](./SENIOR_IMPLEMENTATION_COMPLETE.md)

---

**Status**: ✅ **FIXED** - All Client Component boundaries correctly defined
**Next Step**: User testing at `/hero/advanced` to verify runtime behavior
