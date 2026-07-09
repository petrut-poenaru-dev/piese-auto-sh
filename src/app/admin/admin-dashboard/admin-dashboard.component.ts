import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AdminCarsService } from '../admin-cars.service';
import { AuthService } from '../../auth/auth.service';
import { AdminCar } from '../../shared/models';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, CurrencyPipe, DecimalPipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  cars: AdminCar[] = [];
  seIncarca = true;
  eroare = '';

  constructor(
    private carsService: AdminCarsService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.incarca();
  }

  incarca() {
    this.seIncarca = true;
    this.carsService.list().subscribe({
      next: cars => {
        this.cars = cars;
        this.seIncarca = false;
      },
      error: () => {
        this.eroare = 'Nu am putut încărca mașinile.';
        this.seIncarca = false;
      },
    });
  }

  get masiniVanzare(): AdminCar[] {
    return this.cars.filter(c => c.tip === 'vanzare');
  }

  get masiniDezmembrat(): AdminCar[] {
    return this.cars.filter(c => c.tip === 'dezmembrat');
  }

  sterge(car: AdminCar) {
    if (!confirm(`Ștergi definitiv "${car.name}"? Piesele asociate se șterg și ele.`)) return;

    this.carsService.remove(car.id).subscribe({
      next: () => (this.cars = this.cars.filter(c => c.id !== car.id)),
      error: () => alert('Ștergerea a eșuat.'),
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
