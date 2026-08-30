import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PhoneFacade } from '../../application/phone.facade';
import { PhoneComponent } from './phone';

describe('PhoneComponent', () => {
  const facade = {
    data$: of({ phone: '+44 123 456 789' }),
    loading$: of(false),
    error$: of(null),
    load: vi.fn(),
    update: vi.fn(),
  };

  beforeEach(async () => {
    facade.load.mockClear();
    facade.update.mockClear();

    await TestBed.configureTestingModule({
      imports: [PhoneComponent],
      providers: [{ provide: PhoneFacade, useValue: facade }],
    }).compileComponents();
  });

  it('loads and renders the phone response', async () => {
    const fixture = TestBed.createComponent(PhoneComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(facade.load).toHaveBeenCalledOnce();
    expect(input.value).toBe('+44 123 456 789');
  });

  it('requires a phone before updating', () => {
    const fixture = TestBed.createComponent(PhoneComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const form = element.querySelector('form');
    const input = element.querySelector('input') as HTMLInputElement;

    setInputValue(input, '');
    form?.dispatchEvent(new Event('submit'));
    expect(facade.update).not.toHaveBeenCalled();

    setInputValue(input, '+44 987 654 321');
    form?.dispatchEvent(new Event('submit'));
    expect(facade.update).toHaveBeenCalledWith({ phone: '+44 987 654 321' });
  });

  function setInputValue(input: HTMLInputElement, value: string): void {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
});
