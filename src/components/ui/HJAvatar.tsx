// components/ui/hj-avatar.tsx
import Image from 'next/image';

interface HJAvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showGlow?: boolean;
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
};

const paddingClasses = {
  sm: 'p-0.5',
  md: 'p-1',
  lg: 'p-1.5',
  xl: 'p-2',
};

export function HJAvatar({
  src = '/images/default-avatar.jpg',
  alt = 'Avatar',
  size = 'md',
  className = '',
  showGlow = false,
}: HJAvatarProps) {
  return (
    <div
      className={`relative rounded-full bg-gradient-to-br from-hj-primary to-hj-primarySoft ${paddingClasses[size]} ${
        showGlow ? 'shadow-hj-strong' : 'shadow-hj'
      } ${className}`}
    >
      <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-white`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
