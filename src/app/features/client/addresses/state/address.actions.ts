import { createAction, props } from '@ngrx/store';

import { AddressResponse } from '../domain/model/address-response.model';
import { UpdateAddressCommand } from '../domain/model/update-address/update-address-command.model';

export const loadAddress = createAction('[Address] Load');

export const loadAddressSuccess = createAction(
  '[Address] Load Success',
  props<{ data: AddressResponse }>(),
);

export const loadAddressFailure = createAction(
  '[Address] Load Failure',
  props<{ error: string }>(),
);

export const updateAddress = createAction(
  '[Address] Update',
  props<{ command: UpdateAddressCommand }>(),
);

export const updateAddressSuccess = createAction(
  '[Address] Update Success',
  props<{ data: AddressResponse }>(),
);

export const updateAddressFailure = createAction(
  '[Address] Update Failure',
  props<{ error: string }>(),
);
