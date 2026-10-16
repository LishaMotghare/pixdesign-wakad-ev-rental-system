import React from 'react';
import { Language } from '../../types';
import { getTranslation } from '../../translations';
import {
  TrendingUp,
  CircleDollarSign,
  Calendar,
  Zap,
  BarChart3,
  PieChart,
  Percent,
} from 'lucide-react';

interface RevenuePageProps {
  language: Language;
}

export const RevenuePage: React.FC<RevenuePageProps> = ({ language }) => {
  // Scooter-by-scooter earnings data
  const scooterRevenue = [
    { id: 'PIX-ES01', totalRides: 48, revenue: 3260, battery: 87, share: 26 },
    { id: 'PIX-ES02', totalRides: 36, revenue: 2450, battery: 64, share: 20 },
    { id: 'PIX-ES03', totalRides: 42, revenue: 2890, battery: 92, share: 23 },
    { id: 'PIX-ES04', totalRides: 22, revenue: 1480, battery: 45, share: 12 },
    { id: 'PIX-ES05', totalRides: 19, revenue: 1310, battery: 78, share: 10 },
    { id: 'PIX-ES06', totalRides: 16, revenue: 1090, battery: 55, share: 9 },
  ];

  // Daily revenue trend (Mon-Sun)
  const weeklyTrends = [
    { day: 'Mon', amount: 1620, heightPct: 65 },
    { day: 'Tue', amount: 1840, heightPct: 74 },
    { day: 'Wed', amount: 1950, heightPct: 78 },
    { day: 'Thu', amount: 2110, heightPct: 85 },
    { day: 'Fri', amount: 2480, heightPct: 100 },
    { day: 'Sat', amount: 2240, heightPct: 90 },
    { day: 'Today', amount: 1240, heightPct: 50 },
  ];

  return (
    <div className="flex flex-col flex-1 p-4 pb-6 space-y-4 max-w-[420px] mx-auto w-full">
      {/* Page Title */}
      <div>
        <h2 className="text-base font-bold text-slate-900 leading-tight">
          {getTranslation(language, 'revenueTitle')}
        </h2>
        <p className="text-[11px] text-slate-500">
          {getTranslation(language, 'revenueSubtitle')}
        </p>
      </div>

      {/* Main Revenue Cards: Total 12480 and Today 1240 */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Earnings 12480 */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0F2C59] to-slate-900 text-white shadow-md border border-slate-700/50">
          <div className="flex items-center justify-between text-slate-300 mb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              {getTranslation(language, 'totalRevenue')}
            </span>
            <CircleDollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono tracking-tight text-white">
            ₹12,480
          </div>
          <div className="text-[10px] text-emerald-300 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% vs last week</span>
          </div>
        </div>

        {/* Today's Earnings 1240 */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              {getTranslation(language, 'todayRevenue')}
            </span>
            <Calendar className="w-4 h-4 text-[#0F2C59]" />
          </div>
          <div className="text-2xl font-black font-mono tracking-tight text-slate-900">
            ₹1,240
          </div>
          <div className="text-[10px] text-sky-700 font-semibold mt-1 flex items-center gap-1">
            <Zap className="w-3 h-3 text-sky-600" />
            <span>18 rides today in Wakad</span>
          </div>
        </div>
      </div>

      {/* Secondary KPIs: Fleet, Utilization, Avg Ride */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div className="text-[10px] text-slate-500 font-semibold">
            {getTranslation(language, 'activeFleet')}
          </div>
          <div className="text-sm font-extrabold text-slate-900 font-mono mt-0.5">
            6 EV Units
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div className="text-[10px] text-slate-500 font-semibold">
            {getTranslation(language, 'utilization')}
          </div>
          <div className="text-sm font-extrabold text-emerald-700 font-mono mt-0.5">
            78.4%
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <div className="text-[10px] text-slate-500 font-semibold">
            {getTranslation(language, 'avgRideFare')}
          </div>
          <div className="text-sm font-extrabold text-[#0F2C59] font-mono mt-0.5">
            ₹68.50
          </div>
        </div>
      </div>

      {/* Weekly Revenue Trajectory (Simple SVG Bar Chart) */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-[#0F2C59]" />
            <span>{getTranslation(language, 'dailyTrends')}</span>
          </h3>
          <span className="text-[10px] text-slate-500">Last 7 Days</span>
        </div>

        <div className="flex items-end justify-between h-28 pt-2 px-1">
          {weeklyTrends.map((t) => (
            <div key={t.day} className="flex flex-col items-center flex-1 group">
              <div className="text-[9px] font-mono font-bold text-slate-600 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                ₹{t.amount}
              </div>
              <div className="w-6 bg-slate-100 rounded-t-md overflow-hidden h-20 flex items-end">
                <div
                  className={`w-full rounded-t-md transition-all duration-500 ${
                    t.day === 'Today'
                      ? 'bg-sky-500 hover:bg-sky-600'
                      : 'bg-[#0F2C59] hover:bg-[#1a4485]'
                  }`}
                  style={{ height: `${t.heightPct}%` }}
                />
              </div>
              <span className={`text-[10px] mt-1.5 font-semibold ${t.day === 'Today' ? 'text-sky-600 font-bold' : 'text-slate-500'}`}>
                {t.day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scooter Breakdown (PIX-ES01 to PIX-ES06) */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5">
        <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <PieChart className="w-3.5 h-3.5 text-[#0F2C59]" />
          <span>{getTranslation(language, 'scooterBreakdown')}</span>
        </h3>

        <div className="space-y-2">
          {scooterRevenue.map((item) => (
            <div key={item.id} className="text-xs space-y-1">
              <div className="flex items-center justify-between text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 font-mono">
                    {item.id}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    ({item.totalRides} rides)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">
                    ₹{item.revenue.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono w-7 text-right">
                    {item.share}%
                  </span>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0F2C59] rounded-full"
                  style={{ width: `${item.share * 3.5}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Streams Breakdown */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
        <h4 className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">
          {getTranslation(language, 'cashflowSummary')}
        </h4>
        <div className="space-y-1.5 text-slate-600 text-[11px]">
          <div className="flex justify-between items-center">
            <span>{getTranslation(language, 'rideFaresShare')}</span>
            <span className="font-bold font-mono text-slate-900">₹10,233</span>
          </div>
          <div className="flex justify-between items-center">
            <span>{getTranslation(language, 'walletDepositsShare')}</span>
            <span className="font-bold font-mono text-slate-900">₹1,747</span>
          </div>
          <div className="flex justify-between items-center">
            <span>{getTranslation(language, 'penaltiesShare')}</span>
            <span className="font-bold font-mono text-slate-900">₹500</span>
          </div>
        </div>
      </div>
    </div>
  );
};
