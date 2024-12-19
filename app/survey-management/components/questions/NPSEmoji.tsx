'use client';

interface NPSEmojiProps {
  value?: number;
  onChange: (value: number) => void;
}

const emojis = ['😡', '😕', '😐', '🙂', '😊'];

export default function NPSEmoji({ value, onChange }: NPSEmojiProps) {
  return (
    <div className="flex justify-between space-x-4">
      {emojis.map((emoji, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`text-3xl p-2 rounded-full hover:bg-gray-100 transition-colors
            ${value === index ? 'bg-gray-100 ring-2 ring-blue-500' : ''}`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
