import { PhoneResponse } from '../../domain/model/phone-response.model';
import { UpdatePhoneCommand } from '../../domain/model/update-phone/update-phone-command.model';
import { UpdatePhoneRequest } from '../../domain/model/update-phone/update-phone-request.model';

export interface PhoneApiDto {
  phone_number: string;
}

export class PhoneMapper {
  static fromApi(dto: PhoneApiDto): PhoneResponse {
    return { phone: dto.phone_number };
  }

  static toUpdateRequest(command: UpdatePhoneCommand): UpdatePhoneRequest {
    return { phone: command.phone };
  }
}
