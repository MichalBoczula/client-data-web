import { Routes } from '@angular/router';

import { ContactDataPageComponent } from './features/client/presentation/contact-data-page/contact-data-page';
import { PersonalDataPageComponent } from './features/client/presentation/personal-data-page/personal-data-page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'client/personal-data' },
  { path: 'client/personal-data', component: PersonalDataPageComponent },
  { path: 'client/contact-data', component: ContactDataPageComponent },
  { path: '**', redirectTo: 'client/personal-data' },
];
