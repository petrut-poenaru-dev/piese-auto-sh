import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MasiniService } from '../shared/masini.service';
import { coverStyle, Masina } from '../shared/models';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private masiniService: MasiniService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') ?? '';

      this.masiniService.getById(id).subscribe({
        next: masina => {
          this.masina = masina;
          this.activeThumb = 0;
          this.masiniService.getSimilare(id, 3).subscribe(s => (this.similare = s));
        },
        error: () => this.router.navigate(['/']),
      });
    });
  }

  get tipLabel(): string {
    return this.masina?.tip === 'vanzare' ? 'De vânzare' : 'Pentru dezmembrat';
  }

  bgUrl(url: string): string {
    return `url('${url}') center/cover no-repeat`;
  }

  readonly coverStyle = coverStyle;
}
