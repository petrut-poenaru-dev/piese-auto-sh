// ─── Produse recomandate (date demo, fără endpoint dedicat pe backend) ───────

export interface Product {
  name: string;
  sku: string;
  price: number;
  condition: string;
  stock: string;
  bg: string;
}

export const PRODUCTS: Product[] = [
  {
    name: 'Prag stânga Mercedes CLS W219',
    sku: 'MRC-W219-001',
    price: 450,
    condition: 'OEM Quality',
    stock: 'In Stoc',
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #2d3338 100%)'
  },
  {
    name: 'Capotă motor BMW Seria 3 E46',
    sku: 'BMW-E46-047',
    price: 320,
    condition: 'German Engineered',
    stock: 'In Stoc',
    bg: 'linear-gradient(135deg, #16213e 0%, #3a4550 100%)'
  },
  {
    name: 'Bară față Audi A4 B8 2008–2012',
    sku: 'AUD-A4B8-219',
    price: 380,
    condition: 'OEM Quality',
    stock: 'Ultimele 2',
    bg: 'linear-gradient(135deg, #0f3460 0%, #2d4a6e 100%)'
  }
];
