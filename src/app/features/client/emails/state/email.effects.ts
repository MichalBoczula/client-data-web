import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, of } from 'rxjs';

import { EmailRepositoryPort } from '../domain/interfaces/email-repository.port';
import { EmailResponse } from '../domain/model/email-response.model';
import { UpdateEmailCommand } from '../domain/model/update-email/update-email-command.model';
import {
  loadEmail,
  loadEmailFailure,
  loadEmailSuccess,
  updateEmail,
  updateEmailFailure,
  updateEmailSuccess,
} from './email.actions';

@Injectable()
export class EmailEffects {
  private readonly actions$ = inject(Actions);
  private readonly repository = inject(EmailRepositoryPort);

  readonly load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmail),
      exhaustMap(() =>
        this.repository.get().pipe(
          map((data: EmailResponse) => loadEmailSuccess({ data })),
          catchError((error: unknown) =>
            of(
              loadEmailFailure({
                error: this.getErrorMessage(error, 'Unable to load email.'),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  readonly update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateEmail),
      concatMap(({ command }: { command: UpdateEmailCommand }) =>
        this.repository.update(command).pipe(
          map((data: EmailResponse) => updateEmailSuccess({ data })),
          catchError((error: unknown) =>
            of(
              updateEmailFailure({
                error: this.getErrorMessage(error, 'Unable to update email.'),
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
