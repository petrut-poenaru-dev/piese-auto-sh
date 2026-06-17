import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  formSuccess = false;
  formLoading = false;

  form = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  onSubmit(): void {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.formLoading = true;

    // Simulate API call
    setTimeout(() => {
      this.formLoading = false;
      this.formSuccess = true;
      this.form = { name: '', email: '', phone: '', subject: '', message: '' };
      setTimeout(() => this.formSuccess = false, 6000);
    }, 1000);
  }
}
