// hooks/useHJAnimation.ts
'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

/**
 * Hook для анимации появления элементов при скролле
 */
export function useHJAnimation(options: AnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', delay = 0 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, delay]);

  return { ref, isVisible };
}

/**
 * Hook для последовательной анимации списка элементов
 */
export function useHJStaggerAnimation(itemCount: number, staggerDelay = 100) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const { ref, isVisible } = useHJAnimation();

  useEffect(() => {
    if (isVisible) {
      const items = Array.from({ length: itemCount }, (_, i) => i);
      items.forEach((index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, index]);
        }, index * staggerDelay);
      });
    }
  }, [isVisible, itemCount, staggerDelay]);

  return { ref, visibleItems };
}
