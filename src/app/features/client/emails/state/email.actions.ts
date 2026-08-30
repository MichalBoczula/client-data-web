import { createAction, props } from '@ngrx/store';

import { EmailResponse } from '../domain/model/email-response.model';
import { UpdateEmailCommand } from '../domain/model/update-email/update-email-command.model';

export const loadEmail = createAction('[Email] Load');

export const loadEmailSuccess = createAction(
  '[Email] Load Success',
  props<{ data: EmailResponse }>(),
);

export const loadEmailFailure = createAction('[Email] Load Failure', props<{ error: string }>());

export const updateEmail = createAction('[Email] Update', props<{ command: UpdateEmailCommand }>());

export const updateEmailSuccess = createAction(
  '[Email] Update Success',
  props<{ data: EmailResponse }>(),
);

export const updateEmailFailure = createAction(
  '[Email] Update Failure',
  props<{ error: string }>(),
);
