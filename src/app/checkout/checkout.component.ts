import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { OrdersService } from '../shared/orders.service';
import { Order } from '../shared/models';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, FormsModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  form = {
    nume: '',
    telefon: '',
    email: '',
    adresa: '',
    oras: '',
    judet: '',
    codPostal: '',
    observatii: '',
  };

  seTrimite = false;
  formSubmitted = false;
  eroare = '';
  comandaFinalizata: Order | null = null;

  constructor(
    public cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  trimite(checkoutForm: NgForm): void {
    this.formSubmitted = true;

    if (checkoutForm.invalid) {
      checkoutForm.form.markAllAsTouched();
      this.eroare = 'Datele introduse sunt invalide. Completează toate câmpurile obligatorii marcate cu *.';
      return;
    }

    const items = this.cartService.items();
    if (items.length === 0) return;

    this.seTrimite = true;
    this.eroare = '';

    this.ordersService
      .create({
        nume: this.form.nume,
        telefon: this.form.telefon,
        email: this.form.email || undefined,
        adresa: this.form.adresa,
        oras: this.form.oras,
        judet: this.form.judet,
        codPostal: this.form.codPostal || undefined,
        observatii: this.form.observatii || undefined,
        items: items.map(i => ({ nume: i.nume, cod: i.cod, pret: i.pret, cantitate: i.cantitate })),
      })
      .subscribe({
        next: order => {
          this.comandaFinalizata = order;
          this.cartService.clear();
          this.seTrimite = false;
        },
        error: (err: HttpErrorResponse) => {
          this.eroare = err.error?.error || 'Nu am putut trimite comanda. Încearcă din nou sau contactează-ne telefonic.';
          this.seTrimite = false;
        },
      });
  }

  inapoiAcasa(): void {
    this.router.navigate(['/']);
  }
}
