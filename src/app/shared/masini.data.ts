// ─── Shared data for cars (vânzare + dezmembrat) ─────────────────────────────

export type TipMasina = 'vanzare' | 'dezmembrat';

export interface Masina {
  id: string;            // slug unic folosit în URL
  tip: TipMasina;
  name: string;
  an: number;
  km: string;
  combustibil: string;
  bg: string;

  // Vânzare
  cutie?: string;
  putere?: string;
  pret?: number;
  stare?: string;

  // Dezmembrat
  motor?: string;
  cod?: string;
  disponibilitate?: string;

  // Descriere generată pentru pagina de detaliu
  descriere: string;
  dotari: string[];
}

// Helper: slug din numele mașinii
function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[ăâ]/g, 'a')
    .replace(/[î]/g, 'i')
    .replace(/[șş]/g, 's')
    .replace(/[țţ]/g, 't')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const DOTARI_VANZARE = [
  'Climatronic', 'Navigație', 'Senzori parcare', 'Scaune încălzite',
  'Pilot automat', 'Faruri LED', 'Cârlig remorcare', 'Jante aliaj',
];

const DOTARI_DEZMEMBRAT = [
  'Motor verificat', 'Cutie funcțională', 'Caroserie completă',
  'Electronică testată', 'Trapă', 'Interior piele',
];

// ── Mașini de vânzare ──────────────────────────────────────
export const masiniVanzare: Masina[] = [
  {
    tip: 'vanzare',
    name: 'BMW Seria 5 F10 520d',
    an: 2014,
    km: '186.000 km',
    combustibil: 'Diesel',
    cutie: 'Automată',
    putere: '184 CP',
    pret: 11900,
    stare: 'Înmatriculată',
    bg: 'linear-gradient(135deg, #16213e 0%, #3a4550 100%)',
    descriere:
      'BMW Seria 5 F10 520d, motorizare diesel economică și automată, întreținută la zi, fără accidente în istoric. Mașina este înmatriculată și pregătită de drum.',
    dotari: DOTARI_VANZARE,
    id: '',
  },
  {
    tip: 'vanzare',
    name: 'Audi A6 C7 3.0 TDI Quattro',
    an: 2013,
    km: '212.000 km',
    combustibil: 'Diesel',
    cutie: 'Automată',
    putere: '245 CP',
    pret: 13500,
    stare: 'Înmatriculată',
    bg: 'linear-gradient(135deg, #0f3460 0%, #2d4a6e 100%)',
    descriere:
      'Audi A6 C7 3.0 TDI cu tracțiune integrală Quattro, performanță și confort premium. Cutie automată S-Tronic, întreținere completă la reprezentanță.',
    dotari: DOTARI_VANZARE,
    id: '',
  },
  {
    tip: 'vanzare',
    name: 'Volkswagen Passat B8 2.0 TDI',
    an: 2016,
    km: '154.000 km',
    combustibil: 'Diesel',
    cutie: 'Manuală',
    putere: '150 CP',
    pret: 12200,
    stare: 'Înmatriculată',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #2d3338 100%)',
    descriere:
      'Volkswagen Passat B8 2.0 TDI, una dintre cele mai fiabile berline de familie. Consum redus, spațiu generos și dotări complete.',
    dotari: DOTARI_VANZARE,
    id: '',
  },
  {
    tip: 'vanzare',
    name: 'Mercedes C-Class W205 220d',
    an: 2015,
    km: '171.000 km',
    combustibil: 'Diesel',
    cutie: 'Automată',
    putere: '170 CP',
    pret: 14800,
    stare: 'Înmatriculată',
    bg: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
    descriere:
      'Mercedes C-Class W205 220d, eleganță și tehnologie. Cutie automată 7G-Tronic, interior premium și consum echilibrat pentru oraș și autostradă.',
    dotari: DOTARI_VANZARE,
    id: '',
  },
];

// ── Mașini pentru dezmembrat ───────────────────────────────
export const masiniDezmembrat: Masina[] = [
  {
    tip: 'dezmembrat',
    name: 'Ford Focus MK3 1.6 TDCi',
    an: 2012,
    km: '243.000 km',
    combustibil: 'Diesel',
    motor: '1.6 TDCi',
    cod: 'DZ-FO-1248',
    disponibilitate: 'Piese pe stoc',
    bg: 'linear-gradient(135deg, #2c1810 0%, #4a3528 100%)',
    descriere:
      'Ford Focus MK3 1.6 TDCi aflat în dezmembrare. Toate piesele de motor, caroserie și interior sunt disponibile pe stoc, verificate și pregătite de livrare.',
    dotari: DOTARI_DEZMEMBRAT,
    id: '',
  },
  {
    tip: 'dezmembrat',
    name: 'Opel Astra J 1.7 CDTi',
    an: 2011,
    km: '268.000 km',
    combustibil: 'Diesel',
    motor: '1.7 CDTi',
    cod: 'DZ-OP-0973',
    disponibilitate: 'Piese pe stoc',
    bg: 'linear-gradient(135deg, #1e1e24 0%, #3a3a44 100%)',
    descriere:
      'Opel Astra J 1.7 CDTi pentru dezmembrare. Piese de caroserie, suspensie și motor disponibile imediat. Solicită componenta de care ai nevoie.',
    dotari: DOTARI_DEZMEMBRAT,
    id: '',
  },
  {
    tip: 'dezmembrat',
    name: 'Renault Megane III 1.5 dCi',
    an: 2010,
    km: '291.000 km',
    combustibil: 'Diesel',
    motor: '1.5 dCi',
    cod: 'DZ-RE-0612',
    disponibilitate: 'Dezmembrare activă',
    bg: 'linear-gradient(135deg, #1a2a1e 0%, #2d4035 100%)',
    descriere:
      'Renault Megane III 1.5 dCi în dezmembrare activă. Componentele se desfac la cerere — confirmăm starea și stocul pe loc pentru orice piesă solicitată.',
    dotari: DOTARI_DEZMEMBRAT,
    id: '',
  },
  {
    tip: 'dezmembrat',
    name: 'Skoda Octavia II 1.9 TDI',
    an: 2009,
    km: '317.000 km',
    combustibil: 'Diesel',
    motor: '1.9 TDI',
    cod: 'DZ-SK-0488',
    disponibilitate: 'Piese pe stoc',
    bg: 'linear-gradient(135deg, #16213e 0%, #2d3a50 100%)',
    descriere:
      'Skoda Octavia II 1.9 TDI, robustul motor PD. Piese mecanice și de caroserie disponibile pe stoc, ideale pentru reparații economice.',
    dotari: DOTARI_DEZMEMBRAT,
    id: '',
  },
];

// Generăm id-urile slug o singură dată
[...masiniVanzare, ...masiniDezmembrat].forEach(m => (m.id = slug(m.name)));

export const toateMasinile: Masina[] = [...masiniVanzare, ...masiniDezmembrat];

export function gasesteMasina(id: string): Masina | undefined {
  return toateMasinile.find(m => m.id === id);
}

export function masiniSimilare(curent: Masina, limita = 3): Masina[] {
  const sursa = curent.tip === 'vanzare' ? masiniVanzare : masiniDezmembrat;
  return sursa.filter(m => m.id !== curent.id).slice(0, limita);
}
