import { PersonalDataResponse } from '../../domain/model/personal-data-response.model';
import { UpdatePersonalDataCommand } from '../../domain/model/update-personal-data/update-personal-data-command.model';
import { UpdatePersonalDataRequest } from '../../domain/model/update-personal-data/update-personal-data-request.model';

export interface PersonalDataApiDto {
  first_name: string;
  last_name: string;
}

export class PersonalDataMapper {
  static fromApi(dto: PersonalDataApiDto): PersonalDataResponse {
    return {
      firstName: dto.first_name,
      lastName: dto.last_name,
    };
  }

  static toUpdateRequest(command: UpdatePersonalDataCommand): UpdatePersonalDataRequest {
    return {
      firstName: command.firstName,
      lastName: command.lastName,
    };
  }
}
