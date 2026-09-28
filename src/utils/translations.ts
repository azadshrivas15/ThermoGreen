import { Language } from '../types';

export interface TranslationDictionary {
  langName: string;
  brandName: string;
  chamberOnline: string;
  iotSyncLive: string;

  // Tabs
  navHome: string;
  navTelemetry: string;
  navNewEntry: string;
  navAlerts: string;
  navSettings: string;

  // Roles
  roleFarmer: string;
  roleSupervisor: string;
  roleFPOLike: string;
  roleFieldTech: string;

  // Subtitles
  subHome: string;
  subTelemetry: string;
  subAlerts: string;
  subSettings: string;
  subIntake: string;

  // Home Screen
  smallholderView: string;
  fpoView: string;
  chamberStable: string;
  batchSafe: string;
  batchRef: string;
  freshProduceLot: string;
  storedDate: string;
  optimalMarketWindow: string;
  daysUnit: string;
  daysLeft: string;
  targetShelfLife: string;
  fresh: string;
  targetRange: string;
  humidity: string;
  addCropBatch: string;
  viewBatchDetailsQR: string;
  chamberHealthTelemetry: string;
  operational: string;
  coolingPlant: string;
  compressorDuty: string;
  activeStatus: string;
  airCirculation: string;
  airflowSpeed: string;
  optimalStatus: string;
  backupBattery: string;
  solarLinkedReady: string;
  chamberDoor: string;
  regionalMandiAdvisory: string;
  mandiPriceBadge: string;
  mandiAdvisoryText: string;
  updatedAgo: string;
  viewMandiRates: string;

  // Intake Screen
  step1: string;
  step2: string;
  step3: string;
  cropInflowIntake: string;
  intakePortA2: string;
  enterCropName: string;
  quantityAndBags: string;
  tareCalibrated: string;
  cratesLabel: string;
  harvestCondition: string;
  freshHarvest: string;
  gradeA: string;
  preCooled: string;
  verifyCalculate: string;
  runningAnalysis: string;
  optimalCalibrated: string;
  recognitionValidated: string;
  safeStorageWindow: string;
  tempLabel: string;
  humidityLabel: string;
  ethyleneLabel: string;
  medLabel: string;
  fallbackHandlingMode: string;
  unknownVariety: string;
  fallbackDesc: string;
  quickManualCalib: string;
  coldCellDestination: string;
  rackBayLabel: string;
  iotSyncVerified: string;
  actuatingLoop: string;
  chamberActiveGuarded: string;
  startMonitoringLoop: string;

  // Telemetry Screen
  activeMonitoringZone: string;
  liveAgo: string;
  storageTemp: string;
  safeZone: string;
  targetTempPrefix: string;
  trendLine12h: string;
  minMaxRange: string;
  relativeRH: string;
  optimalPill: string;
  safeRangeRH: string;
  preventsDecay: string;
  powerGrid: string;
  selfSustained: string;
  solarArrayInput: string;
  peakHigh: string;
  lifePO4Storage: string;
  autoCoolingTitle: string;
  pidControl: string;
  coolingTargetSetpoint: string;
  chamberCapacityTitle: string;
  loadedBadge: string;
  currentKg: string;
  availableKg: string;
  maxRating: string;
  activeCratesCount: string;
  interiorCamTitle: string;
  zoneAHD: string;
  irNightMist: string;
  eventLogTitle: string;
  exportCSV: string;

  // Alerts Screen
  alertsSystemStatus: string;
  actionRequired: string;
  alertsSubtitle: string;
  filterAll: string;
  filterCritical: string;
  filterWarnings: string;
  filterResolved: string;
  noResolvedAlerts: string;
  allClearTitle: string;
  allClearDesc: string;
  resetCompressorRelay: string;
  emergencySupport: string;
  scheduleImmediateDispatch: string;
  openIntakeSlot: string;
  resubmitProductData: string;
  systemDiagnosticsSummary: string;
  hardwareHealthy: string;
  tempProbes: string;
  humidityProbes: string;
  solarInverter: string;
  probesPassText: string;
  runSelfTest: string;
  testingBus: string;

  // Settings Screen
  hardwareSettingsTitle: string;
  hardwareSettingsDesc: string;
  hardwareSubtitle: string;
  firmwareVersion: string;
  languageOption: string;
  iotMeshGateway: string;
  iotGatewayMesh: string;
  nodesActive: string;
  protocolLabel: string;
  protocol: string;
  signalRssi: string;
  telemetryInterval: string;
  syncLatency: string;
  chamberCalibrationSetpoints: string;
  chamberCalibration: string;
  tempProbeOffset: string;
  probeOffset: string;
  humidifierDutyCycle: string;
  humidifierPulse: string;
  ecoPowerManagement: string;
  ecoPower: string;
  ecoPowerDesc: string;
  mandiAlertsSetting: string;
  mandiAlertsDesc: string;
  mandiPriceAlerts: string;
  mandiPriceAlertsDesc: string;
  activeFieldOperator: string;
  shiftActive: string;
  saveHardwareCalib: string;
  saveHardware: string;

  // Modals
  traceabilityTitle: string;
  batchTraceabilityTitle: string;
  certifiedColdChain: string;
  scanMandiGate: string;
  scanAtMandiGate: string;
  cropCultivar: string;
  netWeightCrates: string;
  storageDestination: string;
  intakeTimestamp: string;
  shelfLifePrediction: string;
  thermalIntegrityGuaranteed: string;
  thermalGuaranteed: string;
  thermalIntegrityDesc: string;
  thermalGuaranteedDesc: string;
  printCrateTags: string;
  shareCertificate: string;
  mandiIntelligenceTitle: string;
  regionalMandiIntelligence: string;
  mandiIntelligenceSubtitle: string;
  arbitrageTimingWindow: string;
  arbitrageTimingText: string;
  optimalNow: string;
  wholesaleRealizations: string;
  reserveReefer: string;
  reserveReeferVehicle: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    langName: 'English',
    brandName: 'VeggieCare',
    chamberOnline: 'Chamber #1 Online • ',
    iotSyncLive: 'IoT Sync Live',

    // Tabs
    navHome: 'Home',
    navTelemetry: 'Telemetry',
    navNewEntry: 'New Entry',
    navAlerts: 'Alerts',
    navSettings: 'Settings',

    // Roles
    roleFarmer: 'Farmer',
    roleSupervisor: 'Supervisor',
    roleFPOLike: 'FPO Lead',
    roleFieldTech: 'Field Tech',

    // Subtitles
    subHome: 'Home Dashboard',
    subTelemetry: 'Live Telemetry',
    subAlerts: 'System Alerts',
    subSettings: 'Hardware Settings',
    subIntake: 'Crop Inflow Intake',

    // Home Screen
    smallholderView: 'Smallholder View',
    fpoView: 'FPO View',
    chamberStable: 'Chamber Stable',
    batchSafe: 'Batch Safe',
    batchRef: 'BATCH REF:',
    freshProduceLot: 'Fresh Produce Lot',
    storedDate: 'Stored:',
    optimalMarketWindow: 'Optimal Market Window',
    daysUnit: 'Days',
    daysLeft: 'Left',
    targetShelfLife: 'Target shelf-life with active micro-climate regulation',
    fresh: 'Fresh',
    targetRange: 'Target: 7-9°C',
    humidity: 'Humidity',
    addCropBatch: 'Add Crop Batch',
    viewBatchDetailsQR: 'View Batch Details & QR Code',
    chamberHealthTelemetry: 'Chamber Health & Telemetry',
    operational: 'Operational',
    coolingPlant: 'Cooling Plant',
    compressorDuty: 'Compressor Duty:',
    activeStatus: 'Active',
    airCirculation: 'Air Circulation',
    airflowSpeed: 'Speed:',
    optimalStatus: 'Optimal',
    backupBattery: 'Backup Battery',
    solarLinkedReady: 'Solar Linked & Ready',
    chamberDoor: 'Chamber Door',
    regionalMandiAdvisory: 'Regional Mandi Advisory',
    mandiPriceBadge: '+8% Nashik APMC',
    mandiAdvisoryText: 'High demand detected in Nashik and Pune APMCs. Grade A tomatoes are fetching an 8% premium over local farmgate prices today.',
    updatedAgo: 'Updated 25m ago',
    viewMandiRates: 'View Mandi Rates',

    // Intake Screen
    step1: '1. Details',
    step2: '2. IoT Validation',
    step3: '3. Registry',
    cropInflowIntake: 'Crop Inflow Intake',
    intakePortA2: 'Intake Port A2',
    enterCropName: 'Enter Crop / Product Name',
    quantityAndBags: 'Quantity & Bags',
    tareCalibrated: '±0.2kg tare weight calibrated',
    cratesLabel: 'Crates',
    harvestCondition: 'Harvest & Inflow Condition',
    freshHarvest: 'Fresh Harvest',
    gradeA: 'Grade A',
    preCooled: 'Pre-cooled',
    verifyCalculate: 'Verify & Calculate Optimal Conditions',
    runningAnalysis: 'Running Optical Spec Analysis...',
    optimalCalibrated: 'Optimal Conditions Calibrated',
    recognitionValidated: 'Recognition Engine Validated',
    safeStorageWindow: 'Safe Storage Window',
    tempLabel: 'Temp',
    humidityLabel: 'Humidity',
    ethyleneLabel: 'Ethylene',
    medLabel: 'Medium',
    fallbackHandlingMode: 'Diagnostic: Fallback Handling Mode',
    unknownVariety: 'Unknown Variety / Optical Mismatch',
    fallbackDesc: 'If specimen classification falls below 92% confidence threshold, manual thermal override is activated.',
    quickManualCalib: 'Quick Manual Calibration',
    coldCellDestination: 'Cold Cell Destination',
    rackBayLabel: 'Rack Bay',
    iotSyncVerified: 'IoT Sensor Hub Sync Verified • 4 Nodes Online',
    actuatingLoop: 'Actuating Cold Chain Loop...',
    chamberActiveGuarded: 'Chamber B-03 Active & Guarded',
    startMonitoringLoop: 'Start Monitoring Loop',

    // Telemetry Screen
    activeMonitoringZone: 'Active Monitoring Zone',
    liveAgo: 'Live 10s ago',
    storageTemp: 'Storage Temp',
    safeZone: 'SAFE ZONE',
    targetTempPrefix: 'Target',
    trendLine12h: '12h Trend Line',
    minMaxRange: 'Min: 7.9°C • Max: 8.4°C',
    relativeRH: 'Relative RH',
    optimalPill: 'Optimal',
    safeRangeRH: 'Safe Range: 80% - 90% RH',
    preventsDecay: 'Prevents mass-loss & decay',
    powerGrid: 'Power Grid',
    selfSustained: 'Self-Sustained',
    solarArrayInput: 'Solar Array Input',
    peakHigh: 'Peak High',
    lifePO4Storage: 'LiFePO4 Storage',
    autoCoolingTitle: 'Auto-Cooling',
    pidControl: 'PID Closed Loop Control',
    coolingTargetSetpoint: 'Cooling Target Setpoint',
    chamberCapacityTitle: 'Chamber Capacity',
    loadedBadge: 'LOADED',
    currentKg: 'Current:',
    availableKg: 'Available:',
    maxRating: 'Max Rating',
    activeCratesCount: 'Active Crates',
    interiorCamTitle: 'Chamber Interior Cam',
    zoneAHD: 'Zone A • HD',
    irNightMist: 'IR Night & Mist Compensated • 1080p Stream',
    eventLogTitle: 'Telemetry Event Log',
    exportCSV: 'Export CSV',

    // Alerts Screen
    alertsSystemStatus: 'Alerts & System Status',
    actionRequired: 'Action Required',
    alertsSubtitle: 'Continuous cold-chain integrity monitoring. Real-time sensor triggers and hardware diagnostics.',
    filterAll: 'All',
    filterCritical: 'Critical',
    filterWarnings: 'Warnings',
    filterResolved: 'Resolved',
    noResolvedAlerts: 'No Resolved Alerts Yet',
    allClearTitle: 'All Clear in Cold Chambers',
    allClearDesc: 'Sensors report normal temperature, humidity, and airflow levels across all rack bays.',
    resetCompressorRelay: 'Reset Compressor Relay',
    emergencySupport: 'Emergency Support',
    scheduleImmediateDispatch: 'Schedule Immediate Dispatch / Market Release',
    openIntakeSlot: 'Open Intake Slot for FPO Farmers',
    resubmitProductData: 'Resubmit Product Data / Manual Override',
    systemDiagnosticsSummary: 'System Diagnostics Summary',
    hardwareHealthy: 'Hardware Healthy',
    tempProbes: 'Temp Probes',
    humidityProbes: 'Humidity',
    solarInverter: 'Solar Inverter',
    probesPassText: 'All Telemetry Probes Online. Last automated self-test passed at 06:00 AM Today.',
    runSelfTest: 'Run On-Demand Self-Test',
    testingBus: 'Testing bus...',

    // Settings Screen
    hardwareSettingsTitle: 'Hardware Settings',
    hardwareSettingsDesc: 'Solar micro-cold room hardware parameters and IoT calibration',
    hardwareSubtitle: 'Solar micro-cold room hardware parameters and IoT calibration',
    firmwareVersion: 'Firmware v2.4.1',
    languageOption: 'Language / भाषा',
    iotMeshGateway: 'IoT Gateway & Node Mesh',
    iotGatewayMesh: 'IoT Gateway & Node Mesh',
    nodesActive: '4 Nodes Active',
    protocolLabel: 'Protocol',
    protocol: 'Protocol',
    signalRssi: 'Signal RSSI',
    telemetryInterval: 'Telemetry Interval',
    syncLatency: 'Sync Latency',
    chamberCalibrationSetpoints: 'Chamber Calibration Setpoints',
    chamberCalibration: 'Chamber Calibration Setpoints',
    tempProbeOffset: 'PT100 Temperature Probe Offset (°C)',
    probeOffset: 'PT100 Temperature Probe Offset (°C)',
    humidifierDutyCycle: 'Ultrasonic Humidifier Duty Cycle',
    humidifierPulse: 'Ultrasonic Humidifier Duty Cycle',
    ecoPowerManagement: 'Eco Power Management',
    ecoPower: 'Eco Power Management',
    ecoPowerDesc: 'Automatically scales compressor duty down to 60% during cloud cover or battery levels below 35% to preserve produce shelf-life safely.',
    mandiAlertsSetting: 'APMC Mandi Price Alerts',
    mandiAlertsDesc: 'Receive instant SMS and push notifications when regional mandi prices increase by >5% for stored produce batches.',
    mandiPriceAlerts: 'APMC Mandi Price Alerts',
    mandiPriceAlertsDesc: 'Receive instant SMS and push notifications when regional mandi prices increase by >5% for stored produce batches.',
    activeFieldOperator: 'Active Field Operator',
    shiftActive: 'Shift Active',
    saveHardwareCalib: 'Save Hardware Calibration',
    saveHardware: 'Save Hardware Calibration',

    // Modals
    traceabilityTitle: 'Batch Traceability & QR',
    batchTraceabilityTitle: 'Batch Traceability & QR',
    certifiedColdChain: 'Cold Chain Certified',
    scanMandiGate: 'Scan at APMC Mandi gate for cold-chain verification',
    scanAtMandiGate: 'Scan at APMC Mandi gate for cold-chain verification',
    cropCultivar: 'Crop / Cultivar',
    netWeightCrates: 'Net Weight & Crates',
    storageDestination: 'Storage Destination',
    intakeTimestamp: 'Intake Timestamp',
    shelfLifePrediction: 'Shelf-Life Prediction',
    thermalIntegrityGuaranteed: 'IoT Thermal Integrity Guaranteed',
    thermalGuaranteed: 'IoT Thermal Integrity Guaranteed',
    thermalIntegrityDesc: 'Chamber held continuous 8.1°C ±0.3°C variance with ultrasonic relative humidity stable at 86% RH. Zero spoilage excursions logged.',
    thermalGuaranteedDesc: 'Chamber held continuous 8.1°C ±0.3°C variance with ultrasonic relative humidity stable at 86% RH. Zero spoilage excursions logged.',
    printCrateTags: 'Print Crate Tags',
    shareCertificate: 'Share Certificate',
    mandiIntelligenceTitle: 'Regional Mandi Intelligence',
    regionalMandiIntelligence: 'Regional Mandi Intelligence',
    mandiIntelligenceSubtitle: 'Live APMC wholesale price feeds & dispatch advisory',
    arbitrageTimingWindow: 'Arbitrage & Timing Window',
    arbitrageTimingText: 'Wholesale arrivals from southern hubs are delayed by 18 hours. Prices at Nashik and Pune APMC reflect an 8% premium for pre-cooled, graded tomatoes. Recommended dispatch window: Next 24 to 36 hours.',
    optimalNow: 'Optimal Now',
    wholesaleRealizations: 'Wholesale Yard Realizations (Today)',
    reserveReefer: 'Reserve Refrigerated Reefer Vehicle',
    reserveReeferVehicle: 'Reserve Refrigerated Reefer Vehicle',
  },

  hi: {
    langName: 'हिंदी',
    brandName: 'वेजीकेयर (VeggieCare)',
    chamberOnline: 'चैंबर #1 चालू • ',
    iotSyncLive: 'IoT सिंक सक्रिय',

    // Tabs
    navHome: 'होम',
    navTelemetry: 'टेलीमेट्री',
    navNewEntry: 'नई एंट्री',
    navAlerts: 'अलर्ट',
    navSettings: 'सेटिंग्स',

    // Roles
    roleFarmer: 'किसान',
    roleSupervisor: 'सुपरवाइजर',
    roleFPOLike: 'FPO प्रमुख',
    roleFieldTech: 'तकनीशियन',

    // Subtitles
    subHome: 'होम डैशबोर्ड',
    subTelemetry: 'लाइव टेलीमेट्री',
    subAlerts: 'सिस्टम अलर्ट',
    subSettings: 'हार्डवेयर सेटिंग्स',
    subIntake: 'फसल आवक इनटेक',

    // Home Screen
    smallholderView: 'किसान दृश्य',
    fpoView: 'FPO दृश्य',
    chamberStable: 'चैंबर सुरक्षित',
    batchSafe: 'बैच सुरक्षित',
    batchRef: 'बैच संख्या:',
    freshProduceLot: 'ताज़ा उपज लॉट',
    storedDate: 'भंडारण तिथि:',
    optimalMarketWindow: 'सर्वोत्तम बाज़ार बिक्री अवधि',
    daysUnit: 'दिन',
    daysLeft: 'शेष',
    targetShelfLife: 'सक्रिय सोलर माइक्रो-क्लाइमेट नियंत्रण द्वारा संरक्षित',
    fresh: 'ताज़ा',
    targetRange: 'लक्षित: 7-9°C',
    humidity: 'आर्द्रता',
    addCropBatch: 'नई फसल बैच जोड़ें',
    viewBatchDetailsQR: 'बैच विवरण और QR कोड देखें',
    chamberHealthTelemetry: 'चैंबर स्वास्थ्य व टेलीमेट्री',
    operational: 'सक्रिय चालू',
    coolingPlant: 'कूलिंग प्लांट',
    compressorDuty: 'कंप्रेसर गति:',
    activeStatus: 'चालू',
    airCirculation: 'वायु प्रवाह',
    airflowSpeed: 'गति:',
    optimalStatus: 'इष्टतम',
    backupBattery: 'सोलर बैटरी',
    solarLinkedReady: 'सोलर संचालित व तैयार',
    chamberDoor: 'चैंबर दरवाज़ा',
    regionalMandiAdvisory: 'क्षेत्रीय मंडी भाव सलाह',
    mandiPriceBadge: '+8% नासिक APMC',
    mandiAdvisoryText: 'नासिक और पुणे APMC में उच्च मांग। ग्रेड A टमाटर पर स्थानीय खेत भाव से 8% अधिक मूल्य मिल रहा है।',
    updatedAgo: '25 मिनट पहले अपडेट',
    viewMandiRates: 'मंडी भाव देखें',

    // Intake Screen
    step1: '1. विवरण',
    step2: '2. IoT सत्यापन',
    step3: '3. रजिस्ट्री',
    cropInflowIntake: 'फसल आवक इनटेक',
    intakePortA2: 'इनटेक पोर्ट A2',
    enterCropName: 'फसल या उत्पाद का नाम चुनें',
    quantityAndBags: 'मात्रा और क्रेट संख्या',
    tareCalibrated: '±0.2 किग्रा वजन कैलिब्रेटेड',
    cratesLabel: 'क्रेट्स',
    harvestCondition: 'कटाई और आवक स्थिति',
    freshHarvest: 'ताज़ी कटाई',
    gradeA: 'ग्रेड A',
    preCooled: 'प्री-कूल्ड',
    verifyCalculate: 'सत्यापित करें और सही तापमान निकालें',
    runningAnalysis: 'ऑप्टिकल स्पेक विश्लेषण जारी है...',
    optimalCalibrated: 'इष्टतम परिस्थितियाँ निर्धारित',
    recognitionValidated: 'पहचान प्रणाली द्वारा सत्यापित',
    safeStorageWindow: 'सुरक्षित भंडारण अवधि',
    tempLabel: 'तापमान',
    humidityLabel: 'आर्द्रता',
    ethyleneLabel: 'एथिलीन',
    medLabel: 'मध्यम',
    fallbackHandlingMode: 'डायग्नोस्टिक: फॉलबैक हैंडलिंग मोड',
    unknownVariety: 'अज्ञात किस्म / ऑप्टिकल बेमेल',
    fallbackDesc: 'यदि फसल पहचान 92% से कम विश्वास स्तर पर है, तो मैनुअल थर्मल नियंत्रण सक्रिय होता है।',
    quickManualCalib: 'त्वरित मैनुअल कैलिब्रेशन',
    coldCellDestination: 'कोल्ड सेल भंडारण स्थान',
    rackBayLabel: 'रैक बे',
    iotSyncVerified: 'IoT सेंसर हब सत्यापित • 4 नोड्स ऑनलाइन',
    actuatingLoop: 'कोल्ड चेन लूप शुरू हो रहा है...',
    chamberActiveGuarded: 'चैंबर B-03 सक्रिय और सुरक्षित',
    startMonitoringLoop: 'मॉनिटरिंग चक्र प्रारंभ करें',

    // Telemetry Screen
    activeMonitoringZone: 'सक्रिय निगरानी क्षेत्र',
    liveAgo: '10 सेकंड पहले लाइव',
    storageTemp: 'भंडारण तापमान',
    safeZone: 'सुरक्षित सीमा',
    targetTempPrefix: 'लक्षित',
    trendLine12h: '12 घंटे का तापमान रुझान',
    minMaxRange: 'न्यूनतम: 7.9°C • अधिकतम: 8.4°C',
    relativeRH: 'सापेक्ष आर्द्रता (RH)',
    optimalPill: 'इष्टतम',
    safeRangeRH: 'सुरक्षित सीमा',
    preventsDecay: 'वजन घटने व सड़न से सुरक्षा',
    powerGrid: 'पावर ग्रिड',
    selfSustained: 'आत्मनिर्भर',
    solarArrayInput: 'सोलर पैनल उत्पादन',
    peakHigh: 'उच्चतम उत्पादन',
    lifePO4Storage: 'LiFePO4 बैटरी स्टोरेज',
    autoCoolingTitle: 'ऑटो-कूलिंग सिस्टम',
    pidControl: 'PID स्वचालित नियंत्रण',
    coolingTargetSetpoint: 'कूलिंग लक्षित सेटपॉइंट',
    chamberCapacityTitle: 'चैंबर क्षमता',
    loadedBadge: 'भरा हुआ',
    currentKg: 'वर्तमान वजन:',
    availableKg: 'खाली जगह:',
    maxRating: 'अधिकतम क्षमता',
    activeCratesCount: 'सक्रिय क्रेट्स',
    interiorCamTitle: 'चैंबर आंतरिक कैमरा',
    zoneAHD: 'ज़ोन A • HD',
    irNightMist: 'नाइट विज़न व मिस्ट कंपनसेशन • 1080p लाइव',
    eventLogTitle: 'टेलीमेट्री इवेंट लॉग',
    exportCSV: 'CSV डाउनलोड करें',

    // Alerts Screen
    alertsSystemStatus: 'अलर्ट और सिस्टम स्थिति',
    actionRequired: 'कार्रवाई आवश्यक',
    alertsSubtitle: 'निर्बाध कोल्ड-चेन निगरानी। रियल-टाइम सेंसर चेतावनी और हार्डवेयर डायग्नोस्टिक्स।',
    filterAll: 'सभी',
    filterCritical: 'गंभीर',
    filterWarnings: 'चेतावनियां',
    filterResolved: 'हल किए गए',
    noResolvedAlerts: 'अभी कोई हल किया गया अलर्ट नहीं है',
    allClearTitle: 'सभी कोल्ड रूम सुरक्षित हैं',
    allClearDesc: 'सेंसर सभी रैक बे में सामान्य तापमान, आर्द्रता और वायु प्रवाह की पुष्टि कर रहे हैं।',
    resetCompressorRelay: 'कंप्रेसर रिले रीसेट करें',
    emergencySupport: '24/7 आपातकालीन सहायता',
    scheduleImmediateDispatch: 'तत्काल मंडी प्रेषण शेड्यूल करें',
    openIntakeSlot: 'FPO किसानों के लिए स्लॉट खोलें',
    resubmitProductData: 'फसल जानकारी दोबारा दर्ज करें',
    systemDiagnosticsSummary: 'सिस्टम डायग्नोस्टिक्स सारांश',
    hardwareHealthy: 'हार्डवेयर पूरी तरह स्वस्थ',
    tempProbes: 'तापमान प्रोब',
    humidityProbes: 'आर्द्रता सेंसर',
    solarInverter: 'सोलर इन्वर्टर',
    probesPassText: 'सभी टेलीमेट्री प्रोब ऑनलाइन हैं। अंतिम स्वचालित परीक्षण आज सुबह 06:00 बजे सफल रहा।',
    runSelfTest: 'ऑन-डिमांड परीक्षण चलाएं',
    testingBus: 'परीक्षण जारी है...',

    // Settings Screen
    hardwareSettingsTitle: 'हार्डवेयर सेटिंग्स',
    hardwareSettingsDesc: 'सोलर माइक्रो-कोल्ड रूम पैरामीटर्स और IoT कैलिब्रेशन',
    hardwareSubtitle: 'सोलर माइक्रो-कोल्ड रूम पैरामीटर्स और IoT कैलिब्रेशन',
    firmwareVersion: 'फर्मवेयर v2.4.1',
    languageOption: 'भाषा चुनें (Language)',
    iotMeshGateway: 'IoT गेटवे और नोड मेश',
    iotGatewayMesh: 'IoT गेटवे और नोड मेश',
    nodesActive: '4 नोड्स सक्रिय',
    protocolLabel: 'प्रोटोकॉल',
    protocol: 'प्रोटोकॉल',
    signalRssi: 'सिग्नल शक्ति (RSSI)',
    telemetryInterval: 'टेलीमेट्री अंतराल',
    syncLatency: 'सिंक विलंबता',
    chamberCalibrationSetpoints: 'चैंबर कैलिब्रेशन सेटपॉइंट्स',
    chamberCalibration: 'चैंबर कैलिब्रेशन सेटपॉइंट्स',
    tempProbeOffset: 'PT100 तापमान प्रोब ऑफसेट (°C)',
    probeOffset: 'PT100 तापमान प्रोब ऑफसेट (°C)',
    humidifierDutyCycle: 'अल्ट्रासोनिक ह्यूमिडिफायर चक्र',
    humidifierPulse: 'अल्ट्रासोनिक ह्यूमिडिफायर चक्र',
    ecoPowerManagement: 'इको पावर मोड (बिजली बचत)',
    ecoPower: 'इको पावर मोड (बिजली बचत)',
    ecoPowerDesc: 'धूप कम होने या बैटरी 35% से नीचे जाने पर कंप्रेसर को 60% क्षमता पर लाकर उपज को सुरक्षित रखता है।',
    mandiAlertsSetting: 'APMC मंडी मूल्य SMS अलर्ट',
    mandiAlertsDesc: 'भंडारित फसल के भाव क्षेत्रीय मंडी में 5% से अधिक बढ़ने पर तुरंत SMS व सूचना प्राप्त करें।',
    mandiPriceAlerts: 'APMC मंडी मूल्य SMS अलर्ट',
    mandiPriceAlertsDesc: 'भंडारित फसल के भाव क्षेत्रीय मंडी में 5% से अधिक बढ़ने पर तुरंत SMS व सूचना प्राप्त करें।',
    activeFieldOperator: 'कार्यरत फील्ड ऑपरेटर',
    shiftActive: 'शिफ्ट चालू',
    saveHardwareCalib: 'हार्डवेयर सेटिंग्स सहेजें',
    saveHardware: 'हार्डवेयर सेटिंग्स सहेजें',

    // Modals
    traceabilityTitle: 'बैच ट्रैसेबिलिटी और QR कोड',
    batchTraceabilityTitle: 'बैच ट्रैसेबिलिटी और QR कोड',
    certifiedColdChain: 'कोल्ड-चेन प्रमाणित',
    scanMandiGate: 'कोल्ड-चेन गुणवत्ता सत्यापन के लिए मंडी गेट पर स्कैन करें',
    scanAtMandiGate: 'कोल्ड-चेन गुणवत्ता सत्यापन के लिए मंडी गेट पर स्कैन करें',
    cropCultivar: 'फसल / किस्म',
    netWeightCrates: 'कुल वजन और क्रेट संख्या',
    storageDestination: 'भंडारण कक्ष व रैक',
    intakeTimestamp: 'इनटेक समय',
    shelfLifePrediction: 'शेल्फ-लाइफ अनुमान',
    thermalIntegrityGuaranteed: 'IoT थर्मल अखंडता प्रमाणित',
    thermalGuaranteed: 'IoT थर्मल अखंडता प्रमाणित',
    thermalIntegrityDesc: 'चैंबर में निरंतर 8.1°C ±0.3°C तापमान और 86% RH आर्द्रता बनाए रखी गई। कोई खराबी दर्ज नहीं हुई।',
    thermalGuaranteedDesc: 'चैंबर में निरंतर 8.1°C ±0.3°C तापमान और 86% RH आर्द्रता बनाए रखी गई। कोई खराबी दर्ज नहीं हुई।',
    printCrateTags: 'क्रेट टैग प्रिंट करें',
    shareCertificate: 'सर्टिफिकेट साझा करें',
    mandiIntelligenceTitle: 'क्षेत्रीय मंडी भाव एवं विश्लेषण',
    regionalMandiIntelligence: 'क्षेत्रीय मंडी भाव एवं विश्लेषण',
    mandiIntelligenceSubtitle: 'लाइव APMC थोक भाव और बिक्री सलाह',
    arbitrageTimingWindow: 'बिक्री का सही समय',
    arbitrageTimingText: 'दक्षिणी मंडियों से आवक 18 घंटे विलंबित है। नासिक और पुणे APMC में प्री-कूल्ड, ग्रेडेड टमाटर के भाव में 8% की बढ़ोतरी देखी गई है। अनुशंसित डिस्पैच विंडो: अगले 24 से 36 घंटे।',
    optimalNow: 'अभी उचित समय',
    wholesaleRealizations: 'थोक यार्ड आज के भाव',
    reserveReefer: 'कोल्ड वैन (Reefer) बुक करें',
    reserveReeferVehicle: 'कोल्ड वैन (Reefer) बुक करें',
  },
};
