import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, of } from 'rxjs';

import { PersonalDataRepositoryPort } from '../domain/interfaces/personal-data-repository.port';
import { PersonalDataResponse } from '../domain/model/personal-data-response.model';
import { UpdatePersonalDataCommand } from '../domain/model/update-personal-data/update-personal-data-command.model';
import {
  loadPersonalData,
  loadPersonalDataFailure,
  loadPersonalDataSuccess,
  updatePersonalData,
  updatePersonalDataFailure,
  updatePersonalDataSuccess,
} from './personal-data.actions';

@Injectable()
export class PersonalDataEffects {
  private readonly actions$ = inject(Actions);
  private readonly repository = inject(PersonalDataRepositoryPort);

  readonly load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPersonalData),
      exhaustMap(() =>
        this.repository.get().pipe(
          map((data: PersonalDataResponse) => loadPersonalDataSuccess({ data })),
          catchError((error: unknown) =>
            of(
              loadPersonalDataFailure({
                error: this.getErrorMessage(error, 'Unable to load personal data.'),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePersonalData),
      concatMap(({ command }: { command: UpdatePersonalDataCommand }) =>
        this.repository.update(command).pipe(
          map((data: PersonalDataResponse) => updatePersonalDataSuccess({ data })),
          catchError((error: unknown) =>
            of(
              updatePersonalDataFailure({
                error: this.getErrorMessage(error, 'Unable to update personal data.'),
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
