import { EmailResponse } from '../../domain/model/email-response.model';
import { UpdateEmailCommand } from '../../domain/model/update-email/update-email-command.model';
import { UpdateEmailRequest } from '../../domain/model/update-email/update-email-request.model';

export interface EmailApiDto {
  email_address: string;
}

export class EmailMapper {
  static fromApi(dto: EmailApiDto): EmailResponse {
    return { email: dto.email_address };
  }

  static toUpdateRequest(command: UpdateEmailCommand): UpdateEmailRequest {
    return { email: command.email };
  }
}
