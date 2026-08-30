import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, of } from 'rxjs';

import { PhoneRepositoryPort } from '../domain/interfaces/phone-repository.port';
import { PhoneResponse } from '../domain/model/phone-response.model';
import { UpdatePhoneCommand } from '../domain/model/update-phone/update-phone-command.model';
import {
  loadPhone,
  loadPhoneFailure,
  loadPhoneSuccess,
  updatePhone,
  updatePhoneFailure,
  updatePhoneSuccess,
} from './phone.actions';

@Injectable()
export class PhoneEffects {
  private readonly actions$ = inject(Actions);
  private readonly repository = inject(PhoneRepositoryPort);

  readonly load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPhone),
      exhaustMap(() =>
        this.repository.get().pipe(
          map((data: PhoneResponse) => loadPhoneSuccess({ data })),
          catchError((error: unknown) =>
            of(loadPhoneFailure({ error: this.getErrorMessage(error, 'Unable to load phone.') })),
          ),
        ),
      ),
    ),
  );

  readonly update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePhone),
      concatMap(({ command }: { command: UpdatePhoneCommand }) =>
        this.repository.update(command).pipe(
          map((data: PhoneResponse) => updatePhoneSuccess({ data })),
          catchError((error: unknown) =>
            of(
              updatePhoneFailure({
                error: this.getErrorMessage(error, 'Unable to update phone.'),
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
