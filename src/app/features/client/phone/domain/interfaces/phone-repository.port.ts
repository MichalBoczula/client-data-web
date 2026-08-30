import { Observable } from 'rxjs';

import { PhoneResponse } from '../model/phone-response.model';
import { UpdatePhoneCommand } from '../model/update-phone/update-phone-command.model';

export abstract class PhoneRepositoryPort {
  abstract get(): Observable<PhoneResponse>;
  abstract update(command: UpdatePhoneCommand): Observable<PhoneResponse>;
}
