# 🔓 Простая Авторизация (Phone + Password)

## ✅ Что сделано

Убрана вся хуйня с SMS и Firebase Phone Auth!  
Теперь **простая авторизация**: телефон + пароль.

## 🚀 Как работает

### 1. Пользователь вводит:
- **Телефон**: +7XXXXXXXXXX (10 цифр)
- **Пароль**: любой (минимум 4 символа)

### 2. Система проверяет:
```typescript
if (phone === '7777777777') {
  // Админ → /admin
  localStorage.setItem('admin-phone', phone);
} else {
  // Обычный юзер → /hero/home
  localStorage.setItem('user-phone', phone);
}
```

### 3. Данные сохраняются в Firestore:
```javascript
users/{uid}:
  - phoneNumber: "+7XXXXXXXXXX"
  - password: "user_password"  // В проде захешировать!
  - role: "admin" | "user"
  - xp: 0
  - level: 1
```

### 4. При повторном входе:
- Проверяется пароль
- Если совпадает → вход
- Если нет → "Неверный пароль"

## 📱 Тестирование

### Админ:
```
Телефон: 7777777777
Пароль: любой (запомни его!)
→ Попадёшь в /admin
```

### Обычный юзер:
```
Телефон: 9123456789
Пароль: mypass123
→ Попадёшь в /hero/home
```

## 🔧 Техническая реализация

### Firestore Rules (ОТКРЫТЫ):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // ВСЁ ОТКРЫТО для разработки
    }
  }
}
```

### Anonymous Auth:
```typescript
// Используем Anonymous Auth для получения uid
const userCredential = await signInAnonymously(auth);
const uid = userCredential.user.uid;

// Сохраняем данные юзера в Firestore
await setDoc(doc(db, 'users', uid), {
  phoneNumber: `+7${phone}`,
  password: password,  // TODO: hash in production!
  role: phone === '7777777777' ? 'admin' : 'user'
});
```

### AdminGuard (localStorage):
```typescript
useEffect(() => {
  const adminPhone = localStorage.getItem('admin-phone');
  
  if (adminPhone === '7777777777') {
    setIsAdmin(true);  // Пускаем в админку
  } else {
    router.push('/hero/phone-login');  // На логин
  }
}, []);
```

## 🎯 Что изменилось

### ❌ УБРАНО:
- SMS verification
- reCAPTCHA
- Firebase Phone Auth
- signInWithPhoneNumber()
- RecaptchaVerifier
- 6-digit code input
- Вся эта хуйня с Google API

### ✅ ДОБАВЛЕНО:
- Простое поле "Пароль"
- signInAnonymously() для uid
- Сохранение пароля в Firestore
- Проверка пароля при повторном входе
- localStorage для быстрого доступа

## 🔐 Security Notes

### ⚠️ Для разработки (ТЕКУЩЕЕ):
```javascript
// Firestore Rules: ВСЁ ОТКРЫТО
allow read, write: if true;

// Пароли: НЕ ХЕШИРОВАНЫ
password: "plain_text"  // ОПАСНО!

// localStorage: ЛЕГКО ПОДДЕЛАТЬ
localStorage.setItem('admin-phone', '7777777777');
```

### ✅ Для продакшена (TODO):
```javascript
// 1. Хешировать пароли
import bcrypt from 'bcryptjs';
const hashedPassword = await bcrypt.hash(password, 10);

// 2. Закрыть Firestore Rules
allow write: if request.auth.uid == userId;

// 3. Добавить rate limiting
// 4. Добавить CAPTCHA на форму входа
// 5. Заменить localStorage на HttpOnly cookies
```

## 📂 Изменённые файлы

- ✅ `src/app/hero/phone-login/page.tsx` - Phone + Password форма
- ✅ `src/components/admin/AdminGuard.tsx` - localStorage check
- ✅ `src/components/admin/AdminTopbar.tsx` - Simple logout
- ✅ `firestore.rules` - Открытые правила (allow all)

## 🎉 Готово!

Больше никаких ошибок с reCAPTCHA, SMS, регионами и прочей хуйнёй!

**Просто:**
1. Открой `/hero/phone-login`
2. Введи `7777777777` + любой пароль
3. Заходи в админку! 🚀

---

**Важно**: Перед продакшеном нужно:
- [ ] Хешировать пароли (bcrypt)
- [ ] Закрыть Firestore Rules
- [ ] Добавить rate limiting
- [ ] Использовать secure cookies вместо localStorage

Но для разработки - работает идеально! ✅
