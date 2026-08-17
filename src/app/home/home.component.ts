import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MasiniService } from '../shared/masini.service';
import { CartService } from '../shared/cart.service';
import { coverStyle, Masina } from '../shared/models';
import { PRODUCTS } from '../shared/products';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('heroVideo') heroVideo?: ElementRef<HTMLVideoElement>;

  constructor(
    private router: Router,
    private masiniService: MasiniService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.masiniService.getAll('vanzare').subscribe(m => (this.masiniVanzare = m));
    this.masiniService.getAll('dezmembrat').subscribe(m => (this.masiniDezmembrat = m));
  }

  ngAfterViewInit() {
    // Angular hydration poate reseta proprietatea `muted` deși atributul rămâne setat
    if (this.heroVideo) this.heroVideo.nativeElement.muted = true;
  }

  // Card marcă (strip-ul "mărci premium") → aceeași destinație ca pe pagina /marci
  goToBrand(brandKey: string): void {
    this.router.navigate(['/marci', brandKey]);
  }

  // Card mașină → pagina de detaliu (întreg cardul e clickabil, nu doar butonul "Informații")
  goToCar(id: string): void {
    this.router.navigate(['/masina', id]);
  }

  // Buton hero secundar
  scrollToBrands(): void {
    document.getElementById('marci-premium')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  products = PRODUCTS;

  justAddedSku: string | null = null;

  adaugaInCos(product: (typeof this.products)[number]): void {
    this.cartService.add({ id: product.sku, nume: product.name, cod: product.sku, pret: product.price });
    this.justAddedSku = product.sku;
    setTimeout(() => {
      if (this.justAddedSku === product.sku) this.justAddedSku = null;
    }, 1500);
  }

  faqs = [
    {
      q: 'Piesele sunt originale OEM?',
      a: 'Da, toate piesele noastre provin din dezmembrări certificate și sunt verificate individual înainte de vânzare. Garantăm autenticitatea fiecărei piese.'
    },
    {
      q: 'Cum verific compatibilitatea cu mașina mea?',
      a: 'Puteți verifica compatibilitatea folosind numărul VIN al vehiculului în pagina Caută VIN sau contactând echipa noastră.'
    },
    {
      q: 'Oferiți garanție pentru piese?',
      a: 'Toate piesele beneficiază de garanție 90 de zile. Piesele mecanice majore (motor, cutie de viteze) au garanție extinsă de 6 luni.'
    },
    {
      q: 'Care este termenul de livrare?',
      a: 'Livrăm în 24–48 ore pentru stocurile disponibile. Piesele comandate special pot necesita 3–7 zile lucrătoare în toată România.'
    },
    {
      q: 'Acceptați returul pieselor?',
      a: 'Da, acceptăm returul în 30 de zile dacă piesa nu se potrivește sau prezintă defecțiuni. Piesa trebuie returnată în starea originală, nemodificată.'
    }
  ];

  testimonials = [
    {
      name: 'Alexandru M.',
      city: 'București',
      text: 'Piesa s-a potrivit perfect pe Mercedes-ul meu. Calitate excelentă și livrare rapidă!',
      stars: 5
    },
    {
      name: 'Cristina P.',
      city: 'Cluj-Napoca',
      text: 'Echipă profesionistă, m-au ajutat să identific piesa corectă după VIN. Recomand cu căldură!',
      stars: 5
    },
    {
      name: 'Mihai D.',
      city: 'Timișoara',
      text: 'Prețuri corecte și piese verificate. Am cumpărat de mai multe ori și nu am avut nicio problemă.',
      stars: 5
    }
  ];

  // ── Mașini (încărcate din API, folosite și pe pagina de detaliu) ──
  masiniVanzare: Masina[] = [];
  masiniDezmembrat: Masina[] = [];

  activeFaq: number | null = null;

  toggleFaq(index: number): void {
    this.activeFaq = this.activeFaq === index ? null : index;
  }

  stars(n: number): number[] {
    return Array(n).fill(0);
  }

  readonly coverStyle = coverStyle;
}
