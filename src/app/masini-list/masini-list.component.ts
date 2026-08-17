import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MasiniService } from '../shared/masini.service';
import { coverStyle, Masina, TipMasina } from '../shared/models';

// Pagină dedicată "Vezi toate" pentru secțiunile de mașini de pe homepage.
@Component({
  selector: 'app-masini-list',
  imports: [RouterLink],
  templateUrl: './masini-list.component.html',
  styleUrl: './masini-list.component.scss'
})
export class MasiniListComponent implements OnInit {
  tip: TipMasina = 'vanzare';
  masini: Masina[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private masiniService: MasiniService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tip = params.get('tip') === 'dezmembrat' ? 'dezmembrat' : 'vanzare';
      this.masiniService.getAll(this.tip).subscribe(m => (this.masini = m));
    });
  }

  get isVanzare(): boolean {
    return this.tip === 'vanzare';
  }

  get pageTitle(): string {
    return this.isVanzare ? 'Mașini de Vânzare' : 'Mașini pentru Dezmembrat';
  }

  goToCar(id: string): void {
    this.router.navigate(['/masina', id]);
  }

  readonly coverStyle = coverStyle;
}
