import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { PhoneRepositoryPort } from '../../domain/interfaces/phone-repository.port';
import { PhoneResponse } from '../../domain/model/phone-response.model';
import { UpdatePhoneCommand } from '../../domain/model/update-phone/update-phone-command.model';
import { PhoneApiDto, PhoneMapper } from '../mappers/phone.mapper';

@Injectable()
export class PhoneMockRepository implements PhoneRepositoryPort {
  private readonly latency = 300;
  private phoneData: PhoneApiDto = {
    phone_number: '+44 123 456 789',
  };

  get(): Observable<PhoneResponse> {
    return of(PhoneMapper.fromApi(this.phoneData)).pipe(delay(this.latency));
  }

  update(command: UpdatePhoneCommand): Observable<PhoneResponse> {
    const request = PhoneMapper.toUpdateRequest(command);
    this.phoneData = { phone_number: request.phone };

    return of(PhoneMapper.fromApi(this.phoneData)).pipe(delay(this.latency));
  }
}
