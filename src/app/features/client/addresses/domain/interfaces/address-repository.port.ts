import { Observable } from 'rxjs';

import { AddressResponse } from '../model/address-response.model';
import { UpdateAddressCommand } from '../model/update-address/update-address-command.model';

export abstract class AddressRepositoryPort {
  abstract get(): Observable<AddressResponse>;
  abstract update(command: UpdateAddressCommand): Observable<AddressResponse>;
}
