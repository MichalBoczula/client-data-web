import { Component } from '@angular/core';

import { EmailComponent } from '../../emails/presentation/email/email';
import { PhoneComponent } from '../../phone/presentation/phone/phone';

@Component({
  selector: 'app-contact-data-page',
  imports: [EmailComponent, PhoneComponent],
  templateUrl: './contact-data-page.html',
  styleUrl: './contact-data-page.scss',
})
export class ContactDataPageComponent {}
