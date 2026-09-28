export type TabType = 'home' | 'telemetry' | 'intake' | 'alerts' | 'settings';

export type UserRole = 'Farmer' | 'Supervisor' | 'FPO Lead' | 'Field Tech';

export type ViewMode = 'Smallholder View' | 'FPO View';

export type Language = 'en' | 'hi';

export interface BatchItem {
  id: string;
  batchNumber: string;
  cropName: string;
  scientificName: string;
  cultivar: string;
  storedDate: string;
  weightKg: number;
  crates: number;
  shelfLifeDaysTotal: number;
  shelfLifeDaysLeft: number;
  freshnessPercent: number;
  targetTemp: string;
  targetHumidity: string;
  status: 'safe' | 'warning' | 'critical' | 'dispatched';
  rackBay: string;
  chamberId: string;
  imageUrl: string;
  conditionTags: string[];
}

export interface ChamberTelemetry {
  chamberId: string;
  name: string;
  zone: string;
  status: 'ONLINE' | 'STANDBY' | 'WARNING';
  currentTemp: number;
  targetTemp: number;
  tempVariance: string;
  humidityRh: number;
  targetHumidityRh: number;
  solarWatts: number;
  batteryPercent: number;
  batteryHours: number;
  compressorDuty: number;
  airflowSpeed: number;
  doorState: 'LOCKED' | 'AJAR' | 'OPEN';
  doorClosedDuration: string;
  currentLoadKg: number;
  maxCapacityKg: number;
  activeCrates: number;
  autoCoolingEnabled: boolean;
  camMode: 'mist' | 'day' | 'ir';
}

export interface SystemAlert {
  id: string;
  title: string;
  category: 'critical' | 'warning' | 'resolved';
  severityTag: string;
  timeAgo: string;
  timestamp: string;
  description: string;
  chamberId: string;
  ambientTemp?: number;
  maxThreshold?: number;
  statusText: string;
  batchRef?: string;
  actionPrimary?: string;
  actionSecondary?: string;
  resolved: boolean;
}

export interface MandiRate {
  market: string;
  commodity: string;
  modalPricePerKg: number;
  changePercent: number;
  arrivalTons: number;
  recommendation: 'Sell' | 'Hold' | 'Dispatch Now';
}
