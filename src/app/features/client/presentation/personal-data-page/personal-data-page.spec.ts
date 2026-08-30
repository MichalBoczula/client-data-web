import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AddressFacade } from '../../addresses/application/address.facade';
import { PersonalDataFacade } from '../../personal-data/application/personal-data.facade';
import { PersonalDataPageComponent } from './personal-data-page';

describe('PersonalDataPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalDataPageComponent],
      providers: [
        {
          provide: PersonalDataFacade,
          useValue: {
            data$: of(null),
            loading$: of(false),
            error$: of(null),
            load: vi.fn(),
            update: vi.fn(),
          },
        },
        {
          provide: AddressFacade,
          useValue: {
            data$: of(null),
            loading$: of(false),
            error$: of(null),
            load: vi.fn(),
            update: vi.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  it('composes Personal Data and Address components', () => {
    const fixture = TestBed.createComponent(PersonalDataPageComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('app-personal-data')).toBeTruthy();
    expect(element.querySelector('app-address')).toBeTruthy();
  });
});
