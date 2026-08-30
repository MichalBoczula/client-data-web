import { AddressResponse } from '../../domain/model/address-response.model';
import { UpdateAddressCommand } from '../../domain/model/update-address/update-address-command.model';
import { UpdateAddressRequest } from '../../domain/model/update-address/update-address-request.model';

export interface AddressApiDto {
  street_address: string;
}

export class AddressMapper {
  static fromApi(dto: AddressApiDto): AddressResponse {
    return { address: dto.street_address };
  }

  static toUpdateRequest(command: UpdateAddressCommand): UpdateAddressRequest {
    return { address: command.address };
  }
}
