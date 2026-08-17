import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { DezmembrariService } from '../shared/dezmembrari.service';
import { coverStyle, MasinaDezmembrare } from '../shared/models';

// Pasul 2 din căutare: toate mașinile mărcii alese, aflate la dezmembrat.
@Component({
  selector: 'app-piese-marca',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './piese-marca.component.html',
  styleUrl: './piese-marca.component.scss'
})
export class PieseMarcaComponent implements OnInit {
  brand = '';
  masini: MasinaDezmembrare[] = [];

  constructor(private route: ActivatedRoute, private dezmembrariService: DezmembrariService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.brand = params.get('brand') ?? '';
      this.dezmembrariService.getByBrand(this.brand).subscribe(m => (this.masini = m));
    });
  }

  get brandName(): string {
    return this.brand.charAt(0).toUpperCase() + this.brand.slice(1).toLowerCase();
  }

  get totalPiese(): number {
    return this.masini.reduce((s, m) => s + m.totalPiese, 0);
  }

  readonly coverStyle = coverStyle;
}
