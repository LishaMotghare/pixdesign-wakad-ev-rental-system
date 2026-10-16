import React, { useState, useEffect } from 'react';
import { Scooter, Language } from '../../types';
import { getTranslation } from '../../translations';
import { MapComponent } from '../MapComponent';
import {
  AlertTriangle,
  BatteryCharging,
  Gauge,
  Navigation,
  Volume2,
  Lightbulb,
  Pause,
  Play,
  PhoneCall,
  CheckCircle,
  X,
  ShieldAlert,
} from 'lucide-react';

interface LivePageProps {
  scooter: Scooter;
  onEndRide: (finalStats: {
    durationMinutes: number;
    distanceKm: number;
    fareInr: number;
  }) => void;
  language: Language;
}

export const LivePage: React.FC<LivePageProps> = ({
  scooter,
  onEndRide,
  language,
}) => {
  const [secondsElapsed, setSecondsElapsed] = useState(145); // started 2m25s ago
  const [speed, setSpeed] = useState(24);
  const [battery, setBattery] = useState(86);
  const [distanceKm, setDistanceKm] = useState(1.4);
  const [headlightOn, setHeadlightOn] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hornAlert, setHornAlert] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [sosDispatched, setSosDispatched] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  // Moving coordinates starting from Wakad Bridge towards Hinjewadi
  const [currentCoords, setCurrentCoords] = useState({
    lat: 18.5970,
    lng: 73.7741,
  });

  // Timer & simulation effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setSecondsElapsed((prev) => prev + 1);

        // Gradually increment distance
        setDistanceKm((prev) => +(prev + 0.007).toFixed(2));

        // Speed micro fluctuation around 24 km/h (22 to 26)
        const jitter = Math.floor(Math.random() * 5) - 2;
        setSpeed(Math.max(18, Math.min(27, 24 + jitter)));

        // Live coordinate movement along Wakad-Hinjewadi road
        setCurrentCoords((prev) => ({
          lat: prev.lat - 0.00008,
          lng: prev.lng - 0.00018,
        }));
      } else {
        setSpeed(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Battery slow drain simulation
  useEffect(() => {
    if (secondsElapsed > 0 && secondsElapsed % 60 === 0 && !isPaused) {
      setBattery((b) => Math.max(10, b - 1));
    }
  }, [secondsElapsed, isPaused]);

  // Calculate Fare: Base ₹15 + ₹3.50/min
  const minutes = Math.ceil(secondsElapsed / 60);
  const currentFare = 15 + Math.max(0, minutes * 3.5);

  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleHorn = () => {
    setHornAlert(true);
    // Play synthetic beep if browser AudioContext is permitted
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // Audio autoplay may be disabled in some sandboxes
    }
    setTimeout(() => setHornAlert(false), 2000);
  };

  const handleTriggerSos = () => {
    setSosDispatched(true);
  };

  const handleFinalEnd = () => {
    onEndRide({
      durationMinutes: minutes,
      distanceKm: distanceKm,
      fareInr: Math.round(currentFare),
    });
  };

  return (
    <div className="flex flex-col flex-1 pb-4">
      {/* Live Status Header */}
      <div className="px-4 py-2.5 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold tracking-tight text-white uppercase">
            {getTranslation(language, 'rideInProgress')}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 font-mono border border-sky-800">
            {scooter.id}
          </span>
        </div>

        <div className="text-xs font-mono font-bold text-sky-400">
          ⏱ {formatTime(secondsElapsed)}
        </div>
      </div>

      {/* Moving Live Map */}
      <div className="relative">
        <MapComponent
          scooters={[scooter]}
          selectedScooterId={scooter.id}
          language={language}
          heightClass="h-52 sm:h-56"
          isLiveRide={true}
          livePosition={currentCoords}
        />
        {/* Floating current location pill */}
        <div className="absolute top-2 left-2 z-20">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-md text-[10px] font-semibold text-slate-800 border border-slate-200">
            <Navigation className="w-3 h-3 text-[#0F2C59]" />
            <span>Wakad ➔ Hinjewadi Route</span>
          </div>
        </div>
      </div>

      {/* Real-time Telemetry Dashboard (Speed 24, Battery 86%, Distance 1.4km) */}
      <div className="p-4 space-y-3 bg-white">
        <div className="grid grid-cols-3 gap-2.5">
          {/* Speed Card */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-xs">
            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 mb-1">
              <Gauge className="w-3.5 h-3.5 text-[#0F2C59]" />
              <span>{getTranslation(language, 'speed')}</span>
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono leading-none">
              {speed}
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">
              {getTranslation(language, 'speedUnit')}
            </div>
          </div>

          {/* Battery Card */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-xs">
            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 mb-1">
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
              <span>{getTranslation(language, 'battery')}</span>
            </div>
            <div className="text-2xl font-black text-emerald-600 font-mono leading-none">
              {battery}%
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">
              ~{(battery * 0.75).toFixed(0)} km left
            </div>
          </div>

          {/* Distance Card */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-xs">
            <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500 mb-1">
              <Navigation className="w-3.5 h-3.5 text-sky-600" />
              <span>{getTranslation(language, 'tripDistance')}</span>
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono leading-none">
              {distanceKm}
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">
              km travelled
            </div>
          </div>
        </div>

        {/* Current Fare Counter */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white shadow-xs">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              {getTranslation(language, 'currentFare')}
            </div>
            <div className="text-lg font-black text-sky-400 font-mono">
              ₹{currentFare.toFixed(2)}
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-300">
            <div>₹15 unlock + ₹3.50/min</div>
            <div className="text-[10px] text-emerald-400">Auto-debit on trip end</div>
          </div>
        </div>

        {/* Quick Scooter Controls */}
        <div className="grid grid-cols-3 gap-2">
          {/* Headlight */}
          <button
            type="button"
            onClick={() => setHeadlightOn(!headlightOn)}
            className={`py-2 px-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              headlightOn
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Lightbulb className={`w-3.5 h-3.5 ${headlightOn ? 'text-amber-600 fill-amber-500' : ''}`} />
            <span className="truncate">
              {headlightOn ? getTranslation(language, 'headlightOn') : getTranslation(language, 'headlightOff')}
            </span>
          </button>

          {/* Horn */}
          <button
            type="button"
            onClick={handleHorn}
            className="py-2 px-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#0F2C59]" />
            <span className="truncate">{getTranslation(language, 'soundHorn')}</span>
          </button>

          {/* Pause / Resume */}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className={`py-2 px-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              isPaused
                ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span className="truncate">
              {isPaused ? getTranslation(language, 'resumeRide') : getTranslation(language, 'pauseRide')}
            </span>
          </button>
        </div>

        {/* Horn feedback banner */}
        {hornAlert && (
          <div className="p-2 rounded-lg bg-sky-50 text-sky-800 text-xs font-medium text-center border border-sky-200 animate-bounce">
            🔊 {getTranslation(language, 'hornBeeped')}
          </div>
        )}

        {/* Action Buttons: SOS & End Ride */}
        <div className="pt-2 space-y-2">
          {/* Red SOS Emergency Button */}
          <button
            type="button"
            onClick={() => setShowSosModal(true)}
            className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-rose-600/30 active:scale-[0.98] transition-all cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-white" />
            <span>{getTranslation(language, 'sosEmergency')}</span>
          </button>

          {/* Black "End Ride" Button */}
          <button
            type="button"
            onClick={() => setShowEndConfirm(true)}
            className="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-slate-950/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <CheckCircle className="w-4 h-4 text-sky-400" />
            <span>{getTranslation(language, 'endRide')}</span>
          </button>
        </div>
      </div>

      {/* SOS Modal Dialog */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-rose-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-600">
                <ShieldAlert className="w-6 h-6" />
                <h3 className="font-bold text-sm text-slate-900">
                  {getTranslation(language, 'sosModalTitle')}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowSosModal(false);
                  setSosDispatched(false);
                }}
                className="text-slate-400 hover:text-slate-600 text-sm p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              {getTranslation(language, 'sosModalDesc')}
            </p>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono">
              📍 Current Wakad GPS: {currentCoords.lat.toFixed(4)}, {currentCoords.lng.toFixed(4)}
            </div>

            {sosDispatched ? (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold space-y-1">
                <div>🚨 {getTranslation(language, 'sosTriggered')}</div>
                <div className="text-[11px] text-rose-700">Ref: SOS-WKD-{Date.now().toString().slice(-4)}</div>
              </div>
            ) : (
              <div className="space-y-2">
                <a
                  href="tel:112"
                  onClick={handleTriggerSos}
                  className="w-full py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{getTranslation(language, 'callPolice')}</span>
                </a>

                <a
                  href="tel:+912027401200"
                  onClick={handleTriggerSos}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-sky-400" />
                  <span>{getTranslation(language, 'callPixSupport')}</span>
                </a>
              </div>
            )}

            <button
              onClick={() => {
                setShowSosModal(false);
                setSosDispatched(false);
              }}
              className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              {getTranslation(language, 'dismiss')}
            </button>
          </div>
        </div>
      )}

      {/* End Ride Confirmation Modal */}
      {showEndConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-slate-200 space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                {getTranslation(language, 'confirmEndTitle')}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {getTranslation(language, 'confirmEndDesc')}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>{getTranslation(language, 'finalDistance')}:</span>
                <span className="font-bold font-mono">{distanceKm} km</span>
              </div>
              <div className="flex justify-between">
                <span>{getTranslation(language, 'finalDuration')}:</span>
                <span className="font-bold font-mono">{minutes} mins ({formatTime(secondsElapsed)})</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 text-sm font-bold text-slate-900">
                <span>{getTranslation(language, 'totalAmount')}:</span>
                <span className="font-mono text-emerald-700">₹{Math.round(currentFare)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{getTranslation(language, 'photoProof')}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowEndConfirm(false)}
                className="py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFinalEnd}
                className="py-2.5 px-3 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-800"
              >
                {getTranslation(language, 'endRide')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
