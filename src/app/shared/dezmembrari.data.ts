// ─── Mock "bază de date" pentru mașini aflate la dezmembrat ──────────────────
//
// Ideea fluxului nou de căutare:
//   Marcă  →  Mașină concretă din parc (o singură poză)  →  Piese disponibile
//
// În loc să fotografiem fiecare piesă separat, listăm o mașină dezmembrată și
// enumerăm piesele care se pot lua din ea (disponibil / indisponibil, stare,
// preț). Astfel facem o singură poză per mașină, nu zeci de poze per piesă.
//
// Datele de mai jos sunt mock — când apare un backend real, se înlocuiesc
// `MASINI_DEZMEMBRARE` și generatorul cu apeluri către API, păstrând interfețele.

export type StarePiesa = 'Excelentă' | 'Bună' | 'Acceptabilă';
export type StatusMasina = 'Dezmembrare activă' | 'Piese pe stoc';

export interface PiesaDisponibila {
  nume: string;
  grupa: string;
  disponibil: boolean;
  stare: StarePiesa;
  pret: number;        // lei
  cod: string;
}

export interface GrupaPiese {
  nume: string;
  piese: PiesaDisponibila[];
}

export interface MasinaDezmembrare {
  id: string;          // slug folosit în URL: /marci/:brand/:masina
  brandKey: string;    // 'bmw', 'audi', ... (același cu param-ul din /marci)
  brand: string;       // 'BMW'
  model: string;       // 'Seria 5 F10 520d'
  an: number;
  km: string;
  combustibil: string;
  motor: string;
  cutie: string;
  caroserie: string;   // Berlină / Break / Hatchback / SUV
  culoare: string;
  cod: string;         // cod parc, ex. DZ-BM-1042
  bg: string;          // gradient folosit ca "poză" a mașinii
  status: StatusMasina;

  // Calculate la încărcare (vezi `construiesteMasini`)
  grupe: GrupaPiese[];
  totalPiese: number;       // câte piese sunt disponibile
  totalCatalog: number;     // din câte posibile
}

// ── Catalogul de piese enumerate (ce poate avea în principiu orice mașină) ───
interface DefinitiePiesa {
  nume: string;
  prefix: string;   // pentru cod
  min: number;      // preț minim lei
  max: number;      // preț maxim lei
}

const CATALOG: { grupa: string; piese: DefinitiePiesa[] }[] = [
  {
    grupa: 'Motor & Transmisie',
    piese: [
      { nume: 'Motor complet',        prefix: 'MOT', min: 1600, max: 4500 },
      { nume: 'Cutie de viteze',      prefix: 'CUT', min: 900,  max: 2600 },
      { nume: 'Turbosuflantă',        prefix: 'TRB', min: 450,  max: 1300 },
      { nume: 'Alternator',           prefix: 'ALT', min: 150,  max: 480  },
      { nume: 'Electromotor',         prefix: 'ELM', min: 130,  max: 420  },
      { nume: 'Radiator apă',         prefix: 'RAD', min: 120,  max: 380  },
      { nume: 'Pompă servodirecție',  prefix: 'PSV', min: 140,  max: 460  },
      { nume: 'Set injectoare',       prefix: 'INJ', min: 380,  max: 1200 },
    ],
  },
  {
    grupa: 'Caroserie față',
    piese: [
      { nume: 'Bară față',            prefix: 'BAF', min: 250, max: 950 },
      { nume: 'Capotă motor',         prefix: 'CAP', min: 280, max: 900 },
      { nume: 'Far stânga',           prefix: 'FRS', min: 200, max: 1400 },
      { nume: 'Far dreapta',          prefix: 'FRD', min: 200, max: 1400 },
      { nume: 'Aripă față stânga',    prefix: 'ARS', min: 180, max: 620 },
      { nume: 'Aripă față dreapta',   prefix: 'ARD', min: 180, max: 620 },
      { nume: 'Trager / armătură',    prefix: 'TRG', min: 220, max: 700 },
    ],
  },
  {
    grupa: 'Caroserie spate',
    piese: [
      { nume: 'Bară spate',           prefix: 'BAS', min: 250, max: 950 },
      { nume: 'Hayon / capac portbagaj', prefix: 'HAY', min: 320, max: 1100 },
      { nume: 'Stop stânga',          prefix: 'STS', min: 120, max: 700 },
      { nume: 'Stop dreapta',         prefix: 'STD', min: 120, max: 700 },
      { nume: 'Panou spate',          prefix: 'PNS', min: 300, max: 950 },
    ],
  },
  {
    grupa: 'Uși & Oglinzi',
    piese: [
      { nume: 'Ușă față stânga',      prefix: 'USS', min: 280, max: 850 },
      { nume: 'Ușă față dreapta',     prefix: 'USD', min: 280, max: 850 },
      { nume: 'Ușă spate stânga',     prefix: 'UPS', min: 260, max: 800 },
      { nume: 'Ușă spate dreapta',    prefix: 'UPD', min: 260, max: 800 },
      { nume: 'Oglindă stânga',       prefix: 'OGS', min: 130, max: 560 },
      { nume: 'Oglindă dreapta',      prefix: 'OGD', min: 130, max: 560 },
    ],
  },
  {
    grupa: 'Suspensie & Direcție',
    piese: [
      { nume: 'Amortizor față',       prefix: 'AMF', min: 120, max: 420 },
      { nume: 'Amortizor spate',      prefix: 'AMS', min: 110, max: 380 },
      { nume: 'Set brațe suspensie',  prefix: 'BRT', min: 180, max: 560 },
      { nume: 'Cremalieră direcție',  prefix: 'CRM', min: 350, max: 1100 },
      { nume: 'Butuc roată',          prefix: 'BTC', min: 120, max: 360 },
    ],
  },
  {
    grupa: 'Interior',
    piese: [
      { nume: 'Set scaune',           prefix: 'SCA', min: 600, max: 2200 },
      { nume: 'Bord complet',         prefix: 'BRD', min: 450, max: 1500 },
      { nume: 'Volan',                prefix: 'VOL', min: 200, max: 900 },
      { nume: 'Set airbag-uri',       prefix: 'ABG', min: 400, max: 1600 },
      { nume: 'Plafon',               prefix: 'PLF', min: 150, max: 500 },
      { nume: 'Centuri de siguranță', prefix: 'CNT', min: 90,  max: 320 },
    ],
  },
  {
    grupa: 'Roți',
    piese: [
      { nume: 'Set jante aliaj',      prefix: 'JNT', min: 500, max: 2000 },
      { nume: 'Set anvelope',         prefix: 'ANV', min: 300, max: 1200 },
    ],
  },
];

// ── Generator determinist (fără Date/Math.random — folosim un seed din text) ──
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rand(seed: number): number {
  const x = Math.sin(seed) * 43758.5453;
  return x - Math.floor(x);
}

const STARI: StarePiesa[] = ['Excelentă', 'Bună', 'Bună', 'Acceptabilă', 'Excelentă', 'Bună'];

function slug(brandKey: string, model: string): string {
  return `${brandKey}-${model}`
    .toLowerCase()
    .replace(/[ăâ]/g, 'a')
    .replace(/[î]/g, 'i')
    .replace(/[șş]/g, 's')
    .replace(/[țţ]/g, 't')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Date de bază pentru fiecare mașină din parc (ce ar veni din DB).
interface BazaMasina {
  brandKey: string;
  brand: string;
  model: string;
  an: number;
  km: string;
  combustibil: string;
  motor: string;
  cutie: string;
  caroserie: string;
  culoare: string;
  status: StatusMasina;
  bg: string;
}

const GRAD = [
  'linear-gradient(135deg, #16213e 0%, #3a4550 100%)',
  'linear-gradient(135deg, #0f3460 0%, #2d4a6e 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #2d3338 100%)',
  'linear-gradient(135deg, #232526 0%, #414345 100%)',
  'linear-gradient(135deg, #2c1810 0%, #4a3528 100%)',
  'linear-gradient(135deg, #1a2a1e 0%, #2d4035 100%)',
  'linear-gradient(135deg, #1e1e24 0%, #3a3a44 100%)',
];

const BAZA: BazaMasina[] = [
  { brandKey: 'bmw',        brand: 'BMW',        model: 'Seria 5 F10 520d',      an: 2014, km: '186.000 km', combustibil: 'Diesel', motor: '2.0d 184 CP', cutie: 'Automată', caroserie: 'Berlină',   culoare: 'Negru Metalizat',    status: 'Piese pe stoc',       bg: GRAD[0] },
  { brandKey: 'bmw',        brand: 'BMW',        model: 'Seria 3 E90 320d',      an: 2009, km: '241.000 km', combustibil: 'Diesel', motor: '2.0d 177 CP', cutie: 'Manuală',  caroserie: 'Berlină',   culoare: 'Gri Argintiu',       status: 'Dezmembrare activă',  bg: GRAD[2] },
  { brandKey: 'audi',       brand: 'Audi',       model: 'A6 C7 3.0 TDI Quattro', an: 2013, km: '212.000 km', combustibil: 'Diesel', motor: '3.0 TDI 245 CP', cutie: 'Automată', caroserie: 'Berlină', culoare: 'Negru Metalizat',    status: 'Piese pe stoc',       bg: GRAD[1] },
  { brandKey: 'audi',       brand: 'Audi',       model: 'A4 B8 2.0 TDI',         an: 2011, km: '228.000 km', combustibil: 'Diesel', motor: '2.0 TDI 143 CP', cutie: 'Manuală',  caroserie: 'Berlină', culoare: 'Alb',                status: 'Dezmembrare activă',  bg: GRAD[0] },
  { brandKey: 'mercedes',   brand: 'Mercedes',   model: 'C-Class W204 220 CDI',  an: 2010, km: '254.000 km', combustibil: 'Diesel', motor: '2.2 CDI 170 CP', cutie: 'Automată', caroserie: 'Berlină', culoare: 'Gri Antracit',       status: 'Piese pe stoc',       bg: GRAD[3] },
  { brandKey: 'mercedes',   brand: 'Mercedes',   model: 'E-Class W212 250 CDI',  an: 2012, km: '198.000 km', combustibil: 'Diesel', motor: '2.1 CDI 204 CP', cutie: 'Automată', caroserie: 'Break',   culoare: 'Negru Metalizat',    status: 'Dezmembrare activă',  bg: GRAD[3] },
  { brandKey: 'volkswagen', brand: 'Volkswagen', model: 'Passat B7 2.0 TDI',     an: 2012, km: '232.000 km', combustibil: 'Diesel', motor: '2.0 TDI 140 CP', cutie: 'Manuală',  caroserie: 'Break',   culoare: 'Gri Argintiu',       status: 'Piese pe stoc',       bg: GRAD[2] },
  { brandKey: 'volkswagen', brand: 'Volkswagen', model: 'Golf VI 1.6 TDI',       an: 2010, km: '263.000 km', combustibil: 'Diesel', motor: '1.6 TDI 105 CP', cutie: 'Manuală',  caroserie: 'Hatchback', culoare: 'Albastru Metalizat', status: 'Dezmembrare activă',  bg: GRAD[1] },
  { brandKey: 'ford',       brand: 'Ford',       model: 'Focus MK3 1.6 TDCi',    an: 2012, km: '243.000 km', combustibil: 'Diesel', motor: '1.6 TDCi 115 CP', cutie: 'Manuală', caroserie: 'Hatchback', culoare: 'Roșu',              status: 'Piese pe stoc',       bg: GRAD[4] },
  { brandKey: 'opel',       brand: 'Opel',       model: 'Astra J 1.7 CDTi',      an: 2011, km: '268.000 km', combustibil: 'Diesel', motor: '1.7 CDTi 110 CP', cutie: 'Manuală', caroserie: 'Hatchback', culoare: 'Gri Antracit',      status: 'Piese pe stoc',       bg: GRAD[6] },
  { brandKey: 'renault',    brand: 'Renault',    model: 'Megane III 1.5 dCi',    an: 2010, km: '291.000 km', combustibil: 'Diesel', motor: '1.5 dCi 110 CP', cutie: 'Manuală',  caroserie: 'Hatchback', culoare: 'Alb',               status: 'Dezmembrare activă',  bg: GRAD[5] },
  { brandKey: 'skoda',      brand: 'Skoda',      model: 'Octavia II 1.9 TDI',    an: 2009, km: '317.000 km', combustibil: 'Diesel', motor: '1.9 TDI 105 CP', cutie: 'Manuală',  caroserie: 'Break',   culoare: 'Gri Argintiu',       status: 'Piese pe stoc',       bg: GRAD[0] },
  { brandKey: 'toyota',     brand: 'Toyota',     model: 'Avensis T27 2.0 D-4D',  an: 2011, km: '224.000 km', combustibil: 'Diesel', motor: '2.0 D-4D 126 CP', cutie: 'Manuală', caroserie: 'Berlină', culoare: 'Gri Argintiu',       status: 'Dezmembrare activă',  bg: GRAD[2] },
  { brandKey: 'peugeot',    brand: 'Peugeot',    model: '308 T7 1.6 HDi',        an: 2010, km: '247.000 km', combustibil: 'Diesel', motor: '1.6 HDi 110 CP', cutie: 'Manuală',  caroserie: 'Hatchback', culoare: 'Albastru Metalizat', status: 'Piese pe stoc',     bg: GRAD[1] },
  { brandKey: 'volvo',      brand: 'Volvo',      model: 'V40 MK2 D2',            an: 2013, km: '189.000 km', combustibil: 'Diesel', motor: '1.6 D2 115 CP', cutie: 'Manuală',   caroserie: 'Hatchback', culoare: 'Negru Metalizat',    status: 'Dezmembrare activă',  bg: GRAD[3] },
  { brandKey: 'honda',      brand: 'Honda',      model: 'Civic FK2 2.2 i-CTDi',  an: 2010, km: '276.000 km', combustibil: 'Diesel', motor: '2.2 i-CTDi 140 CP', cutie: 'Manuală', caroserie: 'Hatchback', culoare: 'Gri Antracit',     status: 'Piese pe stoc',       bg: GRAD[5] },
];

function construiesteMasina(b: BazaMasina): MasinaDezmembrare {
  const id = slug(b.brandKey, b.model);
  const codMasina = `DZ-${b.brandKey.slice(0, 2).toUpperCase()}-${1000 + (hash(id) % 9000)}`;

  let total = 0;
  let posibile = 0;
  let n = 0;

  const grupe: GrupaPiese[] = CATALOG.map(g => ({
    nume: g.grupa,
    piese: g.piese.map(p => {
      posibile++;
      n++;
      const seed = hash(`${id}|${p.nume}`);
      // ~80% dintre piese sunt disponibile (mașina nu e niciodată completă)
      const disponibil = rand(seed) > 0.2;
      if (disponibil) total++;

      const stare = STARI[Math.floor(rand(seed + 1) * STARI.length)];
      const pretBrut = p.min + rand(seed + 2) * (p.max - p.min);
      const pret = Math.round(pretBrut / 10) * 10;
      const cod = `${p.prefix}-${b.brandKey.slice(0, 2).toUpperCase()}${b.an}-${String(100 + n).slice(-3)}`;

      return { nume: p.nume, grupa: g.grupa, disponibil, stare, pret, cod };
    }),
  }));

  return {
    id,
    brandKey: b.brandKey,
    brand: b.brand,
    model: b.model,
    an: b.an,
    km: b.km,
    combustibil: b.combustibil,
    motor: b.motor,
    cutie: b.cutie,
    caroserie: b.caroserie,
    culoare: b.culoare,
    cod: codMasina,
    bg: b.bg,
    status: b.status,
    grupe,
    totalPiese: total,
    totalCatalog: posibile,
  };
}

export const MASINI_DEZMEMBRARE: MasinaDezmembrare[] = BAZA.map(construiesteMasina);

// ── Helpere de acces ─────────────────────────────────────────────────────────
export function masiniDinBrand(brandKey: string): MasinaDezmembrare[] {
  const key = brandKey.toLowerCase();
  return MASINI_DEZMEMBRARE.filter(m => m.brandKey === key);
}

export function gasesteMasinaDezmembrare(id: string): MasinaDezmembrare | undefined {
  return MASINI_DEZMEMBRARE.find(m => m.id === id);
}

export interface StatBrand {
  masini: number;
  piese: number;
}

export function statBrand(brandKey: string): StatBrand {
  const masini = masiniDinBrand(brandKey);
  return {
    masini: masini.length,
    piese: masini.reduce((s, m) => s + m.totalPiese, 0),
  };
}
