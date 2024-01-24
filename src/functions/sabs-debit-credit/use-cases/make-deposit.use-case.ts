import { Logger } from "@libs/logger/logger";
import { DepositService } from "@functions/sabs-debit-credit/services/deposit-service";
import { DepositDto } from "@functions/sabs-debit-credit/dtos/deposit.dto";
import { ACCOUNT_TYPES } from "@functions/sabs-debit-credit/enums/account-types.enum";
import { SabsResponseStatusCodeDto } from "../dtos/response-credit.dto";

export class MakeDeposit {
  constructor(
    private readonly logger: Logger,
    private readonly service: DepositService,
  ) {}

  async execute(
    payload: DepositDto,
  ): Promise<SabsResponseStatusCodeDto | void> {
    if (payload.accountType === ACCOUNT_TYPES.SAV) {
      return this.service.toSavingsAccount(payload);
    }
  }
}
