import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import {
  MasinaDezmembrare,
  GrupaPiese,
  gasesteMasinaDezmembrare,
} from '../shared/dezmembrari.data';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.brand = params.get('brand') ?? '';
      const id = params.get('masina') ?? '';
      this.masina = gasesteMasinaDezmembrare(id);

      if (!this.masina) {
        this.router.navigate(['/marci', this.brand]);
      }
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
}
