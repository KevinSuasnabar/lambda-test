import { faker } from "@faker-js/faker";
import { DepositDto } from "../../dtos/deposit.dto";
import { ACCOUNT_TYPES } from "../../enums/account-types.enum";

export class DepositMother {
  static random(): DepositDto {
    return new DepositDto({
      documentId: faker.string.uuid(),
      documentType: "CEDULA",
      accountNumber: faker.finance.accountNumber(),
      currency: faker.finance.currency().name,
      amount: Number(faker.finance.amount()),
      sequence: faker.string.uuid(),
      type: "0212",
      accountType: faker.helpers.enumValue(ACCOUNT_TYPES),
    });
  }

  static credit(): DepositDto {
    return new DepositDto({
      ...DepositMother.random(),
      accountType: ACCOUNT_TYPES.SAV,
    });
  }

  static withType(accountType: ACCOUNT_TYPES): DepositDto {
    return new DepositDto({
      ...DepositMother.random(),
      accountType,
    });
  }
}
