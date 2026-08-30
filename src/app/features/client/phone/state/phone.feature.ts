import { createFeature, createReducer, on } from '@ngrx/store';

import { PhoneResponse } from '../domain/model/phone-response.model';
import {
  loadPhone,
  loadPhoneFailure,
  loadPhoneSuccess,
  updatePhone,
  updatePhoneFailure,
  updatePhoneSuccess,
} from './phone.actions';

export interface PhoneState {
  data: PhoneResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: PhoneState = {
  data: null,
  loading: false,
  error: null,
};

export const phoneFeature = createFeature({
  name: 'phone',
  reducer: createReducer(
    initialState,
    on(loadPhone, updatePhone, (state: PhoneState) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(
      loadPhoneSuccess,
      updatePhoneSuccess,
      (state: PhoneState, { data }: { data: PhoneResponse }) => ({
        ...state,
        data,
        loading: false,
        error: null,
      }),
    ),
    on(loadPhoneFailure, updatePhoneFailure, (state: PhoneState, { error }: { error: string }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
});
