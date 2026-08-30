import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UpdateEmailCommand } from '../domain/model/update-email/update-email-command.model';
import { loadEmail, updateEmail } from '../state/email.actions';
import { emailFeature } from '../state/email.feature';

@Injectable({ providedIn: 'root' })
export class EmailFacade {
  private readonly store = inject(Store);

  readonly data$ = this.store.select(emailFeature.selectData);
  readonly loading$ = this.store.select(emailFeature.selectLoading);
  readonly error$ = this.store.select(emailFeature.selectError);

  load(): void {
    this.store.dispatch(loadEmail());
  }

  update(command: UpdateEmailCommand): void {
    this.store.dispatch(updateEmail({ command }));
  }
}
