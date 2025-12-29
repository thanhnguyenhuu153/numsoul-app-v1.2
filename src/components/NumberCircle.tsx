import React from 'react';

interface NumberCircleProps {
  value: number;
  label: string;
  delay?: number;
  color?: string;
  size?: 'md' | 'lg';
}

const NumberCircle = ({ value, label, delay, color = "border-purple-400", size = 'md' }: NumberCircleProps) => {
  const sizeClass = size === 'lg' ? 'w-24 h-24 text-4xl' : 'w-20 h-20 text-3xl';
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`${sizeClass} rounded-full flex items-center justify-center bg-white dark:bg-mystic-800 border-2 ${color} shadow-lg font-bold transition-transform`}
        style={{ animationDelay: delay ? `${delay}ms` : '0ms' }}
      >
        {value}
      </div>
      <span className="text-xs uppercase mt-2 opacity-70">{label}</span>
    </div>
  );
};
export default NumberCircle;