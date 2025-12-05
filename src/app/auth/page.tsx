'use client';

import Link from 'next/link';
import { Phone, Mail, Chrome } from 'lucide-react';

/**
 * Auth landing page - choose login method
 */
export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Hero&apos;s Journey</h1>
          <p className="text-gray-400">Ваш путь к легендарной форме</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 space-y-4 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Выберите способ входа</h2>
          
          {/* Phone Login */}
          <Link 
            href="/hero/phone-login"
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all"
          >
            <div className="bg-white/20 p-3 rounded-lg">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-semibold">Вход по телефону</div>
              <div className="text-sm text-white/70">Получите SMS с кодом</div>
            </div>
          </Link>

          {/* Email Login */}
          <Link 
            href="/hero/email-login"
            className="flex items-center gap-4 p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-all"
          >
            <div className="bg-white/10 p-3 rounded-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-semibold">Вход по email</div>
              <div className="text-sm text-gray-400">Используйте почту и пароль</div>
            </div>
          </Link>

          {/* Google Login (Placeholder) */}
          <button 
            className="w-full flex items-center gap-4 p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-all opacity-50 cursor-not-allowed"
            disabled
          >
            <div className="bg-white/10 p-3 rounded-lg">
              <Chrome className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-semibold">Google</div>
              <div className="text-sm text-gray-400">Скоро</div>
            </div>
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Нет аккаунта? Регистрация произойдет автоматически
        </p>
      </div>
    </div>
  );
}
