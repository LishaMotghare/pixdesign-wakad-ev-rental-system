export type Language = 'EN' | 'HI' | 'MR';

export type PageTab = 'home' | 'booking' | 'live' | 'history' | 'revenue' | 'profile';

export interface Scooter {
  id: string; // e.g. "PIX-ES01"
  lat: number;
  lng: number;
  battery: number;
  distance: string; // e.g. "0.3 km"
  distanceKm: number;
  area: string;
  rangeKm: number;
  status: 'available' | 'in_use' | 'reserved';
  plateNo: string;
}

export interface RideRecord {
  id: string;
  scooterId: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  distanceKm: number;
  fareInr: number;
  fromArea: string;
  toArea: string;
  status: 'completed' | 'cancelled';
}

export interface AreaZone {
  name: string;
  lat: number;
  lng: number;
  badge?: string;
}
