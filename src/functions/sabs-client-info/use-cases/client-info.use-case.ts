import { Logger } from "@libs/logger/logger";
import { UserService } from "@functions/sabs-client-info/services/user-service/user-service";
import { ProductService } from "@functions/sabs-client-info/services/product-service/product-service";
import {
  refactorAccountData,
  refactorUserData,
} from "@functions/sabs-client-info/utils/mapper.util";
import { ClientInfoResponseDto } from "@functions/sabs-client-info/dto/client-info.response.dto";
import { SUCCESS_CLIENT_INFO } from "@libs/api-gateway/common/gcs-status";
import { ResponseError } from "@libs/common/response-error.dto";

export class ClientInfo {
  constructor(
    private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  async execute(nationalId: string): Promise<ClientInfoResponseDto> {
    const userResponse = await this.userService.getUserData(nationalId);
    if (!(userResponse instanceof ResponseError)) {
      const accountResponse = await this.productService.getProductsDetail(
        userResponse.id,
      );

      if (!(accountResponse instanceof ResponseError)) {
        const userDataRefactored = refactorUserData(userResponse);
        const accountsDataRefactored = refactorAccountData(
          accountResponse.accountList,
        );
        return {
          clientDetail: userDataRefactored,
          accountList: accountsDataRefactored,
          description: SUCCESS_CLIENT_INFO.description,
          responseCode: SUCCESS_CLIENT_INFO.code,
        };
      }
      return accountResponse;
    }
    return userResponse;
  }
}
