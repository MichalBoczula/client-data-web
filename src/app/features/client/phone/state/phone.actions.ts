import { createAction, props } from '@ngrx/store';

import { PhoneResponse } from '../domain/model/phone-response.model';
import { UpdatePhoneCommand } from '../domain/model/update-phone/update-phone-command.model';

export const loadPhone = createAction('[Phone] Load');
export const loadPhoneSuccess = createAction(
  '[Phone] Load Success',
  props<{ data: PhoneResponse }>(),
);
export const loadPhoneFailure = createAction('[Phone] Load Failure', props<{ error: string }>());
export const updatePhone = createAction('[Phone] Update', props<{ command: UpdatePhoneCommand }>());
export const updatePhoneSuccess = createAction(
  '[Phone] Update Success',
  props<{ data: PhoneResponse }>(),
);
export const updatePhoneFailure = createAction(
  '[Phone] Update Failure',
  props<{ error: string }>(),
);
