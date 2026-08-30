import { Component } from '@angular/core';

import { PersonalDataComponent } from '../../personal-data/presentation/personal-data/personal-data';

@Component({
  selector: 'app-personal-data-page',
  imports: [PersonalDataComponent],
  templateUrl: './personal-data-page.html',
  styleUrl: './personal-data-page.scss',
})
export class PersonalDataPageComponent {}
