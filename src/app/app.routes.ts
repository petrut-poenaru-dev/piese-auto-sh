import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { MarciComponent } from './marci/marci.component';
import { PieseMarcaComponent } from './piese-marca/piese-marca.component';
import { PieseCategorieComponent } from './piese-categorie/piese-categorie.component';
import { PiesaDetaliuComponent } from './piesa-detaliu/piesa-detaliu.component';

export const routes: Routes = [
  { path: '',                             component: HomeComponent },
  { path: 'contact',                      component: ContactComponent },
  { path: 'marci',                        component: MarciComponent },
  { path: 'marci/:brand',                 component: PieseMarcaComponent },
  { path: 'marci/:brand/:slug',           component: PieseCategorieComponent },
  { path: 'marci/:brand/:slug/:id',       component: PiesaDetaliuComponent },
  { path: '**',                           redirectTo: '' }
];
