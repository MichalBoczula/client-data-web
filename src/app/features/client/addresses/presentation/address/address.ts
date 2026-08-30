import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { filter } from 'rxjs';

import { AddressFacade } from '../../application/address.facade';
import { AddressResponse } from '../../domain/model/address-response.model';

@Component({
  selector: 'app-address',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './address.html',
  styleUrl: './address.scss',
})
export class AddressComponent {
  private readonly facade = inject(AddressFacade);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly form = this.formBuilder.nonNullable.group({
    address: ['', Validators.required],
  });

  protected readonly loading = toSignal(this.facade.loading$, { initialValue: false });
  protected readonly error = toSignal(this.facade.error$, { initialValue: null });

  constructor() {
    this.facade.data$
      .pipe(
        filter((data): data is AddressResponse => data !== null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((data: AddressResponse) => this.form.patchValue(data));

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
