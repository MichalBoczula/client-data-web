import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UpdatePhoneCommand } from '../domain/model/update-phone/update-phone-command.model';
import { loadPhone, updatePhone } from '../state/phone.actions';
import { phoneFeature } from '../state/phone.feature';

@Injectable({ providedIn: 'root' })
export class PhoneFacade {
  private readonly store = inject(Store);

  readonly data$ = this.store.select(phoneFeature.selectData);
  readonly loading$ = this.store.select(phoneFeature.selectLoading);
  readonly error$ = this.store.select(phoneFeature.selectError);

  load(): void {
    this.store.dispatch(loadPhone());
  }

  update(command: UpdatePhoneCommand): void {
    this.store.dispatch(updatePhone({ command }));
  }
}
