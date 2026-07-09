import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  email = '';
  password = '';
  eroare = '';
  seIncarca = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (!this.email || !this.password) return;

    this.eroare = '';
    this.seIncarca = true;

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.seIncarca = false;
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.seIncarca = false;
        this.eroare = 'Email sau parolă incorecte.';
      },
    });
  }
}
