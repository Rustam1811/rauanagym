# Hero Journey Design System

A comprehensive, production-ready design system for the fitness app with consistent visual language, modern aesthetics, and reusable components.

## 🎨 Design Tokens

All design values are centralized in `src/lib/design-tokens.ts` for consistency:

```typescript
import { designTokens } from '@/lib/design-tokens';

// Access colors
designTokens.colors.primary // #7C3AED
designTokens.colors.primarySoft // #A855F7

// Access shadows
designTokens.shadows.base
designTokens.shadows.strong
```

## 🎯 Tailwind Configuration

Extended Tailwind config includes Hero Journey tokens:

### Colors
```typescript
colors: {
  hj: {
    primary: '#7C3AED',      // Main purple
    primarySoft: '#A855F7',  // Soft purple
    bgLight: '#F6F7FB',      // Light background
    bgDark: '#050816',       // Dark background
    card: '#FFFFFF',         // Card background
    cardSoft: '#F1F2F7',     // Soft card bg
    textMain: '#111827',     // Main text
    textSoft: '#6B7280',     // Soft text
  }
}
```

### Shadows
```typescript
boxShadow: {
  'hj': '0 18px 40px rgba(15, 23, 42, 0.22)',
  'hj-strong': '0 28px 70px rgba(15, 23, 42, 0.32)',
  'hj-inner': 'inset 0 0 20px rgba(255, 255, 255, 0.22)',
}
```

### Border Radius
```typescript
borderRadius: {
  '3xl': '1.75rem',  // 28px
  '4xl': '2.25rem',  // 36px
}
```

### Backgrounds
```typescript
backgroundImage: {
  'hj-screen': 'radial-gradient(circle at 0% 0%, #C4B5FD 0, transparent 45%), radial-gradient(circle at 100% 0%, #FDE68A 0, transparent 40%), linear-gradient(to bottom, #F9FAFB, #E5E7EB)',
}
```

## 📦 Components

### HJScreen
Full-screen wrapper with gradient background and proper spacing.

```tsx
import { HJScreen } from '@/components/ui/hj';

<HJScreen>
  {/* Your content */}
</HJScreen>
```

**Features:**
- Gradient background (`bg-hj-screen`)
- Max-width container (md: 448px)
- Proper padding (px-4, pt-4, pb-24)
- Min-height: 100vh

---

### HJCard
Glassmorphic card with shadow and border.

```tsx
import { HJCard } from '@/components/ui/hj';

<HJCard className="space-y-4">
  <h3>Card Title</h3>
  <p>Card content...</p>
</HJCard>
```

**Props:**
- `children`: ReactNode
- `className?`: string

**Styling:**
- `rounded-3xl` (28px)
- `bg-hj-card` (white)
- `shadow-hj` (soft shadow)
- `border border-white/40`
- `backdrop-blur-xl`
- `p-5` (20px padding)

---

### HJButton
Primary and secondary button variants.

```tsx
import { HJButton } from '@/components/ui/hj';

<HJButton label="Primary Button" />
<HJButton label="Secondary Button" variant="secondary" onClick={handleClick} />
```

**Props:**
- `label`: string
- `onClick?`: () => void
- `variant?`: 'primary' | 'secondary'
- `className?`: string

**Variants:**
- **Primary**: Gradient background (purple), white text, strong shadow
- **Secondary**: Glass effect, dark text, border, soft shadow

**Features:**
- Full width (`w-full`)
- Active scale animation (`:active:scale-95`)
- Rounded full (`rounded-full`)

---

### HJSection
Section wrapper with optional title.

```tsx
import { HJSection } from '@/components/ui/hj';

<HJSection title="My Section">
  {/* Content */}
</HJSection>

<HJSection>
  {/* Content without title */}
</HJSection>
```

**Props:**
- `title?`: string
- `children`: ReactNode
- `className?`: string

**Styling:**
- `mb-6` (24px bottom margin)
- Title: `text-base font-semibold text-hj-textMain mb-3`

---

### HJStatCard
Stat display card with icon, label, value, and optional description.

```tsx
import { HJStatCard, StatCard } from '@/components/ui/hj';
import { Trophy } from 'lucide-react';

<StatCard
  icon={<Trophy className="w-5 h-5 text-hj-primary" />}
  label="Workouts"
  value="42"
  subtitle="This month"
  description="Keep it up!"
/>
```

**Props:**
- `icon?`: ReactNode
- `label`: string
- `value`: string | number
- `subtitle?`: string
- `description?`: string
- `gradient?`: string (Tailwind gradient classes)
- `className?`: string

**Styling:**
- `rounded-3xl bg-hj-cardSoft`
- `shadow-hj border border-white/40`
- Icon container with gradient background
- Text hierarchy with proper sizing

---

### HJTabBar
Bottom navigation bar with active state.

```tsx
import { HJTabBar } from '@/components/ui/hj';

<HJTabBar />
```

**Features:**
- Fixed bottom positioning
- Glassmorphic background
- Active state with gradient
- Icons from `lucide-react`
- Auto-detects active route via `usePathname()`

**Routes:**
- `/hero/home` - Home
- `/hero/arena` - Workouts
- `/hero/profile` - Profile

---

### HJAvatar
Avatar with gradient border and optional glow.

```tsx
import { HJAvatar } from '@/components/ui/hj';

<HJAvatar
  src="/images/avatar.jpg"
  alt="User"
  size="lg"
  showGlow
/>
```

**Props:**
- `src?`: string (default: '/images/default-avatar.jpg')
- `alt?`: string (default: 'Avatar')
- `size?`: 'sm' | 'md' | 'lg' | 'xl'
- `className?`: string
- `showGlow?`: boolean

**Sizes:**
- `sm`: 40px
- `md`: 64px
- `lg`: 96px
- `xl`: 128px

---

## 🚀 Usage Examples

### Home Page Example

```tsx
import { HJScreen, HJCard, HJButton, HJSection, HJTabBar } from '@/components/ui/hj';
import { Dumbbell } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <HJScreen>
        <HJSection title="Get Started">
          <HJCard>
            <div className="mb-4 space-y-1">
              <p className="text-sm font-semibold text-hj-textMain">
                No active program
              </p>
              <p className="text-xs text-hj-textSoft">
                Take a test to find the perfect program
              </p>
            </div>
            <HJButton label="Find Program" />
          </HJCard>
        </HJSection>

        <HJSection title="My Workouts">
          <HJCard className="space-y-4">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-hj-primary/15 to-hj-primarySoft/25 shadow-hj-inner">
                <Dumbbell className="w-6 h-6 text-hj-primary" />
              </div>
              <p className="text-xs text-hj-textSoft">
                No active sessions
              </p>
            </div>
            <div className="space-y-2">
              <HJButton label="Buy Membership" />
              <HJButton label="Buy Tickets" variant="secondary" />
            </div>
          </HJCard>
        </HJSection>
      </HJScreen>

      <HJTabBar />
    </>
  );
}
```

### Stats Grid Example

```tsx
import { StatCard } from '@/components/ui/hj';
import { Trophy, Calendar, Flame } from 'lucide-react';

<div className="grid grid-cols-2 gap-3">
  <StatCard
    icon={<Trophy className="w-5 h-5 text-hj-primary" />}
    label="Workouts"
    value="24"
  />
  <StatCard
    icon={<Calendar className="w-5 h-5 text-hj-primary" />}
    label="Days"
    value="7"
  />
</div>
```

## 🎨 Design Principles

1. **Mobile-First**: All components designed for mobile
2. **Glassmorphism**: Backdrop blur, borders, shadows
3. **Gradients**: Purple theme throughout
4. **Consistent Spacing**: 4px increments (Tailwind)
5. **Typography Hierarchy**: Clear text sizes and weights
6. **Accessibility**: Proper contrast, touch targets

## 🔧 Customization

### Adding Custom Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  hj: {
    // ...existing colors
    accent: '#10B981',  // Add custom color
  }
}
```

### Extending Components

```tsx
import { HJCard } from '@/components/ui/hj';

function CustomCard({ children }) {
  return (
    <HJCard className="border-2 border-hj-primary">
      {children}
    </HJCard>
  );
}
```

## 📱 Responsive Design

All components are mobile-first and responsive:

```tsx
<HJCard className="sm:p-6 md:p-8 lg:rounded-4xl">
  {/* Responsive padding and radius */}
</HJCard>
```

## ✨ Animations

Built-in animations via Tailwind:

```tsx
<HJButton label="Animated" className="hover:scale-105 transition-transform" />
```

## 🎯 Best Practices

1. **Use HJScreen for all pages**
   ```tsx
   <HJScreen>
     <HJSection title="Title">
       <HJCard>Content</HJCard>
     </HJSection>
   </HJScreen>
   ```

2. **Always include HJTabBar at page bottom**
   ```tsx
   <>
     <HJScreen>{/* content */}</HJScreen>
     <HJTabBar />
   </>
   ```

3. **Use design tokens for custom styling**
   ```tsx
   import { designTokens } from '@/lib/design-tokens';
   
   <div style={{ color: designTokens.colors.primary }} />
   ```

4. **Keep components small and focused**
   - One responsibility per component
   - Compose with className prop
   - Use Tailwind utilities

## 🚨 Common Patterns

### Loading State
```tsx
<HJCard>
  <div className="animate-pulse space-y-3">
    <div className="h-4 bg-hj-cardSoft rounded" />
    <div className="h-4 bg-hj-cardSoft rounded w-2/3" />
  </div>
</HJCard>
```

### Empty State
```tsx
<HJCard>
  <div className="flex flex-col items-center gap-2 py-4">
    <Icon className="w-12 h-12 text-hj-textSoft" />
    <p className="text-xs text-hj-textSoft">No data yet</p>
  </div>
</HJCard>
```

### Action Card
```tsx
<HJCard>
  <h3 className="text-sm font-semibold text-hj-textMain mb-2">
    Title
  </h3>
  <p className="text-xs text-hj-textSoft mb-4">
    Description
  </p>
  <HJButton label="Action" />
</HJCard>
```

## 📦 Import Aliases

Use the barrel export for cleaner imports:

```tsx
// ✅ Good
import { HJScreen, HJCard, HJButton, HJSection } from '@/components/ui/hj';

// ❌ Avoid
import { HJScreen } from '@/components/ui/HJScreen';
import { HJCard } from '@/components/HJCard';
```

## 🎨 Color Usage Guidelines

- **hj-primary**: CTAs, active states, icons
- **hj-primarySoft**: Gradients, hover states
- **hj-textMain**: Headlines, main content
- **hj-textSoft**: Descriptions, secondary text
- **hj-card**: Card backgrounds
- **hj-cardSoft**: Stat cards, subtle backgrounds

## 🏗️ Architecture

```
src/
├── components/
│   ├── HJButton.tsx          # Primary/secondary buttons
│   ├── HJCard.tsx            # Glass card wrapper
│   ├── HJSection.tsx         # Section with title
│   ├── StatCard.tsx          # Stat display card
│   └── ui/
│       ├── HJScreen.tsx      # Screen wrapper
│       ├── HJTabBar.tsx      # Bottom navigation
│       ├── HJAvatar.tsx      # Avatar with gradient
│       └── hj/
│           └── index.ts      # Barrel export
├── lib/
│   └── design-tokens.ts      # Design system tokens
└── app/
    └── hero/
        └── hj-example/
            └── page.tsx      # Example usage
```

## 🎓 Quick Start

1. Import components:
```tsx
import { HJScreen, HJCard, HJButton, HJTabBar } from '@/components/ui/hj';
```

2. Build your page:
```tsx
export default function Page() {
  return (
    <>
      <HJScreen>
        <HJCard>
          <HJButton label="Click me" />
        </HJCard>
      </HJScreen>
      <HJTabBar />
    </>
  );
}
```

3. That's it! 🎉

## 🔥 Pro Tips

- Use `className` prop to extend any component
- Combine multiple HJCards in a HJSection
- Always use lucide-react icons for consistency
- Test on mobile devices (primary target)
- Use Chrome DevTools mobile view during development

---

**Built with ❤️ for the Hero Journey fitness app**
