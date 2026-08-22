import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { MarciComponent } from './marci/marci.component';
import { PieseMarcaComponent } from './piese-marca/piese-marca.component';
import { PieseCategorieComponent } from './piese-categorie/piese-categorie.component';
import { MasinaDetaliuComponent } from './masina-detaliu/masina-detaliu.component';
import { MasiniListComponent } from './masini-list/masini-list.component';
import { ProduseComponent } from './produse/produse.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminCarFormComponent } from './admin/admin-car-form/admin-car-form.component';
import { authGuard } from './auth/auth.guard';
import { TermsComponent } from './legal/terms/terms.component';
import { PrivacyComponent } from './legal/privacy/privacy.component';
import { CookiesComponent } from './legal/cookies/cookies.component';

export const routes: Routes = [
  { path: '',                       component: HomeComponent },
  { path: 'contact',                component: ContactComponent },
  { path: 'produse',                component: ProduseComponent },
  { path: 'masini/:tip',            component: MasiniListComponent },
  { path: 'masina/:id',             component: MasinaDetaliuComponent },
  { path: 'cos',                    component: CartComponent },
  { path: 'checkout',               component: CheckoutComponent },

  // Legal
  { path: 'termeni-si-conditii',    component: TermsComponent },
  { path: 'confidentialitate',      component: PrivacyComponent },
  { path: 'cookie-uri',             component: CookiesComponent },

  // Flux căutare: Marcă → Mașină de dezmembrat → Piese disponibile
  { path: 'marci',                  component: MarciComponent },          // toate mărcile
  { path: 'marci/:brand',           component: PieseMarcaComponent },     // mașinile mărcii
  { path: 'marci/:brand/:masina',   component: PieseCategorieComponent }, // piesele unei mașini

  // Admin
  { path: 'admin/login',            component: AdminLoginComponent },
  { path: 'admin',                  component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'admin/masini/:id',       component: AdminCarFormComponent,   canActivate: [authGuard] },

  { path: '**',                     redirectTo: '' }
];
