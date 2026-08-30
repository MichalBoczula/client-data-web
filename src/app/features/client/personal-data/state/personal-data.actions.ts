import { createAction, props } from '@ngrx/store';

import { PersonalDataResponse } from '../domain/model/personal-data-response.model';
import { UpdatePersonalDataCommand } from '../domain/model/update-personal-data/update-personal-data-command.model';

export const loadPersonalData = createAction('[Personal Data] Load');

export const loadPersonalDataSuccess = createAction(
  '[Personal Data] Load Success',
  props<{ data: PersonalDataResponse }>(),
);

export const loadPersonalDataFailure = createAction(
  '[Personal Data] Load Failure',
  props<{ error: string }>(),
);

export const updatePersonalData = createAction(
  '[Personal Data] Update',
  props<{ command: UpdatePersonalDataCommand }>(),
);

export const updatePersonalDataSuccess = createAction(
  '[Personal Data] Update Success',
  props<{ data: PersonalDataResponse }>(),
);

export const updatePersonalDataFailure = createAction(
  '[Personal Data] Update Failure',
  props<{ error: string }>(),
);
