import {
  BANK_ID,
  BANK_NAME,
  CURRENCY,
  TYPE_ACCOUNT,
} from "@functions/sabs-client-info/commons/constants";
import { UserDataDto } from "@functions/sabs-client-info/dto/user-data.dto";
import { AccountDto } from "@functions/sabs-client-info/dto/account.dto";
import { UserDetailParsedResponseDto } from "@functions/sabs-client-info/dto/user-detail-parsed-response.dto";
import { AccountParsedResponseDto } from "@functions/sabs-client-info/dto/account-parsed-response.dto";

export const refactorUserData = (
  userData: UserDataDto
): UserDetailParsedResponseDto => {
  const principalAddress = userData?.addresses.find(
    (address: any) => address?.principal
  );
  const userJCE = userData?.userJCE;
  const customerFullName = `${userJCE?.firstName} ${userJCE?.lastName1} ${userJCE?.lastName2}`;
  const address = `${principalAddress?.street} ${principalAddress?.buildingNumber} ${principalAddress?.building} ${principalAddress?.district}`;
  const status = userData?.status;
  const city = principalAddress?.town;
  const email = userData?.email;
  const gender = userJCE?.sex;
  const dateOfBirth = userJCE?.bornDate;

  return {
    customerFullName,
    address,
    status,
    city,
    segment: "",
    officerCode: "",
    officerName: "",
    email,
    gender,
    dateOfBirth,
  };
};

export const refactorAccountData = (
  accountList: AccountDto[]
): AccountParsedResponseDto[] => {
  const mappedAccounts = [];
  if (accountList && accountList.length > 0) {
    for (const element of accountList) {
      const { account, balanceAccount } = element;
      const mappedAccount = {
        bankId: BANK_ID,
        bankName: BANK_NAME,
        number: account?.reference,
        alias: "",
        type: TYPE_ACCOUNT.SAV,
        currency: CURRENCY.DOP,
        status: account?.status,
        relation: "",
        balance: balanceAccount?.availableFunds,
        availableBalance: balanceAccount?.availableBalance,
      };
      mappedAccounts.push(mappedAccount);
    }
  }

  return mappedAccounts;
};
