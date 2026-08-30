import { createFeature, createReducer, on } from '@ngrx/store';

import { AddressResponse } from '../domain/model/address-response.model';
import {
  loadAddress,
  loadAddressFailure,
  loadAddressSuccess,
  updateAddress,
  updateAddressFailure,
  updateAddressSuccess,
} from './address.actions';

export interface AddressState {
  data: AddressResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AddressState = {
  data: null,
  loading: false,
  error: null,
};

export const addressFeature = createFeature({
  name: 'address',
  reducer: createReducer(
    initialState,
    on(loadAddress, updateAddress, (state: AddressState) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(
      loadAddressSuccess,
      updateAddressSuccess,
      (state: AddressState, { data }: { data: AddressResponse }) => ({
        ...state,
        data,
        loading: false,
        error: null,
      }),
    ),
    on(
      loadAddressFailure,
      updateAddressFailure,
      (state: AddressState, { error }: { error: string }) => ({
        ...state,
        loading: false,
        error,
      }),
    ),
  ),
});
