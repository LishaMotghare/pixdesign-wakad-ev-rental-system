import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../translations';
import { PixelLogo } from './PixelLogo';
import { Wallet } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  walletBalance: number;
  onOpenWallet?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  walletBalance,
  onOpenWallet,
}) => {
  const languages: { code: Language; label: string }[] = [
    { code: 'EN', label: 'EN' },
    { code: 'HI', label: 'HI' },
    { code: 'MR', label: 'MR' },
  ];

  return (
    <header
      className="sticky top-0 z-40 px-4 py-3 text-white shadow-md transition-colors"
      style={{ backgroundColor: '#0F2C59' }}
    >
      <div className="flex items-center justify-between gap-2">
        {/* Logo and Titles */}
        <div className="flex items-center gap-2.5 min-w-0">
          <PixelLogo size={36} />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-semibold tracking-wider text-slate-300 uppercase truncate">
              {getTranslation(language, 'companyName')}
            </span>
            <h1 className="text-sm font-bold text-white tracking-tight leading-tight truncate">
              {getTranslation(language, 'appTitle')}
            </h1>
          </div>
        </div>

        {/* Right Section: Language Switcher & Wallet */}
        <div className="flex items-center gap-2 shrink-0">
          {/* 3 Language Switcher Top Right: EN | HI | MR */}
          <div
            className="flex items-center p-0.5 rounded-lg bg-black/30 border border-white/10"
            role="group"
            aria-label="Language Switcher"
          >
            {languages.map((l) => {
              const isActive = language === l.code;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => onLanguageChange(l.code)}
                  className={`px-2 py-1 text-xs font-bold rounded-md transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-[#0F2C59] shadow-sm scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                  aria-pressed={isActive}
                >
                  {l.label}
                </button>
              );
            })}
          </div>

          {/* Wallet Shortcut */}
          <button
            type="button"
            onClick={onOpenWallet}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
            title={getTranslation(language, 'wallet')}
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-white">₹{walletBalance}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
