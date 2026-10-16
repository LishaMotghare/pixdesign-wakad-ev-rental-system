import React, { useState, useMemo } from 'react';
import { Scooter, Language } from '../../types';
import { getTranslation } from '../../translations';
import { MapComponent } from '../MapComponent';
import { Search, Zap, Navigation2, CheckCircle2, SlidersHorizontal, BatteryCharging } from 'lucide-react';

interface HomePageProps {
  scooters: Scooter[];
  selectedScooter: Scooter | null;
  onSelectScooter: (scooter: Scooter) => void;
  onBookNearest: () => void;
  language: Language;
}

export const HomePage: React.FC<HomePageProps> = ({
  scooters,
  selectedScooter,
  onSelectScooter,
  onBookNearest,
  language,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'closest' | 'battery'>('all');

  // Filtered & sorted scooters
  const filteredScooters = useMemo(() => {
    let list = scooters.filter((scooter) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        scooter.id.toLowerCase().includes(q) ||
        scooter.area.toLowerCase().includes(q) ||
        scooter.plateNo.toLowerCase().includes(q)
      );
    });

    if (filterType === 'closest') {
      list = [...list].sort((a, b) => a.distanceKm - b.distanceKm);
    } else if (filterType === 'battery') {
      list = [...list].sort((a, b) => b.battery - a.battery);
    }

    return list;
  }, [scooters, searchQuery, filterType]);

  const nearestScooter = useMemo(() => {
    return [...scooters].sort((a, b) => a.distanceKm - b.distanceKm)[0];
  }, [scooters]);

  return (
    <div className="flex flex-col flex-1 pb-4">
      {/* Search Header */}
      <div className="p-3 bg-white border-b border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={getTranslation(language, 'searchPlaceholder')}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F2C59] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Quick Tabs */}
        <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors shrink-0 ${
              filterType === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {getTranslation(language, 'filterAll')} ({scooters.length})
          </button>
          <button
            onClick={() => setFilterType('closest')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors shrink-0 ${
              filterType === 'closest'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ⚡ {getTranslation(language, 'filterClosest')}
          </button>
          <button
            onClick={() => setFilterType('battery')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors shrink-0 ${
              filterType === 'battery'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🔋 {getTranslation(language, 'filterHighBattery')}
          </button>
        </div>
      </div>

      {/* Map (50% Viewport Height) */}
      <div className="relative">
        <MapComponent
          scooters={filteredScooters}
          selectedScooterId={selectedScooter?.id}
          onSelectScooter={onSelectScooter}
          language={language}
          heightClass="h-56 sm:h-64"
        />
      </div>

      {/* Bottom Sheet - PixDesign Fleet - 6 EV Available */}
      <div className="flex-1 bg-white px-3.5 pt-3">
        {/* Title & Nearest CTA Bar */}
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">
              {getTranslation(language, 'fleetTitle')}
            </h2>
            <p className="text-[11px] text-slate-500">
              {getTranslation(language, 'inGeofence')} · {getTranslation(language, 'unlockFee')} + {getTranslation(language, 'perMinRate')}
            </p>
          </div>
        </div>

        {/* Primary Action Button: "Book Nearest Scooter" */}
        <button
          type="button"
          onClick={onBookNearest}
          className="w-full mb-3.5 py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-slate-950/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 text-sky-400 fill-sky-400" />
          <span>{getTranslation(language, 'bookNearestScooter')}</span>
          {nearestScooter && (
            <span className="text-[10px] text-slate-300 font-normal">
              ({nearestScooter.id} · {nearestScooter.distance})
            </span>
          )}
        </button>

        {/* Scooter Cards List (PIX-ES01 to PIX-ES06) */}
        <div className="space-y-2.5">
          {filteredScooters.map((scooter) => {
            const isSelected = selectedScooter?.id === scooter.id;

            // Battery bar styling
            let batteryColor = 'bg-emerald-500';
            let batteryText = 'text-emerald-700';
            if (scooter.battery < 50) {
              batteryColor = 'bg-amber-500';
              batteryText = 'text-amber-700';
            }
            if (scooter.battery < 30) {
              batteryColor = 'bg-rose-500';
              batteryText = 'text-rose-700';
            }

            return (
              <div
                key={scooter.id}
                onClick={() => onSelectScooter(scooter)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#0F2C59] bg-sky-50/60 shadow-sm ring-1 ring-[#0F2C59]/40'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#0F2C59] text-white' : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M19 13h-4v-2h4a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-4.18A3 3 0 0 0 8 2.05V4H5a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2v2H5a3 3 0 0 0-3 3v1h20v-1a3 3 0 0 0-3-3zM5 12a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h10v6H5z"/>
                      </svg>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-xs text-slate-900 tracking-tight">
                          {scooter.id}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {scooter.plateNo}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 truncate max-w-[170px]">
                        📍 {scooter.area}
                      </p>
                    </div>
                  </div>

                  {/* Distance pill & select indicator */}
                  <div className="text-right">
                    <span className="inline-block text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                      {scooter.distance}
                    </span>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {scooter.rangeKm} km {getTranslation(language, 'estRange')}
                    </div>
                  </div>
                </div>

                {/* Battery Bar */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 flex-1">
                    <BatteryCharging className={`w-3.5 h-3.5 ${batteryText}`} />
                    <span className="text-[11px] font-bold text-slate-700">
                      {getTranslation(language, 'battery')}: {scooter.battery}%
                    </span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden ml-1 max-w-[110px]">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${batteryColor}`}
                        style={{ width: `${scooter.battery}%` }}
                      />
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-semibold flex items-center gap-1 ${
                      isSelected ? 'text-[#0F2C59]' : 'text-slate-400'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />}
                    {isSelected
                      ? getTranslation(language, 'scooterSelected')
                      : getTranslation(language, 'availableNow')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
