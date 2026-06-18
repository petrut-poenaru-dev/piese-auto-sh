import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { statBrand } from '../shared/dezmembrari.data';

@Component({
  selector: 'app-marci',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './marci.component.html',
  styleUrl: './marci.component.scss'
})
export class MarciComponent {

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

  stat(key: string) {
    return statBrand(key);
  }
}
