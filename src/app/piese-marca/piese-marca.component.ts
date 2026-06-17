import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

interface CategoriePiesa {
  slug: string;
  nume: string;
  descriere: string;
  piese: number;
  icon: string; // SVG key
}

@Component({
  selector: 'app-piese-marca',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './piese-marca.component.html',
  styleUrl: './piese-marca.component.scss'
})
export class PieseMarcaComponent implements OnInit {
  brand = '';

  categorii: CategoriePiesa[] = [
    {
      slug: 'bara-fata',
      nume: 'Bara Față',
      descriere: 'Bare față originale, complete sau parțiale. Vopsite și nevopsite.',
      piese: 142,
      icon: 'bara-fata'
    },
    {
      slug: 'bara-spate',
      nume: 'Bara Spate',
      descriere: 'Bare spate cu și fără senzori de parcare. Stoc variat de modele.',
      piese: 118,
      icon: 'bara-spate'
    },
    {
      slug: 'usi-portiere',
      nume: 'Uși / Portiere',
      descriere: 'Portiere față și spate, stânga și dreapta. Cu sau fără geam.',
      piese: 204,
      icon: 'usi'
    },
    {
      slug: 'faruri-fata',
      nume: 'Faruri Față',
      descriere: 'Faruri halogen, xenon și LED. Originale în stare excelentă.',
      piese: 176,
      icon: 'faruri'
    },
    {
      slug: 'stopuri-spate',
      nume: 'Stopuri Spate',
      descriere: 'Stopuri stânga și dreapta, simple și cu LED-uri. Toate modelele.',
      piese: 159,
      icon: 'stopuri'
    },
    {
      slug: 'capota-motor',
      nume: 'Capotă Motor',
      descriere: 'Capote originale fără rugină. Vopsite în culoarea originală sau nevopsite.',
      piese: 87,
      icon: 'capota'
    },
    {
      slug: 'portbagaj-hayon',
      nume: 'Portbagaj / Hayon',
      descriere: 'Hayoane și capace portbagaj pentru berlina, break și SUV.',
      piese: 93,
      icon: 'portbagaj'
    },
    {
      slug: 'aripi',
      nume: 'Aripi',
      descriere: 'Aripi față și spate, stânga și dreapta. Fără deformări sau rugină.',
      piese: 211,
      icon: 'aripi'
    },
    {
      slug: 'oglinzi',
      nume: 'Oglinzi Retrovizoare',
      descriere: 'Oglinzi complete cu motor electric, încălzire și reglaj electric.',
      piese: 134,
      icon: 'oglinzi'
    },
    {
      slug: 'motor-transmisie',
      nume: 'Motor & Transmisie',
      descriere: 'Motoare testate, cutii de viteze manuale și automate, punți.',
      piese: 68,
      icon: 'motor'
    },
    {
      slug: 'suspensie-directie',
      nume: 'Suspensie & Direcție',
      descriere: 'Amortizoare, arcuri, brațe suspensie, cremalierea direcției.',
      piese: 245,
      icon: 'suspensie'
    },
    {
      slug: 'interior',
      nume: 'Interior & Tapițerie',
      descriere: 'Scaune, bord, panouri uși, mochete, volanuri și consola centrală.',
      piese: 312,
      icon: 'interior'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.brand = this.route.snapshot.paramMap.get('brand') ?? '';
  }

  get brandName(): string {
    return this.brand.charAt(0).toUpperCase() + this.brand.slice(1).toLowerCase();
  }
}
