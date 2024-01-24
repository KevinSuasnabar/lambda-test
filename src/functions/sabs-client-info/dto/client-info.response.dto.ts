import { AccountParsedResponseDto } from "@functions/sabs-client-info/dto/account-parsed-response.dto";
import { UserDetailParsedResponseDto } from "@functions/sabs-client-info/dto/user-detail-parsed-response.dto";

export class ClientInfoResponseDto {
  clientDetail?: UserDetailParsedResponseDto;
  accountList?: AccountParsedResponseDto[];
  responseCode: string;
  description: string;
}
