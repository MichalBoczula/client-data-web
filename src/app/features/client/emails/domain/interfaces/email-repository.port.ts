import { Observable } from 'rxjs';

import { EmailResponse } from '../model/email-response.model';
import { UpdateEmailCommand } from '../model/update-email/update-email-command.model';

export abstract class EmailRepositoryPort {
  abstract get(): Observable<EmailResponse>;
  abstract update(command: UpdateEmailCommand): Observable<EmailResponse>;
}
