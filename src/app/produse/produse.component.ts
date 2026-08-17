import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { PRODUCTS, Product } from '../shared/products';

// Pagină dedicată "Vezi toate" pentru secțiunea de produse recomandate de pe homepage.
@Component({
  selector: 'app-produse',
  imports: [RouterLink],
  templateUrl: './produse.component.html',
  styleUrl: './produse.component.scss'
})
export class ProduseComponent {
  readonly products: Product[] = PRODUCTS;
  justAddedSku: string | null = null;

  constructor(private cartService: CartService) {}

  adaugaInCos(product: Product): void {
    this.cartService.add({ id: product.sku, nume: product.name, cod: product.sku, pret: product.price });
    this.justAddedSku = product.sku;
    setTimeout(() => {
      if (this.justAddedSku === product.sku) this.justAddedSku = null;
    }, 1500);
  }
}
