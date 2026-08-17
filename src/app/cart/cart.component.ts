import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  scade(id: string, cantitateActuala: number): void {
    this.cartService.updateCantitate(id, cantitateActuala - 1);
  }

  creste(id: string, cantitateActuala: number): void {
    this.cartService.updateCantitate(id, cantitateActuala + 1);
  }
}
