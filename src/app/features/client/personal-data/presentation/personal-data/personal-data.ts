import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { filter } from 'rxjs';

import { PersonalDataFacade } from '../../application/personal-data.facade';
import { PersonalDataResponse } from '../../domain/model/personal-data-response.model';

@Component({
  selector: 'app-personal-data',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './personal-data.html',
  styleUrl: './personal-data.scss',
})
export class PersonalDataComponent {
  private readonly facade = inject(PersonalDataFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly form = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  protected readonly loading = toSignal(this.facade.loading$, { initialValue: false });
  protected readonly error = toSignal(this.facade.error$, { initialValue: null });

  constructor() {
    this.facade.data$
      .pipe(
        filter((data): data is PersonalDataResponse => data !== null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((data: PersonalDataResponse) => this.form.patchValue(data));

    this.facade.load();
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.facade.update(this.form.getRawValue());
  }
}
