'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  targetSeconds: number;
  type: 'countdown' | 'stopwatch';
  onComplete?: () => void;
  autoStart?: boolean;
}

export function Timer({ targetSeconds, type, onComplete, autoStart = false }: TimerProps) {
  const [seconds, setSeconds] = useState(type === 'countdown' ? targetSeconds : 0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (type === 'countdown') {
            if (prev <= 1) {
              setIsRunning(false);
              if (onComplete) onComplete();
              return 0;
            }
            return prev - 1;
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, type, onComplete]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(type === 'countdown' ? targetSeconds : 0);
  };

  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = type === 'countdown'
    ? ((targetSeconds - seconds) / targetSeconds) * 100
    : 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-gray-900 mb-4">
          {formatTime(seconds)}
        </div>
        
        {type === 'countdown' && (
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-center space-x-4">
        <Button
          onClick={toggleTimer}
          variant={isRunning ? 'secondary' : 'primary'}
          size="lg"
        >
          {isRunning ? (
            <>
              <Pause size={20} className="mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play size={20} className="mr-2" />
              Start
            </>
          )}
        </Button>

        <Button
          onClick={resetTimer}
          variant="outline"
          size="lg"
        >
          <RotateCcw size={20} className="mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
