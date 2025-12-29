import React from 'react';
import { Language } from '../types';

interface PyramidChartProps {
  pinnacles: { first: number; second: number; third: number; fourth: number };
  years?: { first: number; second: number; third: number; fourth: number };
  lang?: Language;
}

const PyramidChart = ({ pinnacles, years, lang = Language.EN }: PyramidChartProps) => {
  const ageLabel = lang === Language.VI ? 'Tuổi' : 'Age';

  return (
    <div className="flex justify-center gap-4 text-center mt-4">
      <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border-2 border-indigo-400 flex items-center justify-center font-bold bg-white dark:bg-mystic-800 shadow-sm">{pinnacles.first}</div>
          <div className="text-[10px] font-bold uppercase mt-1 tracking-wider opacity-80">P1</div>
          {years && <div className="text-[9px] opacity-60">0-{years.first - years.first + 30 < 0 ? '?' : years.first - 1900 > 100 ? '~30' : ageLabel}</div>} 
          {years && <div className="text-[9px] opacity-60">~{years.first}</div>}
      </div>
      <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border-2 border-purple-400 flex items-center justify-center font-bold bg-white dark:bg-mystic-800 shadow-sm">{pinnacles.second}</div>
          <div className="text-[10px] font-bold uppercase mt-1 tracking-wider opacity-80">P2</div>
          {years && <div className="text-[9px] opacity-60">~{years.second}</div>}
      </div>
      <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border-2 border-pink-400 flex items-center justify-center font-bold bg-white dark:bg-mystic-800 shadow-sm">{pinnacles.third}</div>
          <div className="text-[10px] font-bold uppercase mt-1 tracking-wider opacity-80">P3</div>
          {years && <div className="text-[9px] opacity-60">~{years.third}</div>}
      </div>
      <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border-2 border-rose-400 flex items-center justify-center font-bold bg-white dark:bg-mystic-800 shadow-sm">{pinnacles.fourth}</div>
          <div className="text-[10px] font-bold uppercase mt-1 tracking-wider opacity-80">P4</div>
          {years && <div className="text-[9px] opacity-60">∞</div>}
      </div>
    </div>
  );
};
export default PyramidChart;