import React, { useState } from 'react';
import { Scooter, Language } from '../../types';
import { getTranslation } from '../../translations';
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  Zap,
  BatteryCharging,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

interface BookingPageProps {
  scooter: Scooter;
  onStartRide: () => void;
  onChangeScooter: () => void;
  language: Language;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  scooter,
  onStartRide,
  onChangeScooter,
  language,
}) => {
  const [copiedOtp, setCopiedOtp] = useState(false);
  const otpCode = '7342';

  const handleCopyOtp = () => {
    navigator.clipboard?.writeText(otpCode);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  return (
    <div className="flex flex-col flex-1 p-4 pb-6 space-y-4 max-w-[420px] mx-auto w-full">
      {/* Header Banner */}
      <div className="text-center pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{getTranslation(language, 'bookingTitle')}</span>
        </div>
        <p className="text-xs text-slate-500">
          {getTranslation(language, 'bookingSubtitle')}
        </p>
      </div>

      {/* Scooter Showcase Card with Illustration / Visual */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0F2C59] to-slate-900 text-white p-5 shadow-lg border border-slate-700/50">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-sky-300">
              PixDesign Smart EV
            </span>
            <h2 className="text-2xl font-black tracking-tight text-white mt-0.5">
              {scooter.id}
            </h2>
            <p className="text-xs text-slate-300 font-mono mt-0.5">
              {scooter.plateNo}
            </p>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
              <span>{scooter.battery}%</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1">
              ~{scooter.rangeKm} km {getTranslation(language, 'estRange')}
            </div>
          </div>
        </div>

        {/* Scooter Graphic / Visual Silhouette */}
        <div className="relative z-10 my-4 flex items-center justify-center">
          <div className="relative w-48 h-32 flex items-center justify-center">
            {/* SVG EV Scooter */}
            <svg
              viewBox="0 0 200 140"
              className="w-full h-full drop-shadow-[0_10px_20px_rgba(56,189,248,0.25)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ground shadow */}
              <ellipse cx="100" cy="126" rx="75" ry="7" fill="#000" opacity="0.4" />
              {/* Front Wheel */}
              <circle cx="150" cy="108" r="18" stroke="#38BDF8" strokeWidth="5" fill="#0F172A" />
              <circle cx="150" cy="108" r="8" fill="#38BDF8" />
              {/* Rear Wheel */}
              <circle cx="50" cy="108" r="18" stroke="#38BDF8" strokeWidth="5" fill="#0F172A" />
              <circle cx="50" cy="108" r="8" fill="#38BDF8" />
              {/* Floor Deck & Chassis */}
              <path
                d="M50 108 L72 108 L85 102 L132 102 L142 108 L150 108"
                stroke="#E2E8F0"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Battery Pack Under Deck */}
              <rect x="75" y="103" width="55" height="12" rx="3" fill="#38BDF8" />
              <text x="82" y="112" fill="#0F172A" fontSize="7" fontWeight="bold">PIX-EV</text>
              {/* Steering Column */}
              <path
                d="M136 102 L152 44"
                stroke="#F8FAFC"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Handlebar & Display */}
              <path
                d="M142 42 L164 42"
                stroke="#38BDF8"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <rect x="150" y="36" width="6" height="6" rx="1.5" fill="#38BDF8" />
              {/* Headlight beam */}
              <polygon points="164,40 190,32 190,52" fill="#38BDF8" opacity="0.2" />
              {/* Seat & Rear Body */}
              <path
                d="M72 102 L86 64 L108 64"
                stroke="#64748B"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M80 62 L112 62"
                stroke="#F8FAFC"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Location & Tariff tags */}
        <div className="relative z-10 pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span className="truncate max-w-[180px]">{scooter.area}</span>
          </div>
          <button
            onClick={onChangeScooter}
            className="text-[11px] font-semibold text-sky-400 hover:text-sky-300 underline underline-offset-2"
          >
            {getTranslation(language, 'changeScooter')}
          </button>
        </div>
      </div>

      {/* OTP Unlock Section */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-100 text-[#0F2C59] flex items-center justify-center font-bold text-xs">
              OTP
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 leading-tight">
                {getTranslation(language, 'unlockWithOtp')}
              </h3>
              <p className="text-[11px] text-slate-500">
                {getTranslation(language, 'enterOtpOrPress')}
              </p>
            </div>
          </div>
          <button
            onClick={handleCopyOtp}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Copy className="w-3 h-3" />
            <span>{copiedOtp ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* OTP 7342 Big Display */}
        <div className="flex items-center justify-center gap-2.5 my-3">
          {otpCode.split('').map((digit, idx) => (
            <div
              key={idx}
              className="w-13 h-14 rounded-xl bg-slate-50 border-2 border-slate-300 flex items-center justify-center text-2xl font-black text-slate-900 font-mono shadow-xs"
            >
              {digit}
            </div>
          ))}
        </div>

        <p className="text-center text-[11px] text-slate-500">
          {getTranslation(language, 'pricingNote')}
        </p>
      </div>

      {/* Vehicle Inspection Checklist */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
        <h4 className="font-bold text-slate-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#0F2C59]" />
          <span>{getTranslation(language, 'scooterSpecsTitle')}</span>
        </h4>
        <div className="space-y-1.5 text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{getTranslation(language, 'helmetReady')}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{getTranslation(language, 'brakesOk')}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{getTranslation(language, 'gpsLocked')}</span>
          </div>
        </div>
      </div>

      {/* Primary Action Button: "Start Ride" */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onStartRide}
          className="w-full py-3.5 px-5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-950/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 text-sky-400 fill-sky-400" />
          <span>{getTranslation(language, 'startRide')}</span>
        </button>
      </div>
    </div>
  );
};
