import { httpsAgent } from "@libs/api-gateway/agent-http.helper";
import {
  customHMacHeaders,
  getHMacSignature,
} from "@libs/api-gateway/hmac.helper";
import config from "@libs/common/config";
import { Logger } from "@libs/logger/logger";
import axios from "axios";
import {
  PRODUCT_SERVICE_HMAC_KEY,
  PRODUCT_SERVICE_HMAC_SECRET_ID,
} from "@functions/sabs-client-info/commons/constants";
import { AccountListDto } from "@functions/sabs-client-info/dto/accountList.dto";
import { mapQikToGcsError } from "@libs/common/error-mapper";
import { ResponseError } from "@libs/common/response-error.dto";

export class ProductService {
  constructor(private readonly logger: Logger) {}

  async getProductsDetail(
    userId: string,
  ): Promise<AccountListDto | ResponseError> {
    const hmacProduct = await this.getHMAC(
      PRODUCT_SERVICE_HMAC_SECRET_ID,
      PRODUCT_SERVICE_HMAC_KEY,
    );
    this.logger.log("Start get accounts info");

    return axios
      .get(
        `${config.productService.path}/sabs/user-products?userId=${userId}`,
        {
          headers: hmacProduct,
          httpsAgent: httpsAgent,
        },
      )
      .then(({ data: response }) => response)
      .catch(async (error) => await mapQikToGcsError(error))
      .then((response: AccountListDto | ResponseError) => response);
  }

  private async getHMAC(secretId: string, key: string) {
    return customHMacHeaders(getHMacSignature, secretId, key);
  }
}
