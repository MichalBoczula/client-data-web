import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UpdatePersonalDataCommand } from '../domain/model/update-personal-data/update-personal-data-command.model';
import { loadPersonalData, updatePersonalData } from '../state/personal-data.actions';
import { personalDataFeature } from '../state/personal-data.feature';

@Injectable({ providedIn: 'root' })
export class PersonalDataFacade {
  private readonly store = inject(Store);

  readonly data$ = this.store.select(personalDataFeature.selectData);
  readonly loading$ = this.store.select(personalDataFeature.selectLoading);
  readonly error$ = this.store.select(personalDataFeature.selectError);

  load(): void {
    this.store.dispatch(loadPersonalData());
  }

  update(command: UpdatePersonalDataCommand): void {
    this.store.dispatch(updatePersonalData({ command }));
  }
}
