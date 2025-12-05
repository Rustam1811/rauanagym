'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import PrimaryButton from '@/components/hero-journey/PrimaryButton';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Hero background image */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80')`,
        }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen p-6 pb-12">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-strong"
        >
          {/* Logo */}
          <div className="mb-8">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-hero font-display font-black tracking-tighter text-white mb-3"
            >
              HERO&apos;S
              <br />
              JOURNEY
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-body-lg text-white/90 font-medium"
            >
              Твой путь к легендарной форме начинается здесь
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <PrimaryButton
              fullWidth
              size="lg"
              onClick={() => router.push('/hero/phone-login')}
            >
              Продолжить
            </PrimaryButton>
          </motion.div>

          {/* App version */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-6 text-center text-caption text-white/60"
          >
            Version 1.0.0
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
