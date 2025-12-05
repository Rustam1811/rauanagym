'use client';

import { Story } from '@/types';
import { Play } from 'lucide-react';

interface StoryBarProps {
  stories: Story[];
  onStoryClick: (index: number) => void;
}

export function StoryBar({ stories, onStoryClick }: StoryBarProps) {
  if (stories.length === 0) return null;

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4 px-4 scrollbar-hide">
      {stories.map((story, index) => (
        <button
          key={story.id}
          onClick={() => onStoryClick(index)}
          className="flex-shrink-0 flex flex-col items-center space-y-2"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500 p-0.5">
              <div className="w-full h-full rounded-full bg-white p-0.5">
                {story.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={story.thumbnailUrl}
                    alt={story.title}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    {story.type === 'video' && <Play className="text-white" size={20} />}
                  </div>
                )}
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-600 max-w-[64px] truncate">
            {story.title}
          </span>
        </button>
      ))}
    </div>
  );
}
