// ─── Produse recomandate (date demo, fără endpoint dedicat pe backend) ───────

export interface Product {
  name: string;
  sku: string;
  price: number;
  condition: string;
  stock: string;
  bg: string;
}

// Momentan nu există niciun produs real în baza de date — homepage-ul preia
// automat mașini recomandate în locul acestei liste (vezi HomeComponent.masiniRecomandate).
export const PRODUCTS: Product[] = [];
