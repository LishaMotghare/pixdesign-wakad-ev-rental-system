import React, { useState } from 'react';
import { Language } from '../../types';
import { getTranslation } from '../../translations';
import { PixelLogo } from '../PixelLogo';
import {
  Building2,
  Cpu,
  Battery,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Download,
  Wallet,
  PlusCircle,
  CheckCircle2,
  Globe2,
} from 'lucide-react';

interface CompanyProfilePageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  walletBalance: number;
  onAddMoney: (amount: number) => void;
  onExportStandaloneHtml: () => void;
}

export const CompanyProfilePage: React.FC<CompanyProfilePageProps> = ({
  language,
  onLanguageChange,
  walletBalance,
  onAddMoney,
  onExportStandaloneHtml,
}) => {
  const [addedNotice, setAddedNotice] = useState(false);

  const handleTopup = (amount: number) => {
    onAddMoney(amount);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="flex flex-col flex-1 p-4 pb-6 space-y-4 max-w-[420px] mx-auto w-full">
      {/* Brand Hero Card */}
      <div className="rounded-2xl bg-gradient-to-br from-[#0F2C59] via-[#0F2C59] to-slate-900 text-white p-5 shadow-lg border border-slate-700/50">
        <div className="flex items-center gap-3">
          <PixelLogo size={46} />
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight leading-tight">
              {getTranslation(language, 'companySub')}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-400/20 text-sky-300 border border-sky-400/30">
                {getTranslation(language, 'companyIdLabel')}: {getTranslation(language, 'companyIdValue')}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 mt-3.5 leading-relaxed">
          {getTranslation(language, 'tagline')} — Pioneering connected, sustainable urban transit across Wakad, Hinjewadi IT Park, and Western Pune.
        </p>

        <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>24x7 Operations</span>
          </div>
          <span className="font-semibold text-emerald-400">● Wakad Hub Active</span>
        </div>
      </div>

      {/* Pix Wallet Card */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">
                {getTranslation(language, 'walletBalance')}
              </h3>
              <p className="text-[10px] text-slate-500">
                Auto-debit on trip completion
              </p>
            </div>
          </div>
          <div className="text-xl font-black font-mono text-emerald-700">
            ₹{walletBalance}
          </div>
        </div>

        {addedNotice && (
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{getTranslation(language, 'moneyAdded')}</span>
          </div>
        )}

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleTopup(100)}
            className="flex-1 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            + ₹100
          </button>
          <button
            type="button"
            onClick={() => handleTopup(200)}
            className="flex-1 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            + ₹200
          </button>
          <button
            type="button"
            onClick={() => handleTopup(500)}
            className="flex-1 py-1.5 px-2 rounded-lg bg-slate-950 text-white hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            + ₹500
          </button>
        </div>
      </div>

      {/* Language Preferences */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-[#0F2C59]" />
            <h3 className="text-xs font-bold text-slate-900">
              {getTranslation(language, 'langSelect')}
            </h3>
          </div>
          <span className="text-[10px] text-slate-400">Current: {language}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onLanguageChange('EN')}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              language === 'EN'
                ? 'bg-slate-950 text-white border-slate-950'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('HI')}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              language === 'HI'
                ? 'bg-slate-950 text-white border-slate-950'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            हिंदी (HI)
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('MR')}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              language === 'MR'
                ? 'bg-slate-950 text-white border-slate-950'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            मराठी (MR)
          </button>
        </div>
      </div>

      {/* Registered Hub & Contact */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#0F2C59]" />
          <span>{getTranslation(language, 'hubDetailsTitle')}</span>
        </h3>

        <div className="space-y-2 text-slate-600">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">
                {getTranslation(language, 'regOfficeLabel')}
              </span>
              <span className="text-[11px] leading-relaxed">
                {getTranslation(language, 'regOfficeValue')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
            <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <a href="tel:+912027401200" className="hover:underline font-semibold text-slate-800">
              {getTranslation(language, 'supportPhone')}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <a href="mailto:mobility@pixdesign.in" className="hover:underline text-slate-800">
              {getTranslation(language, 'supportEmail')}
            </a>
          </div>
        </div>
      </div>

      {/* EV Vehicle Specifications */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#0F2C59]" />
          <span>{getTranslation(language, 'evSpecsTitle')}</span>
        </h3>

        <div className="space-y-1.5 text-slate-700 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F2C59]"></span>
            <span>{getTranslation(language, 'specMotor')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F2C59]"></span>
            <span>{getTranslation(language, 'specBattery')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F2C59]"></span>
            <span>{getTranslation(language, 'specRange')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F2C59]"></span>
            <span>{getTranslation(language, 'specSpeed')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F2C59]"></span>
            <span>{getTranslation(language, 'specGps')}</span>
          </div>
        </div>
      </div>

      {/* Download Standalone Single HTML File Action */}
      <div className="pt-1">
        <button
          type="button"
          onClick={onExportStandaloneHtml}
          className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-sky-400" />
          <span>{getTranslation(language, 'downloadHtml')}</span>
        </button>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          {getTranslation(language, 'appVersion')}
        </p>
      </div>
    </div>
  );
};
