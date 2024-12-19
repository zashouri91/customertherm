'use client';

interface NPSNumberProps {
  value?: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function NPSNumber({ value, onChange, min = 0, max = 10 }: NPSNumberProps) {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <div className="flex justify-between space-x-2">
      {numbers.map((num) => (
        <button
          key={num}
          onClick={() => onChange(num)}
          className={`w-10 h-10 rounded-full flex items-center justify-center
            ${value === num 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
            }`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
