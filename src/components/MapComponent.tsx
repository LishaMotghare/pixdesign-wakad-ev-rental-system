import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Scooter, Language } from '../types';
import { WAKAD_CENTER, KEY_AREAS } from '../data/mockData';
import { getTranslation } from '../translations';

interface MapComponentProps {
  scooters: Scooter[];
  selectedScooterId?: string;
  onSelectScooter?: (scooter: Scooter) => void;
  language: Language;
  heightClass?: string;
  isLiveRide?: boolean;
  livePosition?: { lat: number; lng: number };
}

export const MapComponent: React.FC<MapComponentProps> = ({
  scooters,
  selectedScooterId,
  onSelectScooter,
  language,
  heightClass = 'h-64 sm:h-72',
  isLiveRide = false,
  livePosition,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const liveMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create Map centered at Wakad Bridge (18.5970, 73.7741)
    const map = L.map(mapContainerRef.current, {
      center: [WAKAD_CENTER.lat, WAKAD_CENTER.lng],
      zoom: isLiveRide ? 15 : 13,
      zoomControl: false,
      attributionControl: false,
    });

    // Add OpenStreetMap tiles (No API key required!)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Zoom control in top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // 5km Blue Dotted Geofence around Wakad Bridge
    const geofenceCircle = L.circle([WAKAD_CENTER.lat, WAKAD_CENTER.lng], {
      radius: WAKAD_CENTER.geofenceRadiusMeters, // 5000m
      color: '#0284c7', // Sky-600 blue
      weight: 2.5,
      dashArray: '6, 8',
      fillColor: '#38bdf8',
      fillOpacity: 0.08,
    }).addTo(map);

    geofenceCircle.bindPopup(
      `<div class="text-xs font-sans">
        <strong class="text-sky-800">5km Wakad Geofence</strong><br/>
        Authorized EV Riding Zone
      </div>`
    );

    // Add Area Zone Labels (Wakad Bridge, Dange Chowk, Hinjewadi, Baner, Thergaon)
    KEY_AREAS.forEach((area) => {
      const areaIcon = L.divIcon({
        className: 'custom-area-label',
        html: `
          <div class="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-semibold border border-white/20 shadow-md whitespace-nowrap -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            <span>${area.name}</span>
          </div>
        `,
        iconSize: [0, 0],
      });
      L.marker([area.lat, area.lng], { icon: areaIcon }).addTo(map);
    });

    // Layer Group for Scooter Markers
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    // Recalculate dimensions on window resize
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update scooter markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    scooters.forEach((scooter) => {
      const isSelected = scooter.id === selectedScooterId;

      // Color code by battery
      let batteryColor = 'bg-emerald-500 text-white';
      if (scooter.battery < 50) {
        batteryColor = 'bg-amber-500 text-white';
      }
      if (scooter.battery < 30) {
        batteryColor = 'bg-rose-500 text-white';
      }

      const customIcon = L.divIcon({
        className: 'scooter-marker-pin',
        html: `
          <div class="cursor-pointer group relative -translate-x-1/2 -translate-y-full pb-1 transition-transform">
            ${
              isSelected
                ? `<div class="absolute -inset-2 bg-sky-400/40 rounded-full animate-ping pointer-events-none"></div>`
                : ''
            }
            <div class="flex items-center gap-1 px-2 py-1 rounded-xl shadow-lg border ${
              isSelected
                ? 'bg-slate-950 text-white border-sky-400 ring-2 ring-sky-400/50 scale-110'
                : 'bg-white text-slate-900 border-slate-300 hover:border-slate-800'
            }">
              <div class="w-4 h-4 rounded-full flex items-center justify-center ${
                isSelected ? 'bg-sky-400 text-slate-950' : 'bg-[#0F2C59] text-white'
              }">
                <svg viewBox="0 0 24 24" class="w-2.5 h-2.5 fill-current">
                  <path d="M19 13h-4v-2h4a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-4.18A3 3 0 0 0 8 2.05V4H5a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2v2H5a3 3 0 0 0-3 3v1h20v-1a3 3 0 0 0-3-3zM5 12a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h10v6H5z"/>
                </svg>
              </div>
              <div class="flex flex-col">
                <span class="text-[10px] font-extrabold leading-none tracking-tight">${scooter.id}</span>
                <span class="text-[9px] font-bold ${scooter.battery < 50 ? 'text-amber-500' : 'text-emerald-500'}">
                  ${scooter.battery}%
                </span>
              </div>
            </div>
            <!-- Pointer Arrow -->
            <div class="w-2 h-2 mx-auto rotate-45 -mt-1 ${
              isSelected ? 'bg-slate-950 border-r border-b border-sky-400' : 'bg-white border-r border-b border-slate-300'
            }"></div>
          </div>
        `,
        iconSize: [60, 42],
        iconAnchor: [30, 42],
      });

      const marker = L.marker([scooter.lat, scooter.lng], { icon: customIcon });

      marker.on('click', () => {
        if (onSelectScooter) {
          onSelectScooter(scooter);
        }
      });

      marker.bindPopup(`
        <div class="text-xs font-sans min-w-[140px] p-1">
          <div class="flex items-center justify-between font-bold border-b pb-1 mb-1 text-slate-900">
            <span>${scooter.id}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded ${batteryColor}">${scooter.battery}%</span>
          </div>
          <div class="text-slate-600 text-[11px] space-y-0.5">
            <div>📍 ${scooter.area}</div>
            <div>⚡ ${scooter.rangeKm} km est. range</div>
            <div>📏 ${scooter.distance} away</div>
          </div>
        </div>
      `);

      marker.addTo(markersLayer);
    });

    // If a scooter is selected, center map on it
    if (selectedScooterId) {
      const selected = scooters.find((s) => s.id === selectedScooterId);
      if (selected) {
        map.panTo([selected.lat, selected.lng], { animate: true, duration: 0.6 });
      }
    }
  }, [scooters, selectedScooterId, onSelectScooter]);

  // Live Position Marker during ride
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !isLiveRide || !livePosition) {
      if (liveMarkerRef.current) {
        liveMarkerRef.current.remove();
        liveMarkerRef.current = null;
      }
      return;
    }

    const liveIcon = L.divIcon({
      className: 'live-rider-marker',
      html: `
        <div class="relative -translate-x-1/2 -translate-y-1/2">
          <div class="w-10 h-10 rounded-full bg-sky-500/30 animate-ping absolute -inset-1"></div>
          <div class="w-8 h-8 rounded-full bg-slate-950 border-2 border-white shadow-xl flex items-center justify-center text-sky-400">
            <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    if (!liveMarkerRef.current) {
      liveMarkerRef.current = L.marker([livePosition.lat, livePosition.lng], {
        icon: liveIcon,
        zIndexOffset: 1000,
      }).addTo(map);
    } else {
      liveMarkerRef.current.setLatLng([livePosition.lat, livePosition.lng]);
    }

    map.panTo([livePosition.lat, livePosition.lng], { animate: true, duration: 0.4 });
  }, [isLiveRide, livePosition]);

  return (
    <div className="relative w-full overflow-hidden bg-slate-200">
      <div ref={mapContainerRef} className={`w-full ${heightClass}`} />

      {/* Geofence HUD indicator */}
      <div className="absolute bottom-2 left-2 z-20 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-white text-[10px] font-medium border border-white/10 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          <span>{getTranslation(language, 'geofenceStatus')}</span>
        </div>
      </div>
    </div>
  );
};
