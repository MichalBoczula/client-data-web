import { Component } from '@angular/core';

import { AddressComponent } from '../../addresses/presentation/address/address';
import { PersonalDataComponent } from '../../personal-data/presentation/personal-data/personal-data';

@Component({
  selector: 'app-personal-data-page',
  imports: [PersonalDataComponent, AddressComponent],
  templateUrl: './personal-data-page.html',
  styleUrl: './personal-data-page.scss',
})
export class PersonalDataPageComponent {}
