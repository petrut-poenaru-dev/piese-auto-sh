import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BrandsService } from '../shared/brands.service';
import { StatBrand } from '../shared/models';

@Component({
  selector: 'app-marci',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './marci.component.html',
  styleUrl: './marci.component.scss'
})
export class MarciComponent implements OnInit {

  constructor(private brandsService: BrandsService) {}

  private stats: Record<string, StatBrand> = {};

  ngOnInit() {
    this.brandsService.getStats().subscribe(stats => (this.stats = stats));
  }

  // svg = cheia logo-ului; key = param-ul de rută (lowercase) folosit la /marci/:brand
  brands = [
    { name: 'Audi',       key: 'audi',       svg: 'audi'     },
    { name: 'BMW',        key: 'bmw',        svg: 'bmw'      },
    { name: 'Mercedes',   key: 'mercedes',   svg: 'mercedes' },
    { name: 'Volkswagen', key: 'volkswagen', svg: 'vw'       },
    { name: 'Toyota',     key: 'toyota',     svg: 'toyota'   },
    { name: 'Ford',       key: 'ford',       svg: 'ford'     },
    { name: 'Renault',    key: 'renault',    svg: 'renault'  },
    { name: 'Opel',       key: 'opel',       svg: 'opel'     },
    { name: 'Peugeot',    key: 'peugeot',    svg: 'peugeot'  },
    { name: 'Skoda',      key: 'skoda',      svg: 'skoda'    },
    { name: 'Volvo',      key: 'volvo',      svg: 'volvo'    },
    { name: 'Honda',      key: 'honda',      svg: 'honda'    },
  ];

  stat(key: string): StatBrand {
    return this.stats[key] ?? { masini: 0, piese: 0 };
  }
}
