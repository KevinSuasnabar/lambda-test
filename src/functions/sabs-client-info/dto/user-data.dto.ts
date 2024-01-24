import { AddressDto } from "@functions/sabs-client-info/dto/address.dto";
import { UserJCEDto } from "@functions/sabs-client-info/dto/user-cje.dto";

export class UserDataDto {
  id: string;
  addresses: AddressDto[];
  userJCE: UserJCEDto;
  status: string;
  email: string;
}
