'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebaseClient';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import PrimaryButton from '@/components/hero-journey/PrimaryButton';

export default function PhoneLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (phone.length < 10) {
      setError('Введите корректный номер');
      return;
    }

    if (password.length < 4) {
      setError('Введите пароль (минимум 4 символа)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if admin (all 7s)
      const isAdmin = phone === '7777777777';

      // Use phone as uid (simple auth without Firebase Auth)
      const uid = `user_${phone}`;
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // New user - save data
        await setDoc(userRef, {
          uid,
          phoneNumber: `+7${phone}`,
          password, // In production, hash this!
          role: isAdmin ? 'admin' : 'user',
          createdAt: new Date().toISOString(),
          displayName: `User ${phone.slice(-4)}`,
          xp: 0,
          level: 1
        });
      } else {
        // Existing user - verify password
        const userData = userDoc.data();
        if (userData.password !== password) {
          setError('Неверный пароль');
          setLoading(false);
          return;
        }
      }

      // Redirect
      if (isAdmin) {
        localStorage.setItem('admin-phone', phone);
        router.push('/admin');
      } else {
        localStorage.setItem('user-phone', phone);
        router.push('/hero/home');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Ошибка входа. Попробуйте снова');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgLight flex flex-col">
      <div className="flex-1 flex flex-col justify-center p-6 max-w-md mx-auto w-full">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-title-xl font-bold text-textPrimary mb-3 tracking-tight">
              Вход в GYM Hero
            </h1>
            <p className="text-body-md text-textSecondary">
              Введите номер телефона и пароль
            </p>
          </div>

          {/* Phone Input */}
          <motion.div 
            className="mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <label className="block text-sm font-medium text-textSecondary mb-2">
              Номер телефона
            </label>
            <div className="flex items-center bg-white rounded-3xl shadow-soft p-6 border border-borderSoft">
              <span className="text-body-lg font-bold text-textPrimary mr-4">+7</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="7777777777"
                className="flex-1 text-body-lg font-medium text-textPrimary outline-none placeholder:text-gray-300"
                maxLength={10}
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div 
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-textSecondary mb-2">
              Пароль
            </label>
            <div className="flex items-center bg-white rounded-3xl shadow-soft p-6 border border-borderSoft">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ваш пароль"
                className="flex-1 text-body-lg font-medium text-textPrimary outline-none placeholder:text-gray-300"
              />
            </div>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div 
              className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-sm text-red-600 text-center">{error}</p>
            </motion.div>
          )}

          {/* Login Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PrimaryButton
              fullWidth
              size="lg"
              onClick={handleLogin}
              disabled={loading || phone.length < 10 || password.length < 4}
            >
              {loading ? 'Вход...' : 'Войти'}
            </PrimaryButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="bg-white/60 backdrop-blur-xl p-6 pb-8 border-t border-borderSoft"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="text-caption text-textSecondary text-center">
          При первом входе будет создан новый аккаунт
        </p>
        <p className="text-caption text-textSecondary text-center mt-2">
          Админ: 7777777777 + любой пароль
        </p>
      </motion.div>
    </div>
  );
}
