'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface NPSStarsProps {
  value?: number;
  onChange: (value: number) => void;
  maxStars?: number;
}

export default function NPSStars({ value = 0, onChange, maxStars = 5 }: NPSStarsProps) {
  return (
    <div className="flex space-x-2">
      {[...Array(maxStars)].map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index + 1)}
          className="text-yellow-400 hover:scale-110 transition-transform"
        >
          {index < value ? (
            <StarIcon className="h-8 w-8" />
          ) : (
            <StarOutlineIcon className="h-8 w-8" />
          )}
        </button>
      ))}
    </div>
  );
}
