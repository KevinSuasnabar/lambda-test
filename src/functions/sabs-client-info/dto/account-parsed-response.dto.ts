export class AccountParsedResponseDto {
  bankId: string;
  bankName: string;
  number: string;
  alias?: string;
  type: string;
  currency: string;
  status?: boolean;
  relation?: string;
  balance: number;
  availableBalance: number;
}
