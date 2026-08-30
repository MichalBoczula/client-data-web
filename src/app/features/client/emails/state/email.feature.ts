import { createFeature, createReducer, on } from '@ngrx/store';

import { EmailResponse } from '../domain/model/email-response.model';
import {
  loadEmail,
  loadEmailFailure,
  loadEmailSuccess,
  updateEmail,
  updateEmailFailure,
  updateEmailSuccess,
} from './email.actions';

export interface EmailState {
  data: EmailResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmailState = {
  data: null,
  loading: false,
  error: null,
};

export const emailFeature = createFeature({
  name: 'email',
  reducer: createReducer(
    initialState,
    on(loadEmail, updateEmail, (state: EmailState) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(
      loadEmailSuccess,
      updateEmailSuccess,
      (state: EmailState, { data }: { data: EmailResponse }) => ({
        ...state,
        data,
        loading: false,
        error: null,
      }),
    ),
    on(loadEmailFailure, updateEmailFailure, (state: EmailState, { error }: { error: string }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
});
