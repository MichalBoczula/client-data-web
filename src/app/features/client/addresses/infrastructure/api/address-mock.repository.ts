import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { AddressRepositoryPort } from '../../domain/interfaces/address-repository.port';
import { AddressResponse } from '../../domain/model/address-response.model';
import { UpdateAddressCommand } from '../../domain/model/update-address/update-address-command.model';
import { AddressApiDto, AddressMapper } from '../mappers/address.mapper';

@Injectable()
export class AddressMockRepository implements AddressRepositoryPort {
  private readonly latency = 300;
  private addressData: AddressApiDto = {
    street_address: '221B Baker Street, London',
  };

  get(): Observable<AddressResponse> {
    return of(AddressMapper.fromApi(this.addressData)).pipe(delay(this.latency));
  }

  update(command: UpdateAddressCommand): Observable<AddressResponse> {
    const request = AddressMapper.toUpdateRequest(command);
    this.addressData = { street_address: request.address };

    return of(AddressMapper.fromApi(this.addressData)).pipe(delay(this.latency));
  }
}
