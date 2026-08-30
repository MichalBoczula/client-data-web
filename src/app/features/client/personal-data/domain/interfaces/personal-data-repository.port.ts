import { Observable } from 'rxjs';

import { PersonalDataResponse } from '../model/personal-data-response.model';
import { UpdatePersonalDataCommand } from '../model/update-personal-data/update-personal-data-command.model';

export abstract class PersonalDataRepositoryPort {
  abstract get(): Observable<PersonalDataResponse>;
  abstract update(command: UpdatePersonalDataCommand): Observable<PersonalDataResponse>;
}
