# 🎨 Hero Journey Shadows & Effects Guide

## 📖 Полное руководство по теням и визуальным эффектам

### 🌟 Основные тени из Tailwind Config

#### 1. **shadow-hj** (Стандартная тень)
```css
box-shadow: 
  0 8px 32px rgba(124, 58, 237, 0.15),
  0 4px 8px rgba(124, 58, 237, 0.08);
```

**Использование:**
- Карточки (HJCard)
- Статистические блоки (HJStatCard)
- Модальные окна
- Badges

**Примеры:**
```tsx
<HJCard className="shadow-hj">
  {/* content */}
</HJCard>

<div className="rounded-2xl bg-hj-cardSoft shadow-hj p-4">
  {/* content */}
</div>
```

---

#### 2. **shadow-hj-strong** (Усиленная тень)
```css
box-shadow: 
  0 16px 48px rgba(124, 58, 237, 0.25),
  0 8px 16px rgba(124, 58, 237, 0.12);
```

**Использование:**
- Премиум элементы
- Hero секции
- Primary кнопки
- Hover состояния
- Разблокированные достижения

**Примеры:**
```tsx
<HJButton variant="primary" className="shadow-hj-strong" />

<div className="shadow-hj hover:shadow-hj-strong transition-shadow">
  {/* Тень усиливается при hover */}
</div>
```

---

#### 3. **shadow-hj-inner** (Внутренняя тень)
```css
box-shadow: inset 0 2px 8px rgba(124, 58, 237, 0.1);
```

**Использование:**
- Иконки в контейнерах
- Вдавленные элементы
- Инпуты (focus state)
- Прогресс бары

**Примеры:**
```tsx
<div className="rounded-xl bg-hj-primary/10 shadow-hj-inner">
  <Icon className="w-6 h-6" />
</div>
```

---

### 💜 Кастомные фиолетовые тени

#### Легкая фиолетовая тень (для выделения)
```tsx
className="shadow-[0_8px_30px_rgba(124,58,237,0.2)]"
```
**Когда использовать:** Премиум карточки, активные элементы

#### Средняя фиолетовая тень (для акцентов)
```tsx
className="shadow-[0_15px_40px_rgba(124,58,237,0.3)]"
```
**Когда использовать:** Hover states, модальные окна

#### Сильная фиолетовая тень (для hero элементов)
```tsx
className="shadow-[0_20px_60px_rgba(124,58,237,0.5)]"
```
**Когда использовать:** Hero секции, премиум CTA кнопки

---

### 🎯 Паттерны использования

#### 1. **Карточка с hover эффектом**
```tsx
<HJCard className="shadow-hj hover:shadow-hj-strong transition-shadow duration-300">
  {/* content */}
</HJCard>
```

#### 2. **Премиум карточка (постоянное выделение)**
```tsx
<HJCard className="border-2 border-hj-primary shadow-[0_8px_30px_rgba(124,58,237,0.2)]">
  {/* premium content */}
</HJCard>
```

#### 3. **Кнопка с фиолетовой тенью**
```tsx
<button className="
  bg-gradient-to-r from-hj-primary to-hj-primarySoft
  shadow-hj-strong
  hover:shadow-[0_15px_40px_rgba(124,58,237,0.4)]
  transition-all duration-300
">
  Премиум действие
</button>
```

#### 4. **Иконка в контейнере**
```tsx
<div className="
  w-12 h-12 rounded-xl
  bg-gradient-to-br from-hj-primary to-hj-primarySoft
  flex items-center justify-center
  shadow-hj-inner
">
  <Icon className="w-6 h-6 text-white" />
</div>
```

#### 5. **Разблокированное достижение (animate)**
```tsx
<HJCard className="
  border-2 border-hj-primary
  shadow-hj-strong
  hover:shadow-[0_20px_50px_rgba(124,58,237,0.4)]
  animate-pulse
">
  {/* unlocked achievement */}
</HJCard>
```

---

### 🔮 Glassmorphism с тенями

#### Light Glass
```tsx
<div className="
  bg-white/10
  backdrop-blur-xl
  border border-white/40
  shadow-hj
  rounded-3xl
  p-6
">
  {/* content */}
</div>
```

#### Dark Glass
```tsx
<div className="
  bg-black/20
  backdrop-blur-xl
  border border-white/20
  shadow-hj
  rounded-3xl
  p-6
">
  {/* content */}
</div>
```

#### Purple Glass (Premium)
```tsx
<div className="
  bg-gradient-to-br from-hj-primary/20 to-hj-primarySoft/20
  backdrop-blur-xl
  border border-hj-primary/40
  shadow-hj-strong
  rounded-3xl
  p-6
">
  {/* premium content */}
</div>
```

---

### 📐 Скругления углов (Border Radius)

#### rounded-2xl (1rem / 16px)
```tsx
<div className="rounded-2xl">
  {/* Стандартное скругление для небольших элементов */}
</div>
```

#### rounded-3xl (1.75rem / 28px)
```tsx
<div className="rounded-3xl">
  {/* Скругление для карточек (HJCard по умолчанию) */}
</div>
```

#### rounded-4xl (2.25rem / 36px)
```tsx
<div className="rounded-4xl">
  {/* Максимальное скругление для Hero секций */}
</div>
```

#### rounded-full (9999px)
```tsx
<div className="rounded-full">
  {/* Круг - для кнопок, аватаров, badges */}
</div>
```

---

### ✨ Комбинированные эффекты

#### 1. **Hover + Scale + Shadow**
```tsx
<div className="
  shadow-hj
  hover:shadow-hj-strong
  hover:scale-105
  transition-all duration-300
  cursor-pointer
">
  {/* interactive element */}
</div>
```

#### 2. **Появление рамки при hover**
```tsx
<div className="
  border-2 border-transparent
  hover:border-hj-primary
  shadow-hj
  hover:shadow-[0_15px_40px_rgba(124,58,237,0.3)]
  transition-all duration-300
">
  {/* interactive card */}
</div>
```

#### 3. **Gradient + Shadow + Glow**
```tsx
<div className="
  bg-gradient-to-br from-hj-primary to-hj-primarySoft
  shadow-[0_20px_60px_rgba(124,58,237,0.5)]
  hover:shadow-[0_25px_80px_rgba(124,58,237,0.6)]
  rounded-3xl
  p-6
">
  {/* premium hero section */}
</div>
```

#### 4. **Active State (нажатие)**
```tsx
<button className="
  shadow-hj-strong
  active:scale-95
  active:shadow-hj
  transition-all duration-150
">
  {/* button with press effect */}
</button>
```

---

### 🎨 Цветные тени (для специальных элементов)

#### Зеленая (Success)
```tsx
className="shadow-[0_10px_30px_rgba(34,197,94,0.3)]"
// Hover: shadow-[0_15px_40px_rgba(34,197,94,0.4)]
```

#### Красная (Error)
```tsx
className="shadow-[0_10px_30px_rgba(239,68,68,0.3)]"
// Hover: shadow-[0_15px_40px_rgba(239,68,68,0.4)]
```

#### Желтая (Warning)
```tsx
className="shadow-[0_10px_30px_rgba(234,179,8,0.3)]"
// Hover: shadow-[0_15px_40px_rgba(234,179,8,0.4)]
```

#### Синяя (Info)
```tsx
className="shadow-[0_10px_30px_rgba(59,130,246,0.3)]"
// Hover: shadow-[0_15px_40px_rgba(59,130,246,0.4)]
```

---

### 🏆 Best Practices

#### ✅ DO (Делай так):
- Используй `shadow-hj` для обычных карточек
- Используй `shadow-hj-strong` для премиум элементов
- Комбинируй тени с `transition-shadow` для плавности
- Используй `hover:shadow-hj-strong` для интерактивных элементов
- Добавляй `shadow-hj-inner` для эффекта вдавливания

#### ❌ DON'T (Не делай так):
- Не используй `shadow-hj-strong` везде (потеряется акцент)
- Не смешивай слишком много разных теней на одной странице
- Не забывай про `transition-shadow` при hover эффектах
- Не используй тени на прозрачных элементах без backdrop-blur

---

### 📱 Адаптивность теней

```tsx
// Мобильные устройства - меньше тени
<div className="
  shadow-hj
  md:shadow-hj-strong
">
  {/* content */}
</div>

// Тени только на десктопе (hover работает)
<div className="
  md:hover:shadow-hj-strong
  transition-shadow
">
  {/* content */}
</div>
```

---

### 🎯 Компоненты с готовыми тенями

| Компонент | Тень по умолчанию | Hover тень |
|-----------|-------------------|------------|
| HJCard | `shadow-hj` | Нет |
| HJButton (primary) | `shadow-hj-strong` | Да (усиливается) |
| HJButton (secondary) | `shadow-hj` | `shadow-hj-strong` |
| HJWorkoutCard | `shadow-hj` | `shadow-hj-strong` |
| HJStatCard | `shadow-hj` | Нет |
| HJModal | `shadow-hj-strong` | Нет |
| HJBadge | Нет (опционально через className) | - |
| HJAvatar | Нет | Нет |

---

### 🚀 Quick Reference

```tsx
// Копируй и используй эти готовые комбинации:

// 1. Стандартная карточка
<div className="rounded-3xl bg-hj-card shadow-hj border border-white/40 backdrop-blur-xl p-5">

// 2. Премиум карточка
<div className="rounded-3xl bg-hj-card shadow-hj-strong border-2 border-hj-primary p-5">

// 3. Интерактивная карточка
<div className="rounded-3xl bg-hj-card shadow-hj hover:shadow-hj-strong transition-shadow duration-300 cursor-pointer p-5">

// 4. Hero секция
<div className="rounded-4xl bg-gradient-to-br from-hj-primary to-hj-primarySoft shadow-[0_20px_60px_rgba(124,58,237,0.5)] p-8">

// 5. Иконка в контейнере
<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hj-primary to-hj-primarySoft shadow-hj-inner flex items-center justify-center">

// 6. Кнопка с эффектом
<button className="py-4 px-6 rounded-full bg-gradient-to-r from-hj-primary to-hj-primarySoft shadow-hj-strong hover:shadow-[0_15px_40px_rgba(124,58,237,0.4)] active:scale-95 transition-all">
```

---

### 🎬 Демо страница

Посмотри все тени и эффекты в действии:
```
/hero/shadows-demo
```

---

**💜 Теперь твои компоненты будут выглядеть как от Apple/Nike!**
