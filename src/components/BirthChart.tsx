import React from 'react';

interface BirthChartProps {
  numbers: number[];
}

const BirthChart: React.FC<BirthChartProps> = ({ numbers }) => {
  // Birth chart grid mapping (Standard Layout)
  // 3 6 9
  // 2 5 8
  // 1 4 7
  
  const gridPositions = [3, 6, 9, 2, 5, 8, 1, 4, 7];

  const getCount = (num: number) => numbers.filter(n => n === num).length;

  return (
    <div className="flex justify-center my-6">
      <div className="grid grid-cols-3 gap-2 bg-white/50 dark:bg-mystic-700 p-2 rounded-lg shadow-inner border border-dream-200 dark:border-mystic-600 w-full max-w-[280px]">
        {gridPositions.map((num) => {
          const count = getCount(num);
          return (
            <div key={num} className={`
              h-20 flex items-center justify-center rounded 
              ${count > 0 
                ? 'bg-dream-200 dark:bg-mystic-600 border border-dream-300 dark:border-mystic-500 shadow-md scale-[1.02]' 
                : 'bg-dream-50 dark:bg-mystic-800/50 opacity-60'}
              transition-all duration-300
            `}>
              <div className="text-center">
                {count > 0 ? (
                  <span className="text-dream-text dark:text-mystic-100 font-serif font-bold text-xl tracking-widest">
                    {Array(count).fill(num).join('')}
                  </span>
                ) : (
                  <span className="text-dream-300 dark:text-mystic-700 text-sm font-light">{num}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BirthChart;