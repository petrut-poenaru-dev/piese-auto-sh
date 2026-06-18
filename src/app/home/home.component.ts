import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { masiniVanzare, masiniDezmembrat } from '../shared/masini.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) {}

  brands = ['Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Toyota', 'Ford', 'Renault', 'Opel'];

  // Bara de căutare: marcă → lista de mașini de dezmembrat ale mărcii
  cautaMarca(brand: string): void {
    if (brand) {
      this.router.navigate(['/marci', brand.toLowerCase()]);
    } else {
      this.router.navigate(['/marci']);
    }
  }

  products = [
    {
      name: 'Prag stânga Mercedes CLS W219',
      sku: 'MRC-W219-001',
      price: 450,
      condition: 'OEM Quality',
      stock: 'In Stoc',
      bg: 'linear-gradient(135deg, #1a1a2e 0%, #2d3338 100%)'
    },
    {
      name: 'Capotă motor BMW Seria 3 E46',
      sku: 'BMW-E46-047',
      price: 320,
      condition: 'German Engineered',
      stock: 'In Stoc',
      bg: 'linear-gradient(135deg, #16213e 0%, #3a4550 100%)'
    },
    {
      name: 'Bară față Audi A4 B8 2008–2012',
      sku: 'AUD-A4B8-219',
      price: 380,
      condition: 'OEM Quality',
      stock: 'Ultimele 2',
      bg: 'linear-gradient(135deg, #0f3460 0%, #2d4a6e 100%)'
    }
  ];

  faqs = [
    {
      q: 'Piesele sunt originale OEM?',
      a: 'Da, toate piesele noastre provin din dezmembrări certificate și sunt verificate individual înainte de vânzare. Garantăm autenticitatea fiecărei piese.'
    },
    {
      q: 'Cum verific compatibilitatea cu mașina mea?',
      a: 'Puteți verifica compatibilitatea folosind numărul VIN al vehiculului sau contactând echipa noastră. Oferim și un tool de căutare după marcă, model și an de fabricație.'
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

  years = Array.from({ length: 15 }, (_, i) => 2024 - i);

  // ── Mașini (date partajate, folosite și pe pagina de detaliu) ──
  masiniVanzare = masiniVanzare;
  masiniDezmembrat = masiniDezmembrat;

  activeFaq: number | null = null;

  toggleFaq(index: number): void {
    this.activeFaq = this.activeFaq === index ? null : index;
  }

  stars(n: number): number[] {
    return Array(n).fill(0);
  }
}
