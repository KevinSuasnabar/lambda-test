import { httpsAgent } from "@libs/api-gateway/agent-http.helper";
import {
  customHMacHeaders,
  getHMacSignature,
} from "@libs/api-gateway/hmac.helper";
import config from "@libs/common/config";
import { Logger } from "@libs/logger/logger";
import axios from "axios";
import {
  USER_SERVICE_HMAC_KEY,
  USER_SERVICE_HMAC_SECRET_ID,
} from "@functions/sabs-client-info/commons/constants";
import { UserDataDto } from "@functions/sabs-client-info/dto/user-data.dto";
import { mapQikToGcsError } from "@libs/common/error-mapper";
import { ResponseError } from "@libs/common/response-error.dto";

export class UserService {
  constructor(private readonly logger: Logger) {}

  async getUserData(nationalId: string): Promise<UserDataDto | ResponseError> {
    const hmacUser = await this.getHMAC(
      USER_SERVICE_HMAC_SECRET_ID,
      USER_SERVICE_HMAC_KEY,
    );

    this.logger.log("Start get user info");

    return axios
      .get(`${config.userService.path}/sabs?nationalId=${nationalId}`, {
        headers: hmacUser,
        httpsAgent: httpsAgent,
      })
      .then(({ data: response }) => response)
      .catch(async (error) => await mapQikToGcsError(error))
      .then((response: UserDataDto | ResponseError) => response);
  }

  private async getHMAC(secretId: string, key: string) {
    return customHMacHeaders(getHMacSignature, secretId, key);
  }
}
