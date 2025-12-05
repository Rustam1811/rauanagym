'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { auth } from '@/lib/firebaseClient';
import { 
  signInWithPhoneNumber, 
  RecaptchaVerifier,
  ConfirmationResult 
} from 'firebase/auth';
import PrimaryButton from '@/components/hero-journey/PrimaryButton';

export default function PhoneLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    // Initialize RecaptchaVerifier
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => console.log('reCAPTCHA solved')
      });
    }

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = undefined;
      }
    };
  }, []);

  const handleSendCode = async () => {
    if (phone.length < 10) {
      setError('Введите корректный номер');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formattedPhone = `+7${phone}`;
      const appVerifier = window.recaptchaVerifier!;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      
      setConfirmationResult(result);
      setStep('code');
    } catch (err: any) {
      console.error('Error sending code:', err);
      setError(err.message || 'Ошибка отправки кода');
      
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      setError('Введите 6-значный код');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await confirmationResult?.confirm(code);
      
      const formattedPhone = `+7${phone}`;
      if (formattedPhone === '+77777777777') {
        router.push('/admin');
      } else {
        router.push('/hero/home');
      }
    } catch (err: any) {
      console.error('Error verifying code:', err);
      setError('Неверный код');
      setLoading(false);
    }
  };

  if (step === 'code') {
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
                Код из SMS
              </h1>
              <p className="text-body-md text-textSecondary">
                Введите код, отправленный на +7{phone}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-center bg-white rounded-3xl shadow-soft p-6 border border-borderSoft">
                <input
                  type="tel"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="text-3xl font-bold text-textPrimary text-center outline-none w-full tracking-widest"
                  maxLength={6}
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            <PrimaryButton
              fullWidth
              size="lg"
              onClick={handleVerifyCode}
              disabled={loading || code.length !== 6}
            >
              {loading ? 'Проверка...' : 'Войти'}
            </PrimaryButton>

            <button
              onClick={() => {
                setStep('phone');
                setCode('');
                setError('');
              }}
              className="w-full mt-4 text-textSecondary hover:text-textPrimary transition-colors"
            >
              Назад
            </button>
          </motion.div>
        </div>
        <div id="recaptcha-container" className="hidden"></div>
      </div>
    );
  }

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
              Ваш телефон
            </h1>
            <p className="text-body-md text-textSecondary">
              Введите номер телефона для входа
            </p>
          </div>

          <motion.div 
            className="mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center bg-white rounded-3xl shadow-soft p-6 border border-borderSoft">
              <span className="text-body-lg font-bold text-textPrimary mr-4">+7</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="(___) ___-__-__"
                className="flex-1 text-body-lg font-medium text-textPrimary outline-none placeholder:text-gray-300"
                maxLength={10}
              />
            </div>
          </motion.div>

          {error && (
            <motion.div 
              className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-sm text-red-600 text-center">{error}</p>
            </motion.div>
          )}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PrimaryButton
              fullWidth
              size="lg"
              onClick={handleSendCode}
              disabled={loading || phone.length < 10}
            >
              {loading ? 'Отправка...' : 'Получить код'}
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
          Нажимая "Получить код", вы соглашаетесь с условиями использования
        </p>
        <p className="text-caption text-textSecondary text-center mt-2">
          Админ: 7777777777
        </p>
      </motion.div>

      <div id="recaptcha-container" className="hidden"></div>
    </div>
  );
}

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | undefined;
  }
}
