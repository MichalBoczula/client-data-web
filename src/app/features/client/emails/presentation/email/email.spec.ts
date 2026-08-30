import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EmailFacade } from '../../application/email.facade';
import { EmailComponent } from './email';

describe('EmailComponent', () => {
  const facade = {
    data$: of({ email: 'john.doe@example.com' }),
    loading$: of(false),
    error$: of(null),
    load: vi.fn(),
    update: vi.fn(),
  };

  beforeEach(async () => {
    facade.load.mockClear();
    facade.update.mockClear();

    await TestBed.configureTestingModule({
      imports: [EmailComponent],
      providers: [{ provide: EmailFacade, useValue: facade }],
    }).compileComponents();
  });

  it('loads and renders the email response', async () => {
    const fixture = TestBed.createComponent(EmailComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(facade.load).toHaveBeenCalledOnce();
    expect(input.value).toBe('john.doe@example.com');
  });

  it('requires a valid email before updating', () => {
    const fixture = TestBed.createComponent(EmailComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const form = element.querySelector('form');
    const input = element.querySelector('input') as HTMLInputElement;

    setInputValue(input, 'not-an-email');
    form?.dispatchEvent(new Event('submit'));
    expect(facade.update).not.toHaveBeenCalled();

    setInputValue(input, 'jane.doe@example.com');
    form?.dispatchEvent(new Event('submit'));
    expect(facade.update).toHaveBeenCalledWith({ email: 'jane.doe@example.com' });
  });

  function setInputValue(input: HTMLInputElement, value: string): void {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
});
