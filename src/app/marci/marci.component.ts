import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-marci',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './marci.component.html',
  styleUrl: './marci.component.scss'
})
export class MarciComponent {

  brands = [
    { name: 'Audi',       piese: 1840, svg: 'audi'       },
    { name: 'BMW',        piese: 2310, svg: 'bmw'        },
    { name: 'Mercedes',   piese: 2750, svg: 'mercedes'   },
    { name: 'Volkswagen', piese: 1960, svg: 'vw'         },
    { name: 'Toyota',     piese: 1420, svg: 'toyota'     },
    { name: 'Ford',       piese: 1580, svg: 'ford'       },
    { name: 'Renault',    piese: 1230, svg: 'renault'    },
    { name: 'Opel',       piese:  980, svg: 'opel'       },
    { name: 'Peugeot',    piese:  870, svg: 'peugeot'    },
    { name: 'Skoda',      piese:  760, svg: 'skoda'      },
    { name: 'Volvo',      piese:  690, svg: 'volvo'      },
    { name: 'Honda',      piese:  640, svg: 'honda'      },
  ];
}
