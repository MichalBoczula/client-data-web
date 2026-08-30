import { Component } from '@angular/core';

import { ContactDataPageComponent } from '../contact-data-page/contact-data-page';
import { PersonalDataPageComponent } from '../personal-data-page/personal-data-page';

@Component({
  selector: 'app-client-overview',
  imports: [PersonalDataPageComponent, ContactDataPageComponent],
  templateUrl: './client-overview.html',
  styleUrl: './client-overview.scss',
})
export class ClientOverviewComponent {}
