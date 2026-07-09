import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { decodeVin, DEMO_VINS, VinInfo } from '../shared/vin-decoder';
import { DezmembrariService } from '../shared/dezmembrari.service';
import { MasinaDezmembrare } from '../shared/models';

type SearchState = 'idle' | 'found' | 'no-brand' | 'no-stock' | 'invalid';

@Component({
  selector: 'app-vin-search',
  imports: [RouterLink, FormsModule],
  templateUrl: './vin-search.component.html',
  styleUrl: './vin-search.component.scss',
})
export class VinSearchComponent implements OnInit {
  vinInput = '';
  state: SearchState = 'idle';
  decoded: VinInfo | null = null;
  rezultate: MasinaDezmembrare[] = [];
  exactYearMatch = false;

  readonly demoVins = DEMO_VINS;

  private toateMasinile: MasinaDezmembrare[] = [];

  constructor(private dezmembrariService: DezmembrariService) {}

  ngOnInit() {
    this.dezmembrariService.getAll().subscribe(m => (this.toateMasinile = m));
  }

  cauta() {
    const raw = this.vinInput.trim();
    if (!raw) return;

    const info = decodeVin(raw);
    this.decoded = info;

    if (!info.valid) {
      this.state = 'invalid';
      return;
    }

    if (!info.brandKey) {
      this.state = 'no-brand';
      return;
    }

    // Încearcă mai întâi potrivire exactă brand + an
    const byYear = info.an
      ? this.toateMasinile.filter(m => m.brandKey === info.brandKey && m.an === info.an)
      : [];

    if (byYear.length > 0) {
      this.rezultate = byYear;
      this.exactYearMatch = true;
      this.state = 'found';
      return;
    }

    // Fallback: orice mașină din brandul respectiv
    const byBrand = this.toateMasinile.filter(m => m.brandKey === info.brandKey);

    if (byBrand.length === 0) {
      this.state = 'no-stock';
      return;
    }

    this.rezultate = byBrand;
    this.exactYearMatch = false;
    this.state = 'found';
  }

  aplicaDemoVin(vin: string) {
    this.vinInput = vin;
    this.cauta();
  }

  reseteaza() {
    this.vinInput = '';
    this.state = 'idle';
    this.decoded = null;
    this.rezultate = [];
  }

  get vinAfisatFormatat(): string {
    if (!this.decoded?.vin) return '';
    const v = this.decoded.vin;
    return `${v.slice(0, 3)} ${v.slice(3, 9)} ${v.slice(9, 10)} ${v.slice(10, 11)} ${v.slice(11)}`;
  }

  get totalPieseDisponibile(): number {
    return this.rezultate.reduce((s, m) => s + m.totalPiese, 0);
  }
}
