
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type AvatarWithStatusProps = {
  src?: string;
  fallback: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  statusClassName?: string;
};

const AvatarWithStatus = ({
  src,
  fallback,
  status,
  size = 'md',
  className,
  statusClassName,
}: AvatarWithStatusProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const statusSizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
  };

  return (
    <div className="relative inline-flex">
      <Avatar className={cn(sizeClasses[size], className)}>
        <AvatarImage src={src} alt={fallback} />
        <AvatarFallback>{fallback.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-white',
            statusSizeClasses[size],
            statusClasses[status],
            statusClassName
          )}
        />
      )}
    </div>
  );
};

export default AvatarWithStatus;
