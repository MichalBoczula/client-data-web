import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AddressFacade } from '../../addresses/application/address.facade';
import { EmailFacade } from '../../emails/application/email.facade';
import { PhoneFacade } from '../../phone/application/phone.facade';
import { ContactDataPageComponent } from './contact-data-page';

describe('ContactDataPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDataPageComponent],
      providers: [
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
        {
          provide: EmailFacade,
          useValue: {
            data$: of(null),
            loading$: of(false),
            error$: of(null),
            load: vi.fn(),
            update: vi.fn(),
          },
        },
        {
          provide: PhoneFacade,
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

  it('composes Address, Email, and Phone components', () => {
    const fixture = TestBed.createComponent(ContactDataPageComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('app-address')).toBeTruthy();
    expect(element.querySelector('app-email')).toBeTruthy();
    expect(element.querySelector('app-phone')).toBeTruthy();
  });
});
