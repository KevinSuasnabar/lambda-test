import { AccountInfo } from "@functions/sabs-client-info/dto/account-info.dto";
import { AccountBalanceDto } from "@functions/sabs-client-info/dto/account-balance.dto";

export class AccountDto {
  account: AccountInfo;
  balanceAccount: AccountBalanceDto;
}
