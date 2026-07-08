// ─── VIN Decoder ─────────────────────────────────────────────────────────────
//
// Decodes the first 3 characters (WMI) to identify the manufacturer and
// position 10 (index 9) to get the model year.
// Only covers brands present in our mock data.

export interface VinInfo {
  vin: string;
  valid: boolean;
  error?: string;
  wmi?: string;
  brandKey?: string;
  brand?: string;
  an?: number;
}

// WMI (first 3 chars) → brand
const WMI_BRANDS: Record<string, { brandKey: string; brand: string }> = {
  // BMW
  WBA: { brandKey: 'bmw',        brand: 'BMW' },
  WBS: { brandKey: 'bmw',        brand: 'BMW' },
  WBX: { brandKey: 'bmw',        brand: 'BMW' },
  WBY: { brandKey: 'bmw',        brand: 'BMW' },
  // Audi
  WAU: { brandKey: 'audi',       brand: 'Audi' },
  WA1: { brandKey: 'audi',       brand: 'Audi' },
  // Mercedes-Benz
  WDB: { brandKey: 'mercedes',   brand: 'Mercedes' },
  WDC: { brandKey: 'mercedes',   brand: 'Mercedes' },
  WDD: { brandKey: 'mercedes',   brand: 'Mercedes' },
  // Volkswagen
  WVW: { brandKey: 'volkswagen', brand: 'Volkswagen' },
  WV2: { brandKey: 'volkswagen', brand: 'Volkswagen' },
  WV3: { brandKey: 'volkswagen', brand: 'Volkswagen' },
  // Ford (European + American)
  WF0: { brandKey: 'ford',       brand: 'Ford' },
  '1FA': { brandKey: 'ford',     brand: 'Ford' },
  '1FB': { brandKey: 'ford',     brand: 'Ford' },
  // Opel/Vauxhall
  W0L: { brandKey: 'opel',       brand: 'Opel' },
  // Renault
  VF1: { brandKey: 'renault',    brand: 'Renault' },
  VNA: { brandKey: 'renault',    brand: 'Renault' },
  // Skoda
  TMB: { brandKey: 'skoda',      brand: 'Skoda' },
  // Toyota (European + Japanese)
  SB1: { brandKey: 'toyota',     brand: 'Toyota' },
  JT2: { brandKey: 'toyota',     brand: 'Toyota' },
  JT3: { brandKey: 'toyota',     brand: 'Toyota' },
  // Peugeot
  VF3: { brandKey: 'peugeot',    brand: 'Peugeot' },
  VF7: { brandKey: 'peugeot',    brand: 'Peugeot' },
  // Volvo
  YV1: { brandKey: 'volvo',      brand: 'Volvo' },
  YV2: { brandKey: 'volvo',      brand: 'Volvo' },
  // Honda (European + Japanese)
  SHH: { brandKey: 'honda',      brand: 'Honda' },
  JHM: { brandKey: 'honda',      brand: 'Honda' },
};

// Position 10 (index 9) → model year (cycles every 30 years; we cover 2000–2026)
const YEAR_CODES: Record<string, number> = {
  Y: 2000,
  '1': 2001, '2': 2002, '3': 2003, '4': 2004, '5': 2005,
  '6': 2006, '7': 2007, '8': 2008, '9': 2009,
  A: 2010, B: 2011, C: 2012, D: 2013, E: 2014,
  F: 2015, G: 2016, H: 2017, J: 2018, K: 2019,
  L: 2020, M: 2021, N: 2022, P: 2023, R: 2024,
  S: 2025, T: 2026,
};

// ── Demo VINs (one per car in BAZA) ─────────────────────────────────────────
export const DEMO_VINS: { vin: string; label: string }[] = [
  { vin: 'WBAFG610XEAB12345', label: 'BMW Seria 5 F10 · 2014' },
  { vin: 'WBAAD410X9B123456', label: 'BMW Seria 3 E90 · 2009' },
  { vin: 'WAUJN44B0DAB34567', label: 'Audi A6 C7 · 2013' },
  { vin: 'WAUJN21B0BAB45678', label: 'Audi A4 B8 · 2011' },
  { vin: 'WDDJG54B0AAB56789', label: 'Mercedes C W204 · 2010' },
  { vin: 'WDDJJ54B0CAB67890', label: 'Mercedes E W212 · 2012' },
  { vin: 'WVWZZZ3C0CAB78901', label: 'VW Passat B7 · 2012' },
  { vin: 'WVWZZZ1K0AAB89012', label: 'VW Golf VI · 2010' },
  { vin: 'WF0FXX1J0CAB90123', label: 'Ford Focus MK3 · 2012' },
  { vin: 'W0L0AHH8XBAB12345', label: 'Opel Astra J · 2011' },
  { vin: 'VF1KMB1B0AAB23456', label: 'Renault Megane III · 2010' },
  { vin: 'TMBGG21U09BB34567', label: 'Skoda Octavia II · 2009' },
  { vin: 'SB1ZZZ1K0BAB45678', label: 'Toyota Avensis T27 · 2011' },
  { vin: 'VF3CZMFP0AAB56789', label: 'Peugeot 308 T7 · 2010' },
  { vin: 'YV1DZ8140DAB67890', label: 'Volvo V40 MK2 · 2013' },
  { vin: 'SHHJG5180AAB78901', label: 'Honda Civic FK2 · 2010' },
];

export function decodeVin(raw: string): VinInfo {
  const vin = raw.trim().toUpperCase().replace(/\s+/g, '');

  if (vin.length !== 17) {
    return { vin, valid: false, error: 'VIN-ul trebuie să aibă exact 17 caractere.' };
  }
  if (/[IOQ]/.test(vin)) {
    return { vin, valid: false, error: 'VIN-ul nu poate conține literele I, O sau Q.' };
  }
  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) {
    return { vin, valid: false, error: 'VIN-ul conține caractere invalide.' };
  }

  const wmi = vin.slice(0, 3);
  const brandData = WMI_BRANDS[wmi];
  const yearChar = vin[9];
  const an = YEAR_CODES[yearChar];

  return {
    vin,
    valid: true,
    wmi,
    brandKey: brandData?.brandKey,
    brand:    brandData?.brand,
    an,
  };
}
