import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AddressFacade } from '../../application/address.facade';
import { AddressComponent } from './address';

describe('AddressComponent', () => {
  const facade = {
    data$: of({ address: '221B Baker Street, London' }),
    loading$: of(false),
    error$: of(null),
    load: vi.fn(),
    update: vi.fn(),
  };

  beforeEach(async () => {
    facade.load.mockClear();
    facade.update.mockClear();

    await TestBed.configureTestingModule({
      imports: [AddressComponent],
      providers: [{ provide: AddressFacade, useValue: facade }],
    }).compileComponents();
  });

  it('loads and renders the address response', async () => {
    const fixture = TestBed.createComponent(AddressComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    expect(facade.load).toHaveBeenCalledOnce();
    expect(textarea.value).toBe('221B Baker Street, London');
  });

  it('requires an address before updating', () => {
    const fixture = TestBed.createComponent(AddressComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const form = element.querySelector('form');
    const textarea = element.querySelector('textarea') as HTMLTextAreaElement;

    setTextareaValue(textarea, '');
    form?.dispatchEvent(new Event('submit'));
    expect(facade.update).not.toHaveBeenCalled();

    setTextareaValue(textarea, '10 Downing Street, London');
    form?.dispatchEvent(new Event('submit'));
    expect(facade.update).toHaveBeenCalledWith({ address: '10 Downing Street, London' });
  });

  function setTextareaValue(textarea: HTMLTextAreaElement, value: string): void {
    textarea.value = value;
    textarea.dispatchEvent(new Event('input'));
  }
});
