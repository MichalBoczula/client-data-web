import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UpdateAddressCommand } from '../domain/model/update-address/update-address-command.model';
import { loadAddress, updateAddress } from '../state/address.actions';
import { addressFeature } from '../state/address.feature';

@Injectable({ providedIn: 'root' })
export class AddressFacade {
  private readonly store = inject(Store);

  readonly data$ = this.store.select(addressFeature.selectData);
  readonly loading$ = this.store.select(addressFeature.selectLoading);
  readonly error$ = this.store.select(addressFeature.selectError);

  load(): void {
    this.store.dispatch(loadAddress());
  }

  update(command: UpdateAddressCommand): void {
    this.store.dispatch(updateAddress({ command }));
  }
}
