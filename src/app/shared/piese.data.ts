// ─── Shared deterministic data for parts ─────────────────────────────────────

export interface PiesaCard {
  id: number;
  titlu: string;
  model: string;
  an: number;
  stare: 'Excelentă' | 'Bună' | 'Acceptabilă';
  pret: number;
  cod: string;
  culoare: string;
  stoc: number;
}

export const MODELE: Record<string, string[]> = {
  audi:       ['A4 B8', 'A6 C6', 'A4 B7', 'A3 8P', 'Q5 8R', 'A6 C7', 'A4 B9', 'Q3 8U'],
  bmw:        ['Seria 3 E90', 'Seria 5 F10', 'Seria 3 F30', 'X5 E53', 'Seria 1 F20', 'X3 F25', 'Seria 5 E60', 'X1 E84'],
  mercedes:   ['C-Class W204', 'E-Class W212', 'C-Class W203', 'E-Class W211', 'CLA W117', 'A-Class W176', 'GLC X253', 'B-Class W246'],
  volkswagen: ['Golf VI', 'Passat B7', 'Tiguan 5N', 'Golf VII', 'Polo 6R', 'Passat B6', 'Touareg 7L', 'Sharan 7N'],
  toyota:     ['Corolla E150', 'Yaris P13', 'Avensis T27', 'RAV4 XA30', 'Auris E180', 'Camry XV50', 'C-HR NGX', 'Prius XW50'],
  ford:       ['Focus MK3', 'Mondeo MK4', 'Focus MK2', 'Fiesta MK7', 'Kuga MK2', 'Mondeo MK5', 'EcoSport B515', 'S-Max MK2'],
  renault:    ['Megane III', 'Clio IV', 'Laguna III', 'Scenic III', 'Duster HS', 'Megane IV', 'Captur J87', 'Kadjar HFE'],
  opel:       ['Astra J', 'Insignia A', 'Corsa D', 'Zafira C', 'Mokka X', 'Astra K', 'Crossland X', 'Grandland X'],
  peugeot:    ['308 T9', '3008 P84', '207 WA', '508 W0', '2008 A94', '308 T7', '5008 P87', '408 T7'],
  skoda:      ['Octavia III', 'Superb III', 'Fabia III', 'Kodiaq NS7', 'Rapid NH3', 'Octavia II', 'Scala NW', 'Karoq NU7'],
  volvo:      ['V40 MK2', 'XC60 MK1', 'V60 MK1', 'XC90 MK2', 'S60 MK3', 'V90 MK2', 'XC40 MK1', 'S90 MK2'],
  honda:      ['Civic FK2', 'CR-V RM', 'Jazz GK', 'HR-V RU', 'Civic FC', 'Accord CU', 'CR-V RW', 'Jazz GE'],
};

export const CULORI = [
  'Negru Metalizat', 'Alb Perlat', 'Gri Argintiu', 'Albastru Metalizat',
  'Roșu', 'Gri Antracit', 'Alb', 'Bej', 'Verde Metalizat', 'Maro',
];

export const PREFIXE_COD: Record<string, string> = {
  'bara-fata':          'BF',
  'bara-spate':         'BS',
  'usi-portiere':       'UP',
  'faruri-fata':        'FF',
  'stopuri-spate':      'ST',
  'capota-motor':       'CM',
  'portbagaj-hayon':    'PH',
  'aripi':              'AR',
  'oglinzi':            'OG',
  'motor-transmisie':   'MT',
  'suspensie-directie': 'SD',
  'interior':           'IN',
};

export const TITLURI_SLUG: Record<string, string> = {
  'bara-fata':          'Bara față',
  'bara-spate':         'Bara spate',
  'usi-portiere':       'Portieră față',
  'faruri-fata':        'Far față',
  'stopuri-spate':      'Stop spate',
  'capota-motor':       'Capotă motor',
  'portbagaj-hayon':    'Hayon / Portbagaj',
  'aripi':              'Aripă față',
  'oglinzi':            'Oglindă retrovizoare',
  'motor-transmisie':   'Motor',
  'suspensie-directie': 'Amortizor față',
  'interior':           'Scaun față',
};

export const TITLURI_EXTRA: Record<string, string[]> = {
  'bara-fata':          ['completă cu proiectoare', 'fără proiectoare', 'cu grile și senzori', 'sport line', 'M-Sport', 'completă vopsită'],
  'bara-spate':         ['completă cu senzori PDC', 'fără senzori', 'cu orificii tobe duble', 'sport', 'completă', 'cu difuzor'],
  'usi-portiere':       ['dreapta față', 'stânga față', 'dreapta spate', 'stânga spate', 'față DR cu geam', 'față ST cu geam'],
  'faruri-fata':        ['dreapta xenon', 'stânga xenon', 'dreapta halogen', 'stânga halogen', 'dreapta LED', 'stânga LED'],
  'stopuri-spate':      ['dreapta LED', 'stânga LED', 'dreapta', 'stânga', 'dreapta cu ceata', 'stânga cu ceata'],
  'capota-motor':       ['completă nevopsită', 'vopsită negru', 'cu șina', 'fără șină', 'cu grilă aer', 'originală'],
  'portbagaj-hayon':    ['cu geam electric', 'fără geam', 'hayon complet', 'capac portbagaj', 'cu spoiler', 'fără spoiler'],
  'aripi':              ['dreapta față', 'stânga față', 'dreapta spate', 'stânga spate', 'cu găuri senzori', 'fără găuri'],
  'oglinzi':            ['dreapta electrică', 'stânga electrică', 'dreapta manuală', 'stânga manuală', 'cu încălzire', 'pliabilă electric'],
  'motor-transmisie':   ['2.0 TDI testat', '1.9 TDI revizuit', '2.2 CDI', '1.6 HDi', '2.0 TFSI', '3.0 TDI complet'],
  'suspensie-directie': ['față dreapta', 'față stânga', 'spate dreapta', 'spate stânga', 'kit complet față', 'cu arc'],
  'interior':           ['față stânga piele', 'față dreapta piele', 'față stânga textil', 'față dreapta textil', 'set complet față', 'cu reglaj electric'],
};

/** Deterministic pseudo-random 0..1 for a given integer seed */
function sRand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function sRandInt(seed: number, min: number, max: number): number {
  return Math.floor(min + sRand(seed) * (max - min + 1));
}

export function genereazaPiesa(brand: string, slug: string, id: number): PiesaCard {
  const brandKey = brand.toLowerCase();
  const modele   = MODELE[brandKey] ?? ['Model I', 'Model II', 'Model III', 'Model IV', 'Model V', 'Model VI'];
  const extras   = TITLURI_EXTRA[slug] ?? ['standard', 'complet', 'original'];
  const titluBaza = TITLURI_SLUG[slug] ?? 'Piesă';
  const prefix    = PREFIXE_COD[slug] ?? 'PI';
  const brandName = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
  const stari: Array<'Excelentă' | 'Bună' | 'Acceptabilă'> = ['Excelentă', 'Bună', 'Bună', 'Acceptabilă', 'Excelentă', 'Bună'];

  // Use id-based seeds so same id always produces same part
  const s = id * 1000;
  const model   = modele[sRandInt(s + 1, 0, modele.length - 1)];
  const extra   = extras[sRandInt(s + 2, 0, extras.length - 1)];
  const an      = sRandInt(s + 3, 2005, 2020);
  const stare   = stari[sRandInt(s + 4, 0, stari.length - 1)];
  const pret    = sRandInt(s + 5, 80, 950);
  const culoare = CULORI[sRandInt(s + 6, 0, CULORI.length - 1)];
  const stoc    = sRandInt(s + 7, 1, 5);
  const cod     = `${prefix}-${brandKey.slice(0, 2).toUpperCase()}${an}-${String(100 + id - 1).padStart(3, '0')}`;

  return {
    id,
    titlu: `${titluBaza} ${brandName} ${model} — ${extra}`,
    model,
    an,
    stare,
    pret,
    cod,
    culoare,
    stoc,
  };
}

export function genereazaListaPiese(brand: string, slug: string, count = 10): PiesaCard[] {
  return Array.from({ length: count }, (_, i) => genereazaPiesa(brand, slug, i + 1));
}
