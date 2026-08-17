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
  images: string[];

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
  images: string[];
  status: StatusMasina | string;

  grupe: GrupaPiese[];
  totalPiese: number;
  totalCatalog: number;
}

export interface StatBrand {
  masini: number;
  piese: number;
}

// ─── Coș & comenzi ────────────────────────────────────────────────────────

export interface CartItem {
  id: string; // cheie unică: id-ul piesei reale, sau SKU-ul produsului demo
  nume: string;
  cod?: string;
  pret: number;
  cantitate: number;
}

export interface OrderItemInput {
  nume: string;
  cod?: string;
  pret: number;
  cantitate: number;
}

export interface OrderItemDto extends OrderItemInput {
  id: string;
}

export interface OrderInput {
  nume: string;
  telefon: string;
  email?: string;
  adresa: string;
  oras: string;
  judet: string;
  codPostal?: string;
  observatii?: string;
  items: OrderItemInput[];
}

export interface Order extends Omit<OrderInput, 'items'> {
  id: string;
  items: OrderItemDto[];
  metodaPlata: string;
  status: string;
  total: number;
  createdAt: string;
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

export interface AdminCarImage {
  id: string;
  url: string;
  order: number;
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
  images: AdminCarImage[];
  parts: AdminPart[];
  totalPiese: number;
  totalCatalog: number;
  createdAt: string;
  updatedAt: string;
}

export type AdminCarInput = Omit<
  AdminCar,
  'id' | 'slug' | 'images' | 'parts' | 'totalPiese' | 'totalCatalog' | 'createdAt' | 'updatedAt'
>;

// Fundal pentru card: prima poză reală dacă există, altfel gradientul placeholder.
export function coverStyle(car: { bg: string; images?: string[] }): string {
  const cover = car.images?.[0];
  return cover ? `url('${cover}') center/cover no-repeat` : car.bg;
}
