import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { PersonalDataRepositoryPort } from '../../domain/interfaces/personal-data-repository.port';
import { PersonalDataResponse } from '../../domain/model/personal-data-response.model';
import { UpdatePersonalDataCommand } from '../../domain/model/update-personal-data/update-personal-data-command.model';
import { PersonalDataApiDto, PersonalDataMapper } from '../mappers/personal-data.mapper';

@Injectable()
export class PersonalDataMockRepository implements PersonalDataRepositoryPort {
  private readonly latency = 300;
  private personalData: PersonalDataApiDto = {
    first_name: 'John',
    last_name: 'Doe',
  };

  get(): Observable<PersonalDataResponse> {
    return of(PersonalDataMapper.fromApi(this.personalData)).pipe(delay(this.latency));
  }

  update(command: UpdatePersonalDataCommand): Observable<PersonalDataResponse> {
    const request = PersonalDataMapper.toUpdateRequest(command);
    this.personalData = {
      first_name: request.firstName,
      last_name: request.lastName,
    };

    return of(PersonalDataMapper.fromApi(this.personalData)).pipe(delay(this.latency));
  }
}
