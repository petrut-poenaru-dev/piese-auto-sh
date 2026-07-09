import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { MarciComponent } from './marci/marci.component';
import { PieseMarcaComponent } from './piese-marca/piese-marca.component';
import { PieseCategorieComponent } from './piese-categorie/piese-categorie.component';
import { MasinaDetaliuComponent } from './masina-detaliu/masina-detaliu.component';
import { VinSearchComponent } from './vin-search/vin-search.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminCarFormComponent } from './admin/admin-car-form/admin-car-form.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '',                       component: HomeComponent },
  { path: 'contact',                component: ContactComponent },
  { path: 'masina/:id',             component: MasinaDetaliuComponent },
  { path: 'cauta-vin',              component: VinSearchComponent },

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
