# Hero Journey Design System - Quick Reference

## 🎨 Color Palette (Tailwind Classes)

```
Primary Colors:
- bg-hj-primary         #7C3AED (Purple)
- bg-hj-primarySoft     #A855F7 (Light Purple)
- text-hj-primary       Primary text color
- text-hj-primarySoft   Soft primary text

Backgrounds:
- bg-hj-bgLight         #F6F7FB (Light mode)
- bg-hj-bgDark          #050816 (Dark mode)
- bg-hj-card            #FFFFFF (Card white)
- bg-hj-cardSoft        #F1F2F7 (Soft card)
- bg-hj-screen          Gradient background

Text:
- text-hj-textMain      #111827 (Main text)
- text-hj-textSoft      #6B7280 (Secondary text)
```

## 📏 Spacing & Sizing

```
Border Radius:
- rounded-3xl           1.75rem (28px)
- rounded-4xl           2.25rem (36px)

Shadows:
- shadow-hj             Base shadow
- shadow-hj-strong      Strong shadow
- shadow-hj-inner       Inner glow

Padding:
- p-4, p-5              Card padding
- px-4, pt-4, pb-24     Screen padding
```

## 📦 Component Imports

```tsx
import {
  HJScreen,      // Screen wrapper
  HJCard,        // Glass card
  HJButton,      // Primary/secondary button
  HJSection,     // Section with title
  HJStatCard,    // Stat display
  HJTabBar,      // Bottom navigation
  HJAvatar,      // Avatar with gradient
} from '@/components/ui/hj';
```

## 🚀 Quick Templates

### Basic Page
```tsx
<>
  <HJScreen>
    <HJSection title="Title">
      <HJCard>
        <p className="text-hj-textMain">Content</p>
      </HJCard>
    </HJSection>
  </HJScreen>
  <HJTabBar />
</>
```

### Action Card
```tsx
<HJCard>
  <h3 className="text-sm font-semibold text-hj-textMain mb-2">Title</h3>
  <p className="text-xs text-hj-textSoft mb-4">Description</p>
  <HJButton label="Action" />
</HJCard>
```

### Stats Grid
```tsx
<div className="grid grid-cols-2 gap-3">
  <StatCard icon={<Icon />} label="Label" value="42" />
  <StatCard icon={<Icon />} label="Label" value="24" />
</div>
```

### Empty State
```tsx
<HJCard>
  <div className="flex flex-col items-center gap-2 py-4">
    <Icon className="w-12 h-12 text-hj-textSoft" />
    <p className="text-xs text-hj-textSoft">No data</p>
    <HJButton label="Get Started" className="mt-2" />
  </div>
</HJCard>
```

## 🎯 Typography Scale

```tsx
// Headlines
<h1 className="text-2xl font-bold text-hj-textMain">
<h2 className="text-xl font-semibold text-hj-textMain">
<h3 className="text-lg font-semibold text-hj-textMain">

// Body
<p className="text-sm font-medium text-hj-textMain">
<p className="text-sm text-hj-textMain">
<p className="text-xs text-hj-textSoft">

// Caption
<span className="text-[11px] text-hj-textSoft">
```

## 🎨 Common Patterns

### Icon Container
```tsx
<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-hj-primary/15 to-hj-primarySoft/20 shadow-hj-inner">
  <Icon className="w-5 h-5 text-hj-primary" />
</div>
```

### Gradient Button
```tsx
<button className="bg-gradient-to-r from-hj-primary to-hj-primarySoft text-white shadow-hj-strong rounded-full px-6 py-3">
  Click me
</button>
```

### Glass Effect
```tsx
<div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-hj rounded-3xl p-5">
  Content
</div>
```

## 📱 Responsive Utilities

```tsx
// Mobile-first approach
className="p-4 sm:p-6 md:p-8"
className="text-sm md:text-base"
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
```

## ✨ Animations

```tsx
// Scale on hover
className="hover:scale-105 transition-transform"

// Scale on active
className="active:scale-95 transition-transform"

// Fade in
className="animate-fade-in"

// Loading pulse
className="animate-pulse"
```

## 🔥 Pro Tips

1. **Always use HJScreen** for page wrapper
2. **HJCard inside HJSection** for content blocks
3. **Use lucide-react icons** for consistency
4. **Mobile-first** - design for 375px width first
5. **4px grid** - use Tailwind spacing (p-4, gap-4, etc.)

## 📋 Checklist for New Pages

- [ ] Wrapped in HJScreen
- [ ] HJTabBar at bottom
- [ ] Sections use HJSection
- [ ] Cards use HJCard
- [ ] Buttons use HJButton
- [ ] Icons from lucide-react
- [ ] Colors use hj-* tokens
- [ ] Spacing uses Tailwind scale
- [ ] Mobile-first responsive
- [ ] Proper text hierarchy

---

**Save this for quick reference! 🚀**
