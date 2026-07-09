// ─── Tipuri partajate front-end, oglindă a DTO-urilor expuse de backend ──────

export type TipMasina = 'vanzare' | 'dezmembrat';
export type StarePiesa = 'Excelentă' | 'Bună' | 'Acceptabilă';
export type StatusMasina = 'Dezmembrare activă' | 'Piese pe stoc';

export interface Masina {
  id: string; // slug unic folosit în URL
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

  descriere: string;
  dotari: string[];
}

export interface PiesaDisponibila {
  id?: string;
  nume: string;
  grupa: string;
  disponibil: boolean;
  stare: StarePiesa | string;
  pret: number;
  cod: string;
}

export interface GrupaPiese {
  nume: string;
  piese: PiesaDisponibila[];
}

export interface MasinaDezmembrare {
  id: string;
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
  cod: string;
  bg: string;
  status: StatusMasina | string;

  grupe: GrupaPiese[];
  totalPiese: number;
  totalCatalog: number;
}

export interface StatBrand {
  masini: number;
  piese: number;
}

// ─── Tipuri specifice zonei de admin ─────────────────────────────────────────

export interface AdminPart {
  id: string;
  grupa: string;
  nume: string;
  disponibil: boolean;
  stare: string;
  pret: number;
  cod: string;
}

export interface AdminCar {
  id: string;
  slug: string;
  tip: TipMasina;
  name: string;
  brand?: string;
  brandKey?: string;
  model?: string;
  an: number;
  km: string;
  combustibil: string;
  bg: string;
  cutie?: string;
  putere?: string;
  pret?: number;
  stare?: string;
  motor?: string;
  caroserie?: string;
  culoare?: string;
  cod?: string;
  disponibilitate?: string;
  descriere: string;
  dotari: string[];
  parts: AdminPart[];
  totalPiese: number;
  totalCatalog: number;
  createdAt: string;
  updatedAt: string;
}

export type AdminCarInput = Omit<
  AdminCar,
  'id' | 'slug' | 'parts' | 'totalPiese' | 'totalCatalog' | 'createdAt' | 'updatedAt'
>;
