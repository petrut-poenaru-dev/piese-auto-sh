import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { PiesaCard, TITLURI_SLUG, genereazaListaPiese } from '../shared/piese.data';

@Component({
  selector: 'app-piese-categorie',
  imports: [RouterLink, CurrencyPipe, NgClass],
  templateUrl: './piese-categorie.component.html',
  styleUrl: './piese-categorie.component.scss'
})
export class PieseCategorieComponent implements OnInit {
  brand = '';
  slug  = '';
  piese: PiesaCard[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.brand = this.route.snapshot.paramMap.get('brand') ?? '';
    this.slug  = this.route.snapshot.paramMap.get('slug')  ?? '';
    this.piese = genereazaListaPiese(this.brand, this.slug, 10);
  }

  get brandName(): string {
    return this.brand.charAt(0).toUpperCase() + this.brand.slice(1).toLowerCase();
  }

  get categorieNume(): string {
    return TITLURI_SLUG[this.slug] ?? this.slug;
  }
}
