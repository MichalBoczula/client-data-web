import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PersonalDataFacade } from '../../application/personal-data.facade';
import { PersonalDataComponent } from './personal-data';

describe('PersonalDataComponent', () => {
  const facade = {
    data$: of({ firstName: 'John', lastName: 'Doe' }),
    loading$: of(false),
    error$: of(null),
    load: vi.fn(),
    update: vi.fn(),
  };

  beforeEach(async () => {
    facade.load.mockClear();
    facade.update.mockClear();

    await TestBed.configureTestingModule({
      imports: [PersonalDataComponent],
      providers: [{ provide: PersonalDataFacade, useValue: facade }],
    }).compileComponents();
  });

  it('loads personal data and renders the response', async () => {
    const fixture = TestBed.createComponent(PersonalDataComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const inputs = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    expect(facade.load).toHaveBeenCalledOnce();
    expect(inputs[0].value).toBe('John');
    expect(inputs[1].value).toBe('Doe');
  });

  it('requires first and last names before updating', () => {
    const fixture = TestBed.createComponent(PersonalDataComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const form = element.querySelector('form');
    const inputs = element.querySelectorAll<HTMLInputElement>('input');

    setInputValue(inputs[0], '');
    setInputValue(inputs[1], '');
    form?.dispatchEvent(new Event('submit'));
    expect(facade.update).not.toHaveBeenCalled();

    setInputValue(inputs[0], 'Jane');
    setInputValue(inputs[1], 'Doe');
    form?.dispatchEvent(new Event('submit'));
    expect(facade.update).toHaveBeenCalledWith({ firstName: 'Jane', lastName: 'Doe' });
  });

  function setInputValue(input: HTMLInputElement, value: string): void {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
});
