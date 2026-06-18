import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { MarciComponent } from './marci/marci.component';
import { PieseMarcaComponent } from './piese-marca/piese-marca.component';
import { PieseCategorieComponent } from './piese-categorie/piese-categorie.component';
import { MasinaDetaliuComponent } from './masina-detaliu/masina-detaliu.component';

export const routes: Routes = [
  { path: '',                       component: HomeComponent },
  { path: 'contact',                component: ContactComponent },
  { path: 'masina/:id',             component: MasinaDetaliuComponent },

  // Flux căutare: Marcă → Mașină de dezmembrat → Piese disponibile
  { path: 'marci',                  component: MarciComponent },          // toate mărcile
  { path: 'marci/:brand',           component: PieseMarcaComponent },     // mașinile mărcii
  { path: 'marci/:brand/:masina',   component: PieseCategorieComponent }, // piesele unei mașini

  { path: '**',                     redirectTo: '' }
];
