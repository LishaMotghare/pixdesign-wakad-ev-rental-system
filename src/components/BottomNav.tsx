import React from 'react';
import { PageTab, Language } from '../types';
import { getTranslation } from '../translations';
import {
  MapPin,
  KeyRound,
  Navigation,
  History,
  TrendingUp,
  Building2,
} from 'lucide-react';

interface BottomNavProps {
  currentTab: PageTab;
  onTabChange: (tab: PageTab) => void;
  language: Language;
  hasActiveRide?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  language,
  hasActiveRide = false,
}) => {
  const navItems: {
    tab: PageTab;
    labelKey: 'tabHome' | 'tabBooking' | 'tabLive' | 'tabHistory' | 'tabRevenue' | 'tabProfile';
    icon: React.ComponentType<{ className?: string }>;
    hasBadge?: boolean;
  }[] = [
    { tab: 'home', labelKey: 'tabHome', icon: MapPin },
    { tab: 'booking', labelKey: 'tabBooking', icon: KeyRound },
    { tab: 'live', labelKey: 'tabLive', icon: Navigation, hasBadge: hasActiveRide },
    { tab: 'history', labelKey: 'tabHistory', icon: History },
    { tab: 'revenue', labelKey: 'tabRevenue', icon: TrendingUp },
    { tab: 'profile', labelKey: 'tabProfile', icon: Building2 },
  ];

  return (
    <nav
      className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
      role="navigation"
      aria-label="Bottom Navigation"
    >
      <div className="grid grid-cols-6 h-15 max-w-[440px] mx-auto items-center px-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.tab;
          const IconComponent = item.icon;
          const label = getTranslation(language, item.labelKey);

          return (
            <button
              key={item.tab}
              type="button"
              onClick={() => onTabChange(item.tab)}
              className={`relative flex flex-col items-center justify-center h-full min-h-[44px] py-1 transition-all duration-150 ${
                isActive
                  ? 'text-[#0F2C59] font-bold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              {/* Badge for active ride */}
              {item.hasBadge && (
                <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              )}

              <div
                className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-[#0F2C59]/10 scale-105' : 'hover:bg-slate-100'
                }`}
              >
                <IconComponent
                  className={`w-4 h-4 ${
                    isActive ? 'text-[#0F2C59] stroke-[2.5]' : 'text-slate-600 stroke-[1.8]'
                  }`}
                />
              </div>

              <span className="text-[9.5px] leading-tight tracking-tight mt-0.5 truncate max-w-[56px] text-center">
                {label}
              </span>

              {/* Active bar */}
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-[#0F2C59] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
