/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useTransition } from 'react';
import { Language, PageTab, Scooter, RideRecord } from './types';
import { INITIAL_SCOOTERS, INITIAL_RIDE_HISTORY } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './components/pages/HomePage';
import { BookingPage } from './components/pages/BookingPage';
import { LivePage } from './components/pages/LivePage';
import { HistoryPage } from './components/pages/HistoryPage';
import { RevenuePage } from './components/pages/RevenuePage';
import { CompanyProfilePage } from './components/pages/CompanyProfilePage';
import { generateStandaloneHtml } from './utils/exportHtml';

export default function App() {
  const [language, setLanguage] = useState<Language>('EN');
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [scooters, setScooters] = useState<Scooter[]>(INITIAL_SCOOTERS);
  const [selectedScooter, setSelectedScooter] = useState<Scooter>(INITIAL_SCOOTERS[0]);
  const [hasActiveRide, setHasActiveRide] = useState<boolean>(false);
  const [walletBalance, setWalletBalance] = useState<number>(350);
  const [rides, setRides] = useState<RideRecord[]>(INITIAL_RIDE_HISTORY);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Expose translateApp function to window for script access or user inspection
  const translateApp = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  // Attach translateApp to window object so it matches prompt requirement:
  // "Make function translateApp(lang) to change all labels"
  React.useEffect(() => {
    (window as unknown as { translateApp: typeof translateApp }).translateApp = translateApp;
  }, [translateApp]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Handler: Select a scooter
  const handleSelectScooter = (scooter: Scooter) => {
    setSelectedScooter(scooter);
  };

  // Handler: "Book Nearest Scooter"
  const handleBookNearest = () => {
    // Nearest scooter is PIX-ES01 (0.3km)
    const nearest = [...scooters].sort((a, b) => a.distanceKm - b.distanceKm)[0];
    setSelectedScooter(nearest);
    setCurrentTab('booking');
  };

  // Handler: "Start Ride"
  const handleStartRide = () => {
    setHasActiveRide(true);
    setCurrentTab('live');
    showToast(`Ride started with ${selectedScooter.id}!`);
  };

  // Handler: "End Ride"
  const handleEndRide = (stats: {
    durationMinutes: number;
    distanceKm: number;
    fareInr: number;
  }) => {
    setHasActiveRide(false);
    // Deduct fare from wallet
    setWalletBalance((prev) => Math.max(0, prev - stats.fareInr));

    // Create new ride record
    const newRide: RideRecord = {
      id: `PX-${Math.floor(1000 + Math.random() * 9000)}`,
      scooterId: selectedScooter.id,
      date: new Date().toISOString().slice(0, 10),
      startTime: 'Now',
      endTime: 'Completed',
      durationMinutes: stats.durationMinutes,
      distanceKm: stats.distanceKm,
      fareInr: stats.fareInr,
      fromArea: selectedScooter.area,
      toArea: 'Hinjewadi Phase 1 Hub',
      status: 'completed',
    };

    setRides((prev) => [newRide, ...prev]);

    // Update battery of the used scooter
    setScooters((prev) =>
      prev.map((s) =>
        s.id === selectedScooter.id
          ? { ...s, battery: Math.max(10, s.battery - 8) }
          : s
      )
    );

    showToast(`Ride completed! ₹${stats.fareInr} paid via Pix Wallet.`);
    setCurrentTab('history');
  };

  // Add money to wallet
  const handleAddMoney = (amount: number) => {
    setWalletBalance((prev) => prev + amount);
    showToast(`Added ₹${amount} to Pix Wallet!`);
  };

  // Export full standalone single HTML file
  const handleExportStandaloneHtml = () => {
    const htmlContent = generateStandaloneHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pixdesign-ev-rental.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded standalone single HTML app!');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center sm:p-4 md:p-6 antialiased">
      {/* Centered Mobile App Container: max-width 420px, rounded 16px */}
      <div className="w-full max-w-[420px] min-h-screen sm:min-h-[820px] bg-slate-50 sm:rounded-[16px] shadow-2xl overflow-hidden flex flex-col relative border border-slate-700/60">
        
        {/* Top Header: Dark Blue #0F2C59, Pixel P Logo, 3-Lang Switcher Top Right */}
        <Header
          language={language}
          onLanguageChange={translateApp}
          walletBalance={walletBalance}
          onOpenWallet={() => setCurrentTab('profile')}
        />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="absolute top-16 left-4 right-4 z-50 flex items-center justify-center animate-in fade-in slide-in-from-top duration-200">
            <div className="px-3.5 py-2 rounded-xl bg-slate-950/90 backdrop-blur-md text-white text-xs font-semibold shadow-xl border border-sky-400/40 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Scrollable Viewport Content */}
        <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
          {currentTab === 'home' && (
            <HomePage
              scooters={scooters}
              selectedScooter={selectedScooter}
              onSelectScooter={handleSelectScooter}
              onBookNearest={handleBookNearest}
              language={language}
            />
          )}

          {currentTab === 'booking' && (
            <BookingPage
              scooter={selectedScooter}
              onStartRide={handleStartRide}
              onChangeScooter={() => setCurrentTab('home')}
              language={language}
            />
          )}

          {currentTab === 'live' && (
            <LivePage
              scooter={selectedScooter}
              onEndRide={handleEndRide}
              language={language}
            />
          )}

          {currentTab === 'history' && (
            <HistoryPage rides={rides} language={language} />
          )}

          {currentTab === 'revenue' && <RevenuePage language={language} />}

          {currentTab === 'profile' && (
            <CompanyProfilePage
              language={language}
              onLanguageChange={translateApp}
              walletBalance={walletBalance}
              onAddMoney={handleAddMoney}
              onExportStandaloneHtml={handleExportStandaloneHtml}
            />
          )}
        </main>

        {/* 6 Pages Bottom Navigation Bar */}
        <BottomNav
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          language={language}
          hasActiveRide={hasActiveRide}
        />
      </div>
    </div>
  );
}
