import config from "@libs/common/config";
import { Logger } from "@libs/logger/logger";
import axios from "axios";
import { DepositDto } from "@functions/sabs-debit-credit/dtos/deposit.dto";
import {
  customHMacHeaders,
  getHMacSignature,
} from "@libs/api-gateway/hmac.helper";
import { httpsAgent } from "@libs/api-gateway/agent-http.helper";
import {
  HMAC_ACCOUNT_KEY,
  HMAC_ACCOUNT_SECRET_ID,
} from "@functions/sabs-debit-credit/constants";
import { SabsResponseStatusCodeDto } from "../dtos/response-credit.dto";
import { mapQikToGcsError } from "@libs/common/error-mapper";

export class DepositService {
  constructor(private readonly logger: Logger) {}

  async toSavingsAccount(
    payload: DepositDto,
  ): Promise<SabsResponseStatusCodeDto> {
    this.logger.log("Making a CA deposit");
    const url = `${config.accountService.basePath}/sabs/credit`;
    const hmac = await customHMacHeaders(
      getHMacSignature,
      HMAC_ACCOUNT_SECRET_ID,
      HMAC_ACCOUNT_KEY,
    );
    return axios
      .post(url, payload, { headers: hmac, httpsAgent: httpsAgent })
      .then(({ data: response }) => response)
      .catch(async (error) => {
        const errorMapped = await mapQikToGcsError(error);
        return new SabsResponseStatusCodeDto(
          errorMapped.responseCode,
          errorMapped.description,
        );
      })
      .then((response: SabsResponseStatusCodeDto) => response);
  }
}
