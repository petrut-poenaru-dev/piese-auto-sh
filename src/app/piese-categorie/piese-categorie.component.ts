import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { DezmembrariService } from '../shared/dezmembrari.service';
import { CartService } from '../shared/cart.service';
import { coverStyle, MasinaDezmembrare, GrupaPiese, PiesaDisponibila } from '../shared/models';

// Pasul 3 din căutare: piesele disponibile dintr-o mașină concretă (checklist).
@Component({
  selector: 'app-piese-categorie',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './piese-categorie.component.html',
  styleUrl: './piese-categorie.component.scss'
})
export class PieseCategorieComponent implements OnInit {
  brand = '';
  masina?: MasinaDezmembrare;
  doarDisponibile = false;
  justAddedId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dezmembrariService: DezmembrariService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.brand = params.get('brand') ?? '';
      const id = params.get('masina') ?? '';

      this.dezmembrariService.getById(id).subscribe({
        next: masina => (this.masina = masina),
        error: () => this.router.navigate(['/marci', this.brand]),
      });
    });
  }

  get brandName(): string {
    return this.brand.charAt(0).toUpperCase() + this.brand.slice(1).toLowerCase();
  }

  // Grupele filtrate după toggle-ul "doar disponibile"
  get grupeAfisate(): GrupaPiese[] {
    if (!this.masina) return [];
    if (!this.doarDisponibile) return this.masina.grupe;
    return this.masina.grupe
      .map(g => ({ nume: g.nume, piese: g.piese.filter(p => p.disponibil) }))
      .filter(g => g.piese.length > 0);
  }

  toggleDisponibile() {
    this.doarDisponibile = !this.doarDisponibile;
  }

  stareClass(stare: string): string {
    if (stare === 'Excelentă') return 'stare-excelenta';
    if (stare === 'Bună')      return 'stare-buna';
    return 'stare-acceptabila';
  }

  adaugaInCos(piesa: PiesaDisponibila): void {
    const id = piesa.id ?? piesa.cod;
    this.cartService.add({ id, nume: piesa.nume, cod: piesa.cod, pret: piesa.pret });
    this.justAddedId = id;
    setTimeout(() => {
      if (this.justAddedId === id) this.justAddedId = null;
    }, 1500);
  }

  readonly coverStyle = coverStyle;
}
