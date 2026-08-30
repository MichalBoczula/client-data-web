import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { EmailRepositoryPort } from '../../domain/interfaces/email-repository.port';
import { EmailResponse } from '../../domain/model/email-response.model';
import { UpdateEmailCommand } from '../../domain/model/update-email/update-email-command.model';
import { EmailApiDto, EmailMapper } from '../mappers/email.mapper';

@Injectable()
export class EmailMockRepository implements EmailRepositoryPort {
  private readonly latency = 300;
  private emailData: EmailApiDto = {
    email_address: 'john.doe@example.com',
  };

  get(): Observable<EmailResponse> {
    return of(EmailMapper.fromApi(this.emailData)).pipe(delay(this.latency));
  }

  update(command: UpdateEmailCommand): Observable<EmailResponse> {
    const request = EmailMapper.toUpdateRequest(command);
    this.emailData = { email_address: request.email };

    return of(EmailMapper.fromApi(this.emailData)).pipe(delay(this.latency));
  }
}
