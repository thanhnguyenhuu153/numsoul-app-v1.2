import React from 'react';
import { Language } from '../types';

interface AdBannerProps {
  lang: Language;
  onRemoveAds: () => void;
}

const AdBanner = ({ lang, onRemoveAds }: AdBannerProps) => (
  <div className="h-[50px] bg-gray-100 dark:bg-gray-800 flex items-center justify-between px-4 text-xs text-gray-400 border-b border-gray-200 dark:border-gray-700 shadow-sm">
    <span className="opacity-70">{lang === Language.VI ? 'Quảng cáo' : 'Advertisement'}</span>
    <button onClick={onRemoveAds} className="text-purple-500 hover:text-purple-600 font-bold hover:underline">
      {lang === Language.VI ? 'Gỡ quảng cáo' : 'Remove Ads'}
    </button>
  </div>
);
export default AdBanner;