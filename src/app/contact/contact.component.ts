import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  // Număr de test — va fi înlocuit cu numărul final de WhatsApp al firmei.
  private readonly whatsappNumber = '40757600008';

  private readonly subjectLabels: Record<string, string> = {
    piesa: 'Cerere piesă auto',
    garantie: 'Garanție piesă',
    livrare: 'Informații livrare',
    retur: 'Retur / Schimb',
    altele: 'Altele',
  };

  form = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  formSubmitted = false;
  eroare = '';

  onSubmit(contactForm: NgForm): void {
    this.formSubmitted = true;

    if (contactForm.invalid) {
      contactForm.form.markAllAsTouched();
      this.eroare = 'Datele introduse sunt invalide. Completează toate câmpurile obligatorii marcate cu *.';
      return;
    }

    this.eroare = '';
    const subjectLabel = this.subjectLabels[this.form.subject] ?? this.form.subject;
    const text = [
      `Nume: ${this.form.name}`,
      `Email: ${this.form.email}`,
      `Telefon: ${this.form.phone}`,
      `Subiect: ${subjectLabel}`,
      `Mesaj: ${this.form.message}`,
    ].join('\n');

    window.location.href = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }
}
