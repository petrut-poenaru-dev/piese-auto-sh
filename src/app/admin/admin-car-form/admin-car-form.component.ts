import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminCarsService } from '../admin-cars.service';
import { AdminCar, AdminCarInput, AdminPart, TipMasina } from '../../shared/models';

const GRADIENT_PRESETS = [
  'linear-gradient(135deg, #16213e 0%, #3a4550 100%)',
  'linear-gradient(135deg, #0f3460 0%, #2d4a6e 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #2d3338 100%)',
  'linear-gradient(135deg, #232526 0%, #414345 100%)',
  'linear-gradient(135deg, #2c1810 0%, #4a3528 100%)',
  'linear-gradient(135deg, #1a2a1e 0%, #2d4035 100%)',
  'linear-gradient(135deg, #1e1e24 0%, #3a3a44 100%)',
];

type FormModel = AdminCarInput & { dotariText: string };

function emptyForm(tip: TipMasina): FormModel {
  return {
    tip,
    name: '',
    an: new Date().getFullYear(),
    km: '',
    combustibil: 'Diesel',
    bg: GRADIENT_PRESETS[0],
    descriere: '',
    dotari: [],
    dotariText: '',
    brand: '',
    brandKey: '',
    model: '',
    cutie: 'Manuală',
    putere: '',
    pret: undefined,
    stare: 'Înmatriculată',
    motor: '',
    caroserie: 'Berlină',
    culoare: '',
    cod: '',
    disponibilitate: 'Piese pe stoc',
  };
}

@Component({
  selector: 'app-admin-car-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-car-form.component.html',
  styleUrl: './admin-car-form.component.scss',
})
export class AdminCarFormComponent implements OnInit {
  readonly gradients = GRADIENT_PRESETS;

  mode: 'create' | 'edit' = 'create';
  carId: string | null = null;
  form: FormModel = emptyForm('vanzare');

  seIncarca = false;
  seSalveaza = false;
  eroare = '';

  // ── Piese (doar în modul editare, pt. mașini de dezmembrat) ──
  parts: AdminPart[] = [];
  newPart = this.blankPart();

  // Odată ce utilizatorul editează manual brand key-ul, nu mai suprascriem cu sugestia automată.
  private brandKeyAtinsManual = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carsService: AdminCarsService
  ) {}

  ngOnInit() {
    // route.paramMap (nu snapshot): la navigarea internă din "creare" spre "editare" pe aceeași
    // rută (/admin/masini/:id), Angular reutilizează instanța componentei — ngOnInit nu rulează
    // din nou, dar acest subscribe reacționează corect la noul :id.
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (!id || id === 'noua') {
        this.mode = 'create';
        this.carId = null;
        this.parts = [];
        this.brandKeyAtinsManual = false;
        const tipParam = this.route.snapshot.queryParamMap.get('tip');
        this.form = emptyForm(tipParam === 'dezmembrat' ? 'dezmembrat' : 'vanzare');
        return;
      }

      this.mode = 'edit';
      this.carId = id;
      this.seIncarca = true;

      this.carsService.get(id).subscribe({
        next: car => {
          this.applyCar(car);
          this.brandKeyAtinsManual = true;
          this.seIncarca = false;
        },
        error: () => {
          this.eroare = 'Mașina nu a fost găsită.';
          this.seIncarca = false;
        },
      });
    });
  }

  private applyCar(car: AdminCar) {
    this.form = {
      tip: car.tip,
      name: car.name,
      an: car.an,
      km: car.km,
      combustibil: car.combustibil,
      bg: car.bg,
      descriere: car.descriere,
      dotari: car.dotari,
      dotariText: car.dotari.join(', '),
      brand: car.brand ?? '',
      brandKey: car.brandKey ?? '',
      model: car.model ?? '',
      cutie: car.cutie ?? '',
      putere: car.putere ?? '',
      pret: car.pret,
      stare: car.stare ?? '',
      motor: car.motor ?? '',
      caroserie: car.caroserie ?? '',
      culoare: car.culoare ?? '',
      cod: car.cod ?? '',
      disponibilitate: car.disponibilitate ?? '',
    };
    this.parts = car.parts;
  }

  get esteDezmembrat(): boolean {
    return this.form.tip === 'dezmembrat';
  }

  onBrandInput() {
    if (!this.brandKeyAtinsManual) {
      this.form.brandKey = (this.form.brand ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '');
    }
  }

  onBrandKeyInput() {
    this.brandKeyAtinsManual = true;
  }

  submit() {
    this.eroare = '';
    const { dotariText, ...rest } = this.form;
    const payload: AdminCarInput = {
      ...rest,
      dotari: dotariText
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
    };

    this.seSalveaza = true;

    if (this.mode === 'create') {
      this.carsService.create(payload).subscribe({
        next: car => {
          this.seSalveaza = false;
          this.router.navigate(['/admin/masini', car.id]);
        },
        error: err => {
          this.seSalveaza = false;
          this.eroare = err?.error?.error ?? 'Salvarea a eșuat.';
        },
      });
    } else if (this.carId) {
      this.carsService.update(this.carId, payload).subscribe({
        next: car => {
          this.seSalveaza = false;
          this.applyCar(car);
        },
        error: err => {
          this.seSalveaza = false;
          this.eroare = err?.error?.error ?? 'Salvarea a eșuat.';
        },
      });
    }
  }

  // ── Piese ──
  private blankPart(): Omit<AdminPart, 'id'> {
    return { grupa: '', nume: '', disponibil: true, stare: 'Bună', pret: 0, cod: '' };
  }

  adaugaPiesa() {
    if (!this.carId || !this.newPart.grupa || !this.newPart.nume || !this.newPart.cod) return;

    this.carsService.addPart(this.carId, this.newPart).subscribe({
      next: part => {
        this.parts = [...this.parts, part];
        this.newPart = this.blankPart();
      },
      error: () => alert('Nu am putut adăuga piesa.'),
    });
  }

  actualizeazaPiesa(part: AdminPart) {
    this.carsService.updatePart(part.id, part).subscribe({
      error: () => alert('Nu am putut actualiza piesa.'),
    });
  }

  stergePiesa(part: AdminPart) {
    if (!confirm(`Ștergi piesa "${part.nume}"?`)) return;

    this.carsService.removePart(part.id).subscribe({
      next: () => (this.parts = this.parts.filter(p => p.id !== part.id)),
      error: () => alert('Ștergerea a eșuat.'),
    });
  }
}
