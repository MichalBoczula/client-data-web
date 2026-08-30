import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { filter } from 'rxjs';

import { EmailFacade } from '../../application/email.facade';
import { EmailResponse } from '../../domain/model/email-response.model';

@Component({
  selector: 'app-email',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './email.html',
  styleUrl: './email.scss',
})
export class EmailComponent {
  private readonly facade = inject(EmailFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  protected readonly loading = toSignal(this.facade.loading$, { initialValue: false });
  protected readonly error = toSignal(this.facade.error$, { initialValue: null });

  constructor() {
    this.facade.data$
      .pipe(
        filter((data): data is EmailResponse => data !== null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((data: EmailResponse) => this.form.patchValue(data));

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
