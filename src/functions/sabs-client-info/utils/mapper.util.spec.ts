import {
  refactorAccountData,
  refactorUserData,
} from "@functions/sabs-client-info/utils/mapper.util";
import {
  accountList,
  expectedMappedAccounts,
  expectedUserData,
  userData,
} from "@libs/data-unit-test/mock-data";

describe("refactorUserData", () => {
  it("should return the correct user data", () => {
    const result = refactorUserData(userData);
    expect(result).toEqual(expectedUserData);
  });
});
describe("refactorAccountData", () => {
  it("should return the mapped accounts", () => {
    const result = refactorAccountData(accountList);
    expect(result).toEqual(expectedMappedAccounts);
  });

  it("should return an empty array if accountList is empty", () => {
    const accountList: any = [];
    const result = refactorAccountData(accountList);
    expect(result).toEqual([]);
  });
});
