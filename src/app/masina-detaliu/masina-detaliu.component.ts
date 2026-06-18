import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  Masina,
  gasesteMasina,
  masiniSimilare,
} from '../shared/masini.data';

@Component({
  selector: 'app-masina-detaliu',
  imports: [RouterLink],
  templateUrl: './masina-detaliu.component.html',
  styleUrl: './masina-detaliu.component.scss'
})
export class MasinaDetaliuComponent implements OnInit {
  masina?: Masina;
  similare: Masina[] = [];
  activeThumb = 0;
  galleryViews = ['Față', 'Lateral', 'Spate', 'Interior'];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') ?? '';
      this.masina = gasesteMasina(id);

      if (!this.masina) {
        this.router.navigate(['/']);
        return;
      }

      this.activeThumb = 0;
      this.similare = masiniSimilare(this.masina, 3);
    });
  }

  get tipLabel(): string {
    return this.masina?.tip === 'vanzare' ? 'De vânzare' : 'Pentru dezmembrat';
  }
}
