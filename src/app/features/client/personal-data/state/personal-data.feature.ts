import { createFeature, createReducer, on } from '@ngrx/store';

import { PersonalDataResponse } from '../domain/model/personal-data-response.model';
import {
  loadPersonalData,
  loadPersonalDataFailure,
  loadPersonalDataSuccess,
  updatePersonalData,
  updatePersonalDataFailure,
  updatePersonalDataSuccess,
} from './personal-data.actions';

export interface PersonalDataState {
  data: PersonalDataResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: PersonalDataState = {
  data: null,
  loading: false,
  error: null,
};

export const personalDataFeature = createFeature({
  name: 'personalData',
  reducer: createReducer(
    initialState,
    on(loadPersonalData, updatePersonalData, (state: PersonalDataState) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(
      loadPersonalDataSuccess,
      updatePersonalDataSuccess,
      (state: PersonalDataState, { data }: { data: PersonalDataResponse }) => ({
        ...state,
        data,
        loading: false,
        error: null,
      }),
    ),
    on(
      loadPersonalDataFailure,
      updatePersonalDataFailure,
      (state: PersonalDataState, { error }: { error: string }) => ({
        ...state,
        loading: false,
        error,
      }),
    ),
  ),
});
