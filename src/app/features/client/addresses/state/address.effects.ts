import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, of } from 'rxjs';

import { AddressRepositoryPort } from '../domain/interfaces/address-repository.port';
import { AddressResponse } from '../domain/model/address-response.model';
import { UpdateAddressCommand } from '../domain/model/update-address/update-address-command.model';
import {
  loadAddress,
  loadAddressFailure,
  loadAddressSuccess,
  updateAddress,
  updateAddressFailure,
  updateAddressSuccess,
} from './address.actions';

@Injectable()
export class AddressEffects {
  private readonly actions$ = inject(Actions);
  private readonly repository = inject(AddressRepositoryPort);

  readonly load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAddress),
      exhaustMap(() =>
        this.repository.get().pipe(
          map((data: AddressResponse) => loadAddressSuccess({ data })),
          catchError((error: unknown) =>
            of(
              loadAddressFailure({
                error: this.getErrorMessage(error, 'Unable to load address.'),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAddress),
      concatMap(({ command }: { command: UpdateAddressCommand }) =>
        this.repository.update(command).pipe(
          map((data: AddressResponse) => updateAddressSuccess({ data })),
          catchError((error: unknown) =>
            of(
              updateAddressFailure({
                error: this.getErrorMessage(error, 'Unable to update address.'),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  private getErrorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
  }
}
