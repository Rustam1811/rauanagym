'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Story } from '@/types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryViewerProps {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
}

const STORY_DURATION = 5000;

export function StoryViewer({ stories, initialIndex, onClose }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStory = stories[currentIndex];

  const goToNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width / 3) {
      goToPrevious();
    } else if (clickX > (2 * width) / 3) {
      goToNext();
    }
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const localProgress = Math.min((elapsed / STORY_DURATION) * 100, 100);
      setProgress(localProgress);

      if (localProgress >= 100) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        goToNext();
      }
    }, 50);

    if (currentStory.type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, currentStory.type, goToNext]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="absolute top-0 left-0 right-0 flex space-x-1 p-2 z-10">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100"
              style={{
                width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%',
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
      >
        <X size={24} />
      </button>

      <div
        onClick={handleAreaClick}
        className="relative w-full h-full max-w-lg flex items-center justify-center cursor-pointer"
      >
        {currentStory.type === 'image' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentStory.mediaUrl}
            alt={currentStory.title}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <video
            ref={videoRef}
            src={currentStory.mediaUrl}
            className="max-w-full max-h-full object-contain"
            loop
            playsInline
            muted
          />
        )}

        <div className="absolute bottom-8 left-0 right-0 px-6">
          <h3 className="text-white text-lg font-semibold drop-shadow-lg">
            {currentStory.title}
          </h3>
        </div>
      </div>

      {currentIndex > 0 && (
        <button
          onClick={goToPrevious}
          className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
        >
          <ChevronLeft size={32} />
        </button>
      )}
      {currentIndex < stories.length - 1 && (
        <button
          onClick={goToNext}
          className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
}
