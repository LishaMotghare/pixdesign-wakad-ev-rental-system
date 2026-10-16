import React, { useState } from 'react';
import { RideRecord, Language } from '../../types';
import { getTranslation } from '../../translations';
import { FileSpreadsheet, Download, Search, CheckCircle2, Leaf, Clock, ArrowRight } from 'lucide-react';

interface HistoryPageProps {
  rides: RideRecord[];
  language: Language;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ rides, language }) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Filter rides
  const filteredRides = rides.filter((r) => {
    const q = searchFilter.toLowerCase().trim();
    if (!q) return true;
    return (
      r.scooterId.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      r.fromArea.toLowerCase().includes(q) ||
      r.toArea.toLowerCase().includes(q) ||
      r.date.includes(q)
    );
  });

  const totalSpent = rides.reduce((sum, r) => sum + r.fareInr, 0);
  const totalKm = rides.reduce((sum, r) => sum + r.distanceKm, 0);
  // Approx 120g CO2 saved per km on electric scooter vs petrol 2-wheeler
  const co2SavedKg = ((totalKm * 120) / 1000).toFixed(1);

  // Real Excel CSV Export with UTF-8 BOM for Microsoft Excel compatibility
  const handleExportExcel = () => {
    const headers = [
      'Ride ID',
      'Scooter ID',
      'Date',
      'Start Time',
      'End Time',
      'Duration (Mins)',
      'Distance (KM)',
      'Fare (INR)',
      'From Location',
      'To Location',
      'Status',
    ];

    const rows = rides.map((r) => [
      r.id,
      r.scooterId,
      r.date,
      r.startTime,
      r.endTime,
      r.durationMinutes,
      r.distanceKm,
      r.fareInr,
      `"${r.fromArea.replace(/"/g, '""')}"`,
      `"${r.toArea.replace(/"/g, '""')}"`,
      r.status,
    ]);

    const csvContent =
      '\uFEFF' + // UTF-8 BOM so Excel opens Hindi/Marathi characters correctly
      headers.join(',') +
      '\n' +
      rows.map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `PixDesign_Ride_History_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col flex-1 p-4 pb-6 space-y-4 max-w-[420px] mx-auto w-full">
      {/* Title & Excel Export Action */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 leading-tight">
            {getTranslation(language, 'rideHistory')}
          </h2>
          <p className="text-[11px] text-slate-500">
            {getTranslation(language, 'historySubtitle')}
          </p>
        </div>

        {/* Excel Export Button */}
        <button
          type="button"
          onClick={handleExportExcel}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
          title={getTranslation(language, 'downloadCsv')}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>{getTranslation(language, 'excelExport')}</span>
        </button>
      </div>

      {downloadSuccess && (
        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Excel CSV exported successfully!</span>
        </div>
      )}

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div className="text-[10px] text-slate-500 font-semibold">
            {getTranslation(language, 'totalRidesCount')}
          </div>
          <div className="text-base font-extrabold text-slate-900 font-mono mt-0.5">
            {rides.length}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div className="text-[10px] text-slate-500 font-semibold">
            {getTranslation(language, 'totalSpent')}
          </div>
          <div className="text-base font-extrabold text-[#0F2C59] font-mono mt-0.5">
            ₹{totalSpent}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
          <div className="text-[10px] text-emerald-700 font-semibold flex items-center justify-center gap-1">
            <Leaf className="w-2.5 h-2.5" />
            <span>{getTranslation(language, 'co2Saved')}</span>
          </div>
          <div className="text-base font-extrabold text-emerald-800 font-mono mt-0.5">
            {co2SavedKg} kg
          </div>
        </div>
      </div>

      {/* Search History Filter */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Filter by scooter ID, date, or route..."
          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0F2C59]"
        />
      </div>

      {/* Rides List */}
      <div className="space-y-2.5">
        {filteredRides.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            {getTranslation(language, 'noRides')}
          </div>
        ) : (
          filteredRides.map((ride) => (
            <div
              key={ride.id}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs text-slate-900 tracking-tight font-mono">
                    {ride.scooterId}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    #{ride.id}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    ₹{ride.fareInr}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    {getTranslation(language, 'completed')}
                  </span>
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                <span className="truncate max-w-[130px]">{ride.fromArea}</span>
                <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate max-w-[130px]">{ride.toArea}</span>
              </div>

              {/* Meta details */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-1 border-t border-slate-50">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{ride.date} · {ride.startTime}</span>
                </div>
                <div>
                  {ride.distanceKm} km · {ride.durationMinutes} mins
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
