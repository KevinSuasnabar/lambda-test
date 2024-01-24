import { MockProxy, mock } from "jest-mock-extended";
import { DepositMother } from "../object-mothers/deposit-mother";
import { MakeDeposit } from "../../use-cases/make-deposit.use-case";
import { Logger } from "../../../../libs/logger/logger";
import { DepositDto } from "../../dtos/deposit.dto";
import { DepositService } from "../../services/deposit-service";
import { ACCOUNT_TYPES } from "../../enums/account-types.enum";

describe("Deposit Credit-Debit", () => {
  let depositService: MockProxy<DepositService>;
  let logger: Logger;
  let payload: DepositDto;

  beforeEach(() => {
    depositService = mock();
    logger = Logger.create("Deposit Credit Test");
    payload = DepositMother.credit();
  });

  it("Should call account service when account type is SAV", async () => {
    const makeDeposit = new MakeDeposit(logger, depositService);
    await makeDeposit.execute(payload);
    expect(depositService.toSavingsAccount).toHaveBeenCalledTimes(1);
    expect(depositService.toSavingsAccount).toHaveBeenCalledWith(payload);
  });

  it("Should do nothing is account type is not SAV", async () => {
    payload = DepositMother.withType(ACCOUNT_TYPES.LOAN);
    const makeDeposit = new MakeDeposit(logger, depositService);
    await makeDeposit.execute(payload);
    expect(depositService.toSavingsAccount).toHaveBeenCalledTimes(0);
  });
});
