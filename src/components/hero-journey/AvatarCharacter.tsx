'use client';

interface AvatarCharacterProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  character?: string;
  className?: string;
  showBorder?: boolean;
}

export default function AvatarCharacter({ 
  size = 'md', 
  character = '🥊',
  className = '',
  showBorder = true
}: AvatarCharacterProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xl',
    md: 'w-16 h-16 text-3xl',
    lg: 'w-24 h-24 text-5xl',
    xl: 'w-32 h-32 text-6xl',
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        flex items-center justify-center 
        bg-gradient-to-br from-primarySoft/30 to-primary/40
        backdrop-blur-xl
        ${showBorder ? 'border-4 border-white shadow-strong' : ''}
        transition-transform duration-300 hover:scale-105
        ${className}
      `}
    >
      <span className="select-none filter drop-shadow-lg">{character}</span>
    </div>
  );
}
