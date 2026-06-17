import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import {
  PiesaCard,
  TITLURI_SLUG,
  genereazaPiesa,
  genereazaListaPiese,
} from '../shared/piese.data';

@Component({
  selector: 'app-piesa-detaliu',
  imports: [RouterLink, CurrencyPipe, NgClass],
  templateUrl: './piesa-detaliu.component.html',
  styleUrl: './piesa-detaliu.component.scss'
})
export class PiesaDetaliuComponent implements OnInit {
  brand = '';
  slug  = '';
  piesa!: PiesaCard;
  similare: PiesaCard[] = [];
  activeThumb = 0;

  // Gallery: 4 "view" labels simulating different photo angles
  galleryViews = ['Față', 'Lateral stânga', 'Spate', 'Detaliu'];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.brand = this.route.snapshot.paramMap.get('brand') ?? '';
    this.slug  = this.route.snapshot.paramMap.get('slug')  ?? '';
    const id   = Number(this.route.snapshot.paramMap.get('id') ?? '1');

    this.piesa   = genereazaPiesa(this.brand, this.slug, id);
    this.similare = genereazaListaPiese(this.brand, this.slug, 12)
      .filter(p => p.id !== id)
      .slice(0, 4);
  }

  get brandName(): string {
    return this.brand.charAt(0).toUpperCase() + this.brand.slice(1).toLowerCase();
  }

  get categorieNume(): string {
    return TITLURI_SLUG[this.slug] ?? this.slug;
  }

  get stocClass(): string {
    if (this.piesa.stoc === 1) return 'stoc-critic';
    if (this.piesa.stoc <= 2) return 'stoc-redus';
    return 'stoc-ok';
  }

  get stocLabel(): string {
    if (this.piesa.stoc === 1) return 'Ultima bucata!';
    if (this.piesa.stoc <= 2) return `Stoc limitat · ${this.piesa.stoc} buc.`;
    return `${this.piesa.stoc} bucati in stoc`;
  }

  stareClass(stare: string): string {
    if (stare === 'Excelentă') return 'stare-excelenta';
    if (stare === 'Bună')      return 'stare-buna';
    return 'stare-acceptabila';
  }
}
