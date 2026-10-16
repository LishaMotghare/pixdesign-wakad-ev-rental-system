export function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>PixDesign EV Rental - by PixDesign Technologies Pune</title>
  <meta name="description" content="PixDesign EV Rental System by PixDesign Technologies Pune with 3-language support in Wakad.">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', 'Noto Sans Devanagari', system-ui, -apple-system, sans-serif;
    }
    .leaflet-pane { z-index: 10 !important; }
    .leaflet-top, .leaflet-bottom { z-index: 20 !important; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .scooter-pin:hover { transform: scale(1.1); }
  </style>
</head>
<body class="bg-slate-100 text-slate-900 select-none antialiased min-h-screen flex flex-col items-center justify-start p-0 sm:py-6">

  <!-- Mobile Centered Wrapper (max-w 420px, rounded 16px) -->
  <div class="w-full max-w-[420px] bg-white min-h-screen sm:min-h-[820px] sm:rounded-[16px] shadow-2xl flex flex-col overflow-hidden relative border border-slate-200">
    
    <!-- BRANDING HEADER: #0F2C59, Grey small, Wakad EV bold, Pixel P Logo, 3 Lang Switcher Top Right -->
    <header class="sticky top-0 z-40 px-4 py-3 text-white shadow-md" style="background-color: #0F2C59;">
      <div class="flex items-center justify-between gap-2">
        <!-- Logo & Titles -->
        <div class="flex items-center gap-2.5">
          <!-- Pixel P Logo -->
          <div class="w-9 h-9 rounded-xl bg-slate-950 p-1.5 shadow-md border border-slate-700/60 flex items-center justify-center">
            <svg viewBox="0 0 60 70" class="w-full h-full" fill="none">
              <rect x="0" y="0" width="10" height="10" rx="1.5" fill="#38BDF8"/>
              <rect x="12" y="0" width="10" height="10" rx="1.5" fill="#60A5FA"/>
              <rect x="24" y="0" width="10" height="10" rx="1.5" fill="#60A5FA"/>
              <rect x="36" y="0" width="10" height="10" rx="1.5" fill="#60A5FA"/>
              <rect x="48" y="0" width="10" height="10" rx="1.5" fill="#38BDF8"/>
              <rect x="0" y="12" width="10" height="10" rx="1.5" fill="#38BDF8"/>
              <rect x="12" y="12" width="10" height="10" rx="1.5" fill="#60A5FA"/>
              <rect x="48" y="12" width="10" height="10" rx="1.5" fill="#818CF8"/>
              <rect x="0" y="24" width="10" height="10" rx="1.5" fill="#38BDF8"/>
              <rect x="12" y="24" width="10" height="10" rx="1.5" fill="#60A5FA"/>
              <rect x="48" y="24" width="10" height="10" rx="1.5" fill="#818CF8"/>
              <rect x="0" y="36" width="10" height="10" rx="1.5" fill="#38BDF8"/>
              <rect x="12" y="36" width="10" height="10" rx="1.5" fill="#60A5FA"/>
              <rect x="24" y="36" width="10" height="10" rx="1.5" fill="#60A5FA"/>
              <rect x="36" y="36" width="10" height="10" rx="1.5" fill="#60A5FA"/>
              <rect x="48" y="36" width="10" height="10" rx="1.5" fill="#38BDF8"/>
              <rect x="0" y="48" width="10" height="10" rx="1.5" fill="#38BDF8"/>
              <rect x="12" y="48" width="10" height="10" rx="1.5" fill="#60A5FA"/>
              <rect x="0" y="60" width="10" height="10" rx="1.5" fill="#38BDF8"/>
              <rect x="12" y="60" width="10" height="10" rx="1.5" fill="#60A5FA"/>
            </svg>
          </div>
          <div>
            <div id="hdrCompany" class="text-[10px] font-semibold tracking-wider text-slate-300 uppercase leading-none">PIXDESIGN TECHNOLOGIES PUNE</div>
            <div id="hdrAppTitle" class="text-sm font-bold text-white tracking-tight leading-tight mt-0.5">Wakad EV Rental System</div>
          </div>
        </div>

        <!-- 3 Language Switcher Top Right: EN | HI | MR -->
        <div class="flex items-center p-0.5 rounded-lg bg-black/30 border border-white/10 text-xs font-bold">
          <button id="btnLangEN" onclick="translateApp('EN')" class="px-2 py-1 rounded-md bg-white text-[#0F2C59] shadow-sm transition-all">EN</button>
          <button id="btnLangHI" onclick="translateApp('HI')" class="px-2 py-1 rounded-md text-slate-300 hover:text-white transition-all">HI</button>
          <button id="btnLangMR" onclick="translateApp('MR')" class="px-2 py-1 rounded-md text-slate-300 hover:text-white transition-all">MR</button>
        </div>
      </div>
    </header>

    <!-- CONTENT PAGES -->
    <main class="flex-1 overflow-y-auto no-scrollbar flex flex-col">
      
      <!-- 1. HOME PAGE -->
      <section id="pageHome" class="flex flex-col flex-1">
        <!-- Search bar -->
        <div class="p-3 bg-white border-b border-slate-200">
          <input id="searchInput" oninput="filterScooterList()" type="text" placeholder="Search area (Wakad, Hinjewadi, Baner...)" class="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F2C59]">
        </div>

        <!-- Map 50% -->
        <div id="map" class="w-full h-56 bg-slate-200 relative"></div>

        <!-- Bottom Sheet -->
        <div class="flex-1 bg-white p-3.5 space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <h2 id="txtFleetTitle" class="text-xs font-bold text-slate-900 leading-tight">PixDesign Fleet - 6 EV Available</h2>
              <p id="txtSubInfo" class="text-[10px] text-slate-500">Inside Wakad Hub · ₹15 Unlock + ₹3.5/min</p>
            </div>
            <span class="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">5km Geofence Active</span>
          </div>

          <!-- Button "Book Nearest Scooter" -->
          <button onclick="bookNearest()" class="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all">
            <span class="text-sky-400">⚡</span>
            <span id="btnBookNearest">Book Nearest Scooter</span>
            <span class="text-slate-400 text-[10px]">(PIX-ES01 · 0.3km)</span>
          </button>

          <!-- 6 Scooter Cards Container -->
          <div id="scooterList" class="space-y-2.5"></div>
        </div>
      </section>

      <!-- 2. BOOKING PAGE -->
      <section id="pageBooking" class="hidden flex flex-col flex-1 p-4 space-y-4">
        <div class="text-center pt-2">
          <span id="txtBookingReady" class="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">Scooter Ready!</span>
          <p id="txtBookingSub" class="text-xs text-slate-500 mt-1">Reserved for 10 minutes at no charge</p>
        </div>

        <div class="rounded-2xl bg-gradient-to-br from-[#0F2C59] to-slate-900 text-white p-4 shadow-lg border border-slate-700">
          <div class="flex items-start justify-between">
            <div>
              <span class="text-[10px] uppercase font-semibold text-sky-300">PixDesign Smart EV</span>
              <h2 id="bookingScooterId" class="text-2xl font-black">PIX-ES01</h2>
              <p class="text-xs text-slate-300 font-mono">MH 14 EV 2001</p>
            </div>
            <div class="text-right">
              <span id="bookingBattery" class="text-xs font-bold px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg">87% Battery</span>
              <p class="text-[11px] text-slate-300 mt-1">~65 km range</p>
            </div>
          </div>

          <!-- Photo / Scooter Illustration -->
          <div class="my-3 flex items-center justify-center h-28">
            <svg viewBox="0 0 160 100" class="w-40 h-28" fill="none">
              <circle cx="35" cy="75" r="14" stroke="#38BDF8" stroke-width="4" fill="#0F172A"/>
              <circle cx="125" cy="75" r="14" stroke="#38BDF8" stroke-width="4" fill="#0F172A"/>
              <path d="M35 75 L55 75 L65 70 L105 70 L115 75 L125 75" stroke="#E2E8F0" stroke-width="5" stroke-linecap="round"/>
              <rect x="62" y="71" width="40" height="8" rx="2" fill="#38BDF8"/>
              <path d="M108 70 L122 28" stroke="#F8FAFC" stroke-width="4" stroke-linecap="round"/>
              <path d="M112 26 L130 26" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"/>
              <path d="M55 70 L65 42 L82 42" stroke="#64748B" stroke-width="4" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="text-xs text-slate-300 flex justify-between pt-1 border-t border-slate-700">
            <span>📍 Wakad Chowk Station</span>
            <span class="text-sky-300">₹15 unlock + ₹3.5/min</span>
          </div>
        </div>

        <!-- OTP 7342 "Unlock with OTP" -->
        <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-2">
          <div id="txtUnlockOtp" class="text-xs font-bold text-slate-700 uppercase tracking-wider">Unlock with OTP</div>
          <div class="flex items-center justify-center gap-2">
            <span class="w-12 h-14 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-2xl font-black font-mono">7</span>
            <span class="w-12 h-14 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-2xl font-black font-mono">3</span>
            <span class="w-12 h-14 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-2xl font-black font-mono">4</span>
            <span class="w-12 h-14 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center text-2xl font-black font-mono">2</span>
          </div>
          <p id="txtOtpInstruction" class="text-[11px] text-slate-500">Enter this OTP on scooter handlebar console</p>
        </div>

        <button onclick="startRide()" class="w-full py-3.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all">
          <span class="text-sky-400">⚡</span>
          <span id="btnStartRide">Start Ride</span>
        </button>
      </section>

      <!-- 3. LIVE PAGE -->
      <section id="pageLive" class="hidden flex flex-col flex-1 pb-4">
        <div class="px-4 py-2.5 bg-slate-900 text-white flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span id="txtRideProgress" class="text-xs font-bold uppercase tracking-tight">Ride in Progress</span>
            <span id="liveScooterId" class="text-[10px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 font-mono">PIX-ES01</span>
          </div>
          <div id="liveTimer" class="text-xs font-mono font-bold text-sky-400">⏱ 02:45</div>
        </div>

        <!-- Live Moving Leaflet Map -->
        <div id="liveMap" class="w-full h-52 bg-slate-200 relative"></div>

        <div class="p-4 space-y-3 bg-white">
          <!-- Telemetry (Speed 24, Battery 86%, Distance 1.4km) -->
          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span id="lblSpeed" class="text-[10px] text-slate-500 font-bold block">Speed</span>
              <span id="liveSpeed" class="text-2xl font-black font-mono text-slate-900">24</span>
              <span class="text-[10px] text-slate-400 block">km/h</span>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span id="lblBattery" class="text-[10px] text-slate-500 font-bold block">Battery</span>
              <span id="liveBattery" class="text-2xl font-black font-mono text-emerald-600">86%</span>
              <span class="text-[10px] text-slate-400 block">estimated</span>
            </div>
            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span id="lblDistance" class="text-[10px] text-slate-500 font-bold block">Distance</span>
              <span id="liveDistance" class="text-2xl font-black font-mono text-slate-900">1.4</span>
              <span class="text-[10px] text-slate-400 block">km</span>
            </div>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white">
            <span id="lblCurrentFare" class="text-xs text-slate-300 font-semibold">Current Fare:</span>
            <span id="liveFare" class="text-lg font-black text-sky-400 font-mono">₹24.50</span>
          </div>

          <!-- Buttons: SOS Emergency & End Ride -->
          <div class="space-y-2 pt-2">
            <button onclick="triggerSOS()" class="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all">
              <span>🚨</span>
              <span id="btnSos">SOS Emergency</span>
            </button>
            <button onclick="endRide()" class="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all">
              <span>✓</span>
              <span id="btnEndRide">End Ride</span>
            </button>
          </div>
        </div>
      </section>

      <!-- 4. HISTORY PAGE -->
      <section id="pageHistory" class="hidden flex flex-col flex-1 p-4 space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <h2 id="txtHistoryTitle" class="text-base font-bold text-slate-900">Ride History</h2>
            <p id="txtHistorySub" class="text-[11px] text-slate-500">Past trips in Wakad & Hinjewadi</p>
          </div>
          <!-- Excel Export -->
          <button onclick="exportToExcel()" class="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all active:scale-95">
            <span>📊</span>
            <span id="btnExcelExport">Excel Export</span>
          </button>
        </div>

        <div id="historyList" class="space-y-2"></div>
      </section>

      <!-- 5. REVENUE PAGE -->
      <section id="pageRevenue" class="hidden flex flex-col flex-1 p-4 space-y-4">
        <div>
          <h2 id="txtRevenueTitle" class="text-base font-bold text-slate-900">Company Earnings</h2>
          <p id="txtRevenueSub" class="text-[11px] text-slate-500">PixDesign Wakad Hub Fleet Performance</p>
        </div>

        <!-- Total 12480 & Today 1240 -->
        <div class="grid grid-cols-2 gap-3">
          <div class="p-4 rounded-2xl bg-[#0F2C59] text-white shadow-md">
            <span id="lblTotalRev" class="text-[10px] uppercase font-semibold text-slate-300 block">Total Earnings</span>
            <span class="text-2xl font-black font-mono">₹12,480</span>
            <span class="text-[10px] text-emerald-300 block mt-1">+18% this week</span>
          </div>
          <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span id="lblTodayRev" class="text-[10px] uppercase font-semibold text-slate-500 block">Today's Earnings</span>
            <span class="text-2xl font-black font-mono text-slate-900">₹1,240</span>
            <span class="text-[10px] text-sky-600 block mt-1">18 trips completed</span>
          </div>
        </div>

        <!-- Fleet Stats -->
        <div class="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2">
          <h3 id="txtEarningsByScooter" class="text-xs font-bold text-slate-900">Earnings by EV Scooter</h3>
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between py-1 border-b border-slate-100">
              <span class="font-mono font-bold">PIX-ES01</span>
              <span class="font-mono text-slate-700">₹3,260 (48 rides)</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-100">
              <span class="font-mono font-bold">PIX-ES02</span>
              <span class="font-mono text-slate-700">₹2,450 (36 rides)</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-100">
              <span class="font-mono font-bold">PIX-ES03</span>
              <span class="font-mono text-slate-700">₹2,890 (42 rides)</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-100">
              <span class="font-mono font-bold">PIX-ES04</span>
              <span class="font-mono text-slate-700">₹1,480 (22 rides)</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-100">
              <span class="font-mono font-bold">PIX-ES05</span>
              <span class="font-mono text-slate-700">₹1,310 (19 rides)</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="font-mono font-bold">PIX-ES06</span>
              <span class="font-mono text-slate-700">₹1,090 (16 rides)</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. COMPANY PROFILE PAGE -->
      <section id="pageProfile" class="hidden flex flex-col flex-1 p-4 space-y-4">
        <div class="rounded-2xl bg-[#0F2C59] text-white p-5 shadow-md">
          <h2 id="profCompanyName" class="text-base font-extrabold">PixDesign Technologies Pune</h2>
          <div class="mt-1">
            <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-400/20 text-sky-300">Company ID: PIX-WKD-2024</span>
          </div>
          <p id="profTagline" class="text-xs text-slate-300 mt-3">Wakad EV Rental System - Eco-friendly connected micro-mobility for Pune city.</p>
        </div>

        <div class="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
          <h3 id="profHubTitle" class="font-bold text-slate-900">Operating Hub</h3>
          <p class="text-slate-600">Survey No. 42, Wakad-Hinjewadi Link Road, Wakad, Pune 411057</p>
          <div class="pt-2 border-t border-slate-100 text-slate-700 space-y-1">
            <div>📞 Support: +91 20 2740 1200</div>
            <div>✉️ Email: mobility@pixdesign.in</div>
            <div>⏰ 24x7 Operations Hub</div>
          </div>
        </div>

        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-700">
          <h4 id="profSpecsTitle" class="font-bold text-slate-900">EV Scooter Specifications</h4>
          <div>• 250W High-Torque BLDC Hub Motor</div>
          <div>• 2.4 kWh Swappable LFP Smart Battery</div>
          <div>• 75 km Range per single charge</div>
          <div>• Top speed 25-45 km/h with GPS geofencing</div>
        </div>
      </section>

    </main>

    <!-- 6 PAGES BOTTOM NAV -->
    <nav class="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-md">
      <div class="grid grid-cols-6 h-15 items-center px-1 text-center">
        <button onclick="switchTab('home')" id="tabBtnHome" class="flex flex-col items-center justify-center py-1 text-[#0F2C59] font-bold">
          <span class="text-base">📍</span>
          <span id="lblNavHome" class="text-[9.5px] mt-0.5">Home</span>
        </button>
        <button onclick="switchTab('booking')" id="tabBtnBooking" class="flex flex-col items-center justify-center py-1 text-slate-500 font-medium">
          <span class="text-base">🔑</span>
          <span id="lblNavBooking" class="text-[9.5px] mt-0.5">Booking</span>
        </button>
        <button onclick="switchTab('live')" id="tabBtnLive" class="flex flex-col items-center justify-center py-1 text-slate-500 font-medium relative">
          <span class="text-base">🚀</span>
          <span id="lblNavLive" class="text-[9.5px] mt-0.5">Live</span>
        </button>
        <button onclick="switchTab('history')" id="tabBtnHistory" class="flex flex-col items-center justify-center py-1 text-slate-500 font-medium">
          <span class="text-base">📜</span>
          <span id="lblNavHistory" class="text-[9.5px] mt-0.5">History</span>
        </button>
        <button onclick="switchTab('revenue')" id="tabBtnRevenue" class="flex flex-col items-center justify-center py-1 text-slate-500 font-medium">
          <span class="text-base">📈</span>
          <span id="lblNavRevenue" class="text-[9.5px] mt-0.5">Revenue</span>
        </button>
        <button onclick="switchTab('profile')" id="tabBtnProfile" class="flex flex-col items-center justify-center py-1 text-slate-500 font-medium">
          <span class="text-base">🏢</span>
          <span id="lblNavProfile" class="text-[9.5px] mt-0.5">Profile</span>
        </button>
      </div>
    </nav>

  </div>

  <!-- JAVASCRIPT: 3 LANGUAGE TRANSLATIONS, LEAFLET MAP, SCOOTER FLEET, LIVE RIDE, EXCEL EXPORT -->
  <script>
    // 3 LANGUAGES DICTIONARY (EN, HI, MR)
    const DICTIONARY = {
      EN: {
        company: "PIXDESIGN TECHNOLOGIES PUNE",
        appTitle: "Wakad EV Rental System",
        nearbyScooters: "Nearby EV Scooters",
        bookNearest: "Book Nearest Scooter",
        fleetTitle: "PixDesign Fleet - 6 EV Available",
        subInfo: "Inside Wakad Hub · ₹15 Unlock + ₹3.5/min",
        searchPlaceholder: "Search area (Wakad, Hinjewadi, Baner...)",
        battery: "Battery",
        distance: "Distance",
        speed: "Speed",
        rideInProgress: "Ride in Progress",
        sosEmergency: "SOS Emergency",
        endRide: "End Ride",
        currentFare: "Current Fare:",
        rideHistory: "Ride History",
        historySub: "Past trips in Wakad & Hinjewadi",
        excelExport: "Excel Export",
        revenueTitle: "Company Earnings",
        revenueSub: "PixDesign Wakad Hub Fleet Performance",
        totalRev: "Total Earnings",
        todayRev: "Today's Earnings",
        earningsByScooter: "Earnings by EV Scooter",
        companyProfile: "Company Profile",
        companyId: "Company ID: PIX-WKD-2024",
        scooterReady: "Scooter Ready!",
        scooterReadySub: "Reserved for 10 minutes at no charge",
        unlockWithOtp: "Unlock with OTP",
        otpInstruction: "Enter this OTP on scooter handlebar console",
        startRide: "Start Ride",
        navHome: "Home",
        navBooking: "Booking",
        navLive: "Live",
        navHistory: "History",
        navRevenue: "Revenue",
        navProfile: "Profile"
      },
      HI: {
        company: "पिक्सडिजाइन टेक्नोलॉजीज पुणे",
        appTitle: "वाकड EV रेंटल सिस्टम",
        nearbyScooters: "नजदीकी EV स्कूटर",
        bookNearest: "नजदीकी स्कूटर बुक करें",
        fleetTitle: "पिक्सडिजाइन फ्लीट - 6 EV उपलब्ध",
        subInfo: "वाकड हब के भीतर · ₹15 अनलॉक + ₹3.5/मिनट",
        searchPlaceholder: "क्षेत्र खोजें (वाकड, हिंजेवड़ी, बानेर...)",
        battery: "बैटरी",
        distance: "दूरी",
        speed: "गति",
        rideInProgress: "राइड जारी है",
        sosEmergency: "SOS आपातकाल",
        endRide: "राइड समाप्त करें",
        currentFare: "वर्तमान किराया:",
        rideHistory: "राइड इतिहास",
        historySub: "वाकड और हिंजेवड़ी में पिछली राइड्स",
        excelExport: "एक्सेल निर्यात",
        revenueTitle: "कंपनी की कमाई",
        revenueSub: "पिक्सडिजाइन वाकड हब फ्लीट प्रदर्शन",
        totalRev: "कुल कमाई",
        todayRev: "आज की कमाई",
        earningsByScooter: "EV स्कूटर के अनुसार कमाई",
        companyProfile: "कंपनी प्रोफ़ाइल",
        companyId: "कंपनी ID: PIX-WKD-2024",
        scooterReady: "स्कूटर तैयार है!",
        scooterReadySub: "10 मिनट के लिए निःशुल्क आरक्षित",
        unlockWithOtp: "OTP से अनलॉक करें",
        otpInstruction: "स्कूटर हैंडल बार कंसोल पर यह OTP दर्ज करें",
        startRide: "राइड शुरू करें",
        navHome: "होम",
        navBooking: "बुकिंग",
        navLive: "लाइव",
        navHistory: "इतिहास",
        navRevenue: "राजस्व",
        navProfile: "प्रोफ़ाइल"
      },
      MR: {
        company: "पिक्सडिझाइन टेक्नॉलॉजीज पुणे",
        appTitle: "वाकड EV रेंटल सिस्टीम",
        nearbyScooters: "जवळील EV स्कूटर",
        bookNearest: "जवळील स्कूटर बुक करा",
        fleetTitle: "पिक्सडिझाइन फ्लीट - ६ EV उपलब्ध",
        subInfo: "वाकड हबच्या आत · ₹१५ अनलॉक + ₹३.५/मिनिट",
        searchPlaceholder: "परिसर शोधा (वाकड, हिंजवडी, बाणेर...)",
        battery: "बॅटरी",
        distance: "अंतर",
        speed: "वेग",
        rideInProgress: "राइड सुरू आहे",
        sosEmergency: "SOS आणीबाणी",
        endRide: "राइड समाप्त करा",
        currentFare: "सध्याचे भाडे:",
        rideHistory: "राइड इतिहास",
        historySub: "वाकड आणि हिंजवडी भागातील मागील राइड्स",
        excelExport: "एक्सेल एक्सपोर्ट",
        revenueTitle: "कंपनीचे उत्पन्न",
        revenueSub: "पिक्सडिझाइन वाकड हब फ्लीट कामगिरी",
        totalRev: "एकूण उत्पन्न",
        todayRev: "आजचे उत्पन्न",
        earningsByScooter: "EV स्कूटरनुसार उत्पन्न",
        companyProfile: "कंपनी प्रोफाईल",
        companyId: "कंपनी ID: PIX-WKD-2024",
        scooterReady: "स्कूटर सज्ज आहे!",
        scooterReadySub: "१० मिनिटांसाठी विनामूल्य आरक्षित",
        unlockWithOtp: "OTP ने अनलॉक करा",
        otpInstruction: "स्कूटर हँडलबार कन्सोलवर हा OTP टाका",
        startRide: "राइड सुरू करा",
        navHome: "होम",
        navBooking: "बुकिंग",
        navLive: "थेट",
        navHistory: "इतिहास",
        navRevenue: "उत्पन्न",
        navProfile: "प्रोफाईल"
      }
    };

    let currentLang = 'EN';

    // 6 SCOOTERS DATASET
    const SCOOTERS = [
      { id: "PIX-ES01", lat: 18.5992, lng: 73.7765, battery: 87, distance: "0.3km", distKm: 0.3, area: "Wakad Chowk North", plate: "MH 14 EV 2001", range: 65 },
      { id: "PIX-ES02", lat: 18.5915, lng: 73.7389, battery: 64, distance: "0.8km", distKm: 0.8, area: "Hinjewadi Phase 1", plate: "MH 14 EV 2002", range: 48 },
      { id: "PIX-ES03", lat: 18.6021, lng: 73.7812, battery: 92, distance: "1.2km", distKm: 1.2, area: "Dange Chowk Flyover", plate: "MH 14 EV 2003", range: 70 },
      { id: "PIX-ES04", lat: 18.5880, lng: 73.7650, battery: 45, distance: "1.5km", distKm: 1.5, area: "Thergaon Link Road", plate: "MH 14 EV 2004", range: 34 },
      { id: "PIX-ES05", lat: 18.5955, lng: 73.7901, battery: 78, distance: "2.1km", distKm: 2.1, area: "Baner High Street", plate: "MH 14 EV 2005", range: 58 },
      { id: "PIX-ES06", lat: 18.6100, lng: 73.7700, battery: 55, distance: "2.8km", distKm: 2.8, area: "Kalewadi Border", plate: "MH 14 EV 2006", range: 41 }
    ];

    let selectedScooter = SCOOTERS[0];
    let liveTimerInterval = null;
    let liveSeconds = 165;
    let mainMap = null;
    let liveMap = null;
    let mainMarkersLayer = null;

    // FUNCTION TO TRANSLATE THE ENTIRE APP
    function translateApp(lang) {
      currentLang = lang;
      const dict = DICTIONARY[lang] || DICTIONARY.EN;

      // Update Header
      document.getElementById('hdrCompany').innerText = dict.company;
      document.getElementById('hdrAppTitle').innerText = dict.appTitle;

      // Update Language Switcher Buttons
      ['EN', 'HI', 'MR'].forEach(l => {
        const btn = document.getElementById('btnLang' + l);
        if (l === lang) {
          btn.className = "px-2 py-1 rounded-md bg-white text-[#0F2C59] shadow-sm font-bold";
        } else {
          btn.className = "px-2 py-1 rounded-md text-slate-300 hover:text-white font-bold";
        }
      });

      // Update Home Page Text
      document.getElementById('txtFleetTitle').innerText = dict.fleetTitle;
      document.getElementById('txtSubInfo').innerText = dict.subInfo;
      document.getElementById('btnBookNearest').innerText = dict.bookNearest;
      document.getElementById('searchInput').placeholder = dict.searchPlaceholder;

      // Update Booking Page Text
      document.getElementById('txtBookingReady').innerText = dict.scooterReady;
      document.getElementById('txtBookingSub').innerText = dict.scooterReadySub;
      document.getElementById('txtUnlockOtp').innerText = dict.unlockWithOtp;
      document.getElementById('txtOtpInstruction').innerText = dict.otpInstruction;
      document.getElementById('btnStartRide').innerText = dict.startRide;

      // Update Live Page Text
      document.getElementById('txtRideProgress').innerText = dict.rideInProgress;
      document.getElementById('lblSpeed').innerText = dict.speed;
      document.getElementById('lblBattery').innerText = dict.battery;
      document.getElementById('lblDistance').innerText = dict.distance;
      document.getElementById('lblCurrentFare').innerText = dict.currentFare;
      document.getElementById('btnSos').innerText = dict.sosEmergency;
      document.getElementById('btnEndRide').innerText = dict.endRide;

      // Update History Page Text
      document.getElementById('txtHistoryTitle').innerText = dict.rideHistory;
      document.getElementById('txtHistorySub').innerText = dict.historySub;
      document.getElementById('btnExcelExport').innerText = dict.excelExport;

      // Update Revenue Page Text
      document.getElementById('txtRevenueTitle').innerText = dict.revenueTitle;
      document.getElementById('txtRevenueSub').innerText = dict.revenueSub;
      document.getElementById('lblTotalRev').innerText = dict.totalRev;
      document.getElementById('lblTodayRev').innerText = dict.todayRev;
      document.getElementById('txtEarningsByScooter').innerText = dict.earningsByScooter;

      // Update Nav Labels
      document.getElementById('lblNavHome').innerText = dict.navHome;
      document.getElementById('lblNavBooking').innerText = dict.navBooking;
      document.getElementById('lblNavLive').innerText = dict.navLive;
      document.getElementById('lblNavHistory').innerText = dict.navHistory;
      document.getElementById('lblNavRevenue').innerText = dict.navRevenue;
      document.getElementById('lblNavProfile').innerText = dict.navProfile;

      // Re-render scooter cards to refresh translated labels
      renderScooterList();
    }

    // INITIALIZE MAP: Wakad Bridge (18.5970, 73.7741), 5km Blue Dotted Geofence, Areas
    function initMap() {
      mainMap = L.map('map', {
        center: [18.5970, 73.7741],
        zoom: 13,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(mainMap);

      // 5km Blue Dotted Geofence Circle
      L.circle([18.5970, 73.7741], {
        radius: 5000,
        color: '#0284c7',
        weight: 2.5,
        dashArray: '6, 8',
        fillColor: '#38bdf8',
        fillOpacity: 0.08
      }).addTo(mainMap);

      // Area Labels (Dange Chowk, Hinjewadi, Baner, Thergaon, Wakad)
      const areas = [
        { name: "Wakad Bridge", lat: 18.5970, lng: 73.7741 },
        { name: "Dange Chowk", lat: 18.6045, lng: 73.7820 },
        { name: "Hinjewadi", lat: 18.5912, lng: 73.7380 },
        { name: "Baner", lat: 18.5720, lng: 73.7840 },
        { name: "Thergaon", lat: 18.6010, lng: 73.7680 }
      ];

      areas.forEach(a => {
        const areaIcon = L.divIcon({
          className: 'area-badge',
          html: \`<div class="px-2 py-0.5 rounded-full bg-slate-900/80 text-white text-[9px] font-bold border border-white/20 whitespace-nowrap -translate-x-1/2 -translate-y-1/2">📍 \${a.name}</div>\`,
          iconSize: [0, 0]
        });
        L.marker([a.lat, a.lng], { icon: areaIcon }).addTo(mainMap);
      });

      mainMarkersLayer = L.layerGroup().addTo(mainMap);
      plotScooterMarkers();
    }

    function plotScooterMarkers() {
      if (!mainMarkersLayer) return;
      mainMarkersLayer.clearLayers();

      SCOOTERS.forEach(s => {
        const isSelected = selectedScooter && selectedScooter.id === s.id;
        const iconHtml = \`
          <div class="scooter-pin cursor-pointer relative -translate-x-1/2 -translate-y-full pb-1 transition-transform">
            <div class="flex items-center gap-1 px-2 py-1 rounded-xl shadow-md border \${isSelected ? 'bg-slate-950 text-white border-sky-400 ring-2 ring-sky-400/50' : 'bg-white text-slate-900 border-slate-300'}">
              <span class="text-[10px] font-black">\${s.id}</span>
              <span class="text-[9px] font-bold \${s.battery < 50 ? 'text-amber-500' : 'text-emerald-500'}">\${s.battery}%</span>
            </div>
            <div class="w-2 h-2 mx-auto rotate-45 -mt-1 \${isSelected ? 'bg-slate-950' : 'bg-white'} border-r border-b \${isSelected ? 'border-sky-400' : 'border-slate-300'}"></div>
          </div>
        \`;

        const marker = L.marker([s.lat, s.lng], {
          icon: L.divIcon({ className: '', html: iconHtml, iconSize: [60, 40], iconAnchor: [30, 40] })
        });

        marker.on('click', () => {
          selectScooter(s.id);
        });

        marker.addTo(mainMarkersLayer);
      });
    }

    function renderScooterList() {
      const container = document.getElementById('scooterList');
      if (!container) return;
      const dict = DICTIONARY[currentLang];

      const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
      const list = SCOOTERS.filter(s => !query || s.id.toLowerCase().includes(query) || s.area.toLowerCase().includes(query));

      container.innerHTML = list.map(s => {
        const isSel = selectedScooter && selectedScooter.id === s.id;
        return \`
          <div onclick="selectScooter('\${s.id}')" class="p-3 rounded-2xl border transition-all cursor-pointer \${isSel ? 'border-[#0F2C59] bg-sky-50 ring-1 ring-[#0F2C59]' : 'border-slate-200 bg-white hover:border-slate-300'}">
            <div class="flex items-center justify-between">
              <div>
                <span class="font-black text-xs text-slate-900 font-mono">\${s.id}</span>
                <span class="text-[10px] text-slate-500 ml-1">\${s.plate}</span>
                <div class="text-[11px] text-slate-600 mt-0.5">📍 \${s.area}</div>
              </div>
              <div class="text-right">
                <span class="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">\${s.distance}</span>
                <div class="text-[10px] text-slate-500 mt-0.5">\${s.range} km range</div>
              </div>
            </div>
            <div class="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span class="text-[11px] font-bold text-slate-700">\${dict.battery}: \${s.battery}%</span>
              <span class="text-[10px] font-semibold \${isSel ? 'text-[#0F2C59]' : 'text-slate-400'}">\${isSel ? '● Selected' : 'Available'}</span>
            </div>
          </div>
        \`;
      }).join('');
    }

    function filterScooterList() {
      renderScooterList();
    }

    function selectScooter(id) {
      const found = SCOOTERS.find(s => s.id === id);
      if (found) {
        selectedScooter = found;
        document.getElementById('bookingScooterId').innerText = found.id;
        document.getElementById('bookingBattery').innerText = found.battery + '% Battery';
        document.getElementById('liveScooterId').innerText = found.id;
        plotScooterMarkers();
        renderScooterList();
        if (mainMap) {
          mainMap.panTo([found.lat, found.lng], { animate: true });
        }
      }
    }

    function bookNearest() {
      selectScooter('PIX-ES01');
      switchTab('booking');
    }

    function switchTab(tab) {
      ['home', 'booking', 'live', 'history', 'revenue', 'profile'].forEach(t => {
        const sec = document.getElementById('page' + t.charAt(0).toUpperCase() + t.slice(1));
        const btn = document.getElementById('tabBtn' + t.charAt(0).toUpperCase() + t.slice(1));
        if (t === tab) {
          sec.classList.remove('hidden');
          btn.className = "flex flex-col items-center justify-center py-1 text-[#0F2C59] font-bold";
        } else {
          sec.classList.add('hidden');
          btn.className = "flex flex-col items-center justify-center py-1 text-slate-500 font-medium";
        }
      });

      if (tab === 'home' && mainMap) {
        setTimeout(() => mainMap.invalidateSize(), 150);
      }
      if (tab === 'live') {
        initLiveMap();
      }
    }

    // LIVE RIDE LOGIC
    function startRide() {
      switchTab('live');
      startLiveTimer();
    }

    function initLiveMap() {
      if (liveMap) {
        liveMap.invalidateSize();
        return;
      }
      liveMap = L.map('liveMap', {
        center: [18.5970, 73.7741],
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(liveMap);

      const livePin = L.divIcon({
        html: '<div class="w-6 h-6 rounded-full bg-slate-950 border-2 border-white flex items-center justify-center text-sky-400 text-xs shadow-lg">⚡</div>',
        iconSize: [24, 24]
      });
      L.marker([18.5970, 73.7741], { icon: livePin }).addTo(liveMap);
    }

    function startLiveTimer() {
      if (liveTimerInterval) clearInterval(liveTimerInterval);
      liveTimerInterval = setInterval(() => {
        liveSeconds++;
        const m = Math.floor(liveSeconds / 60).toString().padStart(2, '0');
        const s = (liveSeconds % 60).toString().padStart(2, '0');
        document.getElementById('liveTimer').innerText = '⏱ ' + m + ':' + s;

        // Speed fluctuation around 24 km/h
        const spd = 24 + (Math.floor(Math.random() * 5) - 2);
        document.getElementById('liveSpeed').innerText = spd;

        const dist = (1.4 + (liveSeconds - 165) * 0.006).toFixed(2);
        document.getElementById('liveDistance').innerText = dist;

        const fare = 15 + Math.ceil(liveSeconds / 60) * 3.5;
        document.getElementById('liveFare').innerText = '₹' + fare.toFixed(2);
      }, 1000);
    }

    function triggerSOS() {
      alert("🚨 EMERGENCY SOS DISPATCHED!\\n\\nPune Police (112) and PixDesign Wakad Patrol Team (+91 20 2740 1200) notified with your live coordinates (18.5970, 73.7741).");
    }

    function endRide() {
      if (confirm("End your EV ride now? Total fare will be auto-deducted from your Pix Wallet.")) {
        if (liveTimerInterval) clearInterval(liveTimerInterval);
        alert("✓ Ride Completed Successfully! Total Fare: ₹24.50. Added to Ride History.");
        switchTab('history');
      }
    }

    // EXCEL EXPORT WITH UTF-8 BOM
    function exportToExcel() {
      const csv = "\\uFEFFRide ID,Scooter ID,Date,Duration (Mins),Distance (KM),Fare (INR),Route,Status\\n" +
        "PX-9081,PIX-ES01,2026-10-15,22,4.8,92,Wakad to Hinjewadi Ph1,Completed\\n" +
        "PX-9076,PIX-ES03,2026-10-15,18,3.9,78,Dange Chowk to Wakad Bridge,Completed\\n" +
        "PX-9069,PIX-ES05,2026-10-14,25,6.2,102,Baner to Wakad Kaspate Wasti,Completed\\n" +
        "PX-9055,PIX-ES02,2026-10-14,21,5.1,88,Hinjewadi to Wakad Ginger,Completed\\n" +
        "PX-9042,PIX-ES04,2026-10-13,18,3.5,74,Thergaon to Dange Chowk,Completed";

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "PixDesign_Ride_History.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    function renderHistory() {
      const hList = document.getElementById('historyList');
      if (!hList) return;
      const historyData = [
        { id: "PX-9081", scooter: "PIX-ES01", date: "Today 17:42", dist: "4.8 km", fare: 92, from: "Wakad Chowk", to: "Hinjewadi Ph1" },
        { id: "PX-9076", scooter: "PIX-ES03", date: "Today 14:23", dist: "3.9 km", fare: 78, from: "Dange Chowk", to: "Wakad Bridge" },
        { id: "PX-9069", scooter: "PIX-ES05", date: "Yesterday", dist: "6.2 km", fare: 102, from: "Baner High St", to: "Wakad Kaspate" },
        { id: "PX-9055", scooter: "PIX-ES02", date: "14 Oct 2026", dist: "5.1 km", fare: 88, from: "Hinjewadi Blue Ridge", to: "Wakad" }
      ];
      hList.innerHTML = historyData.map(h => \`
        <div class="p-3 rounded-2xl bg-white border border-slate-200 text-xs">
          <div class="flex justify-between items-center pb-1.5 border-b border-slate-100">
            <span class="font-black font-mono">\${h.scooter} <span class="text-slate-400 font-normal">#\${h.id}</span></span>
            <span class="font-bold text-slate-900 font-mono">₹\${h.fare}</span>
          </div>
          <div class="flex items-center gap-1.5 font-medium text-slate-700 mt-1.5">
            <span>\${h.from}</span> ➔ <span>\${h.to}</span>
          </div>
          <div class="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>\${h.date}</span>
            <span>\${h.dist}</span>
          </div>
        </div>
      \`).join('');
    }

    // BOOTSTRAP
    window.onload = function() {
      initMap();
      renderScooterList();
      renderHistory();
      translateApp('EN');
    };
  </script>
</body>
</html>`;
}
