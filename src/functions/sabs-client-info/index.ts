import { APIGatewayProxyResult } from "aws-lambda";
import { Logger } from "@libs/logger/logger";
import { ProductService } from "@functions/sabs-client-info/services/product-service/product-service";
import { formatJSONResponse } from "@libs/api-gateway/api-gateway";
import { constants } from "http2";
import { ClientInfo } from "./use-cases/client-info.use-case";
import { UserService } from "./services/user-service/user-service";
import { ClientInfoResponseDto } from "./dto/client-info.response.dto";
import { HttpStatusCode } from "axios";

export const handler = async (
  event: Record<string, any>,
): Promise<APIGatewayProxyResult> => {
  const logger: Logger = Logger.create("getClientInfo");
  logger.log("Init getClientInfo ");
  const nationalId = event.queryStringParameters?.identification;
  const clientInfo = new ClientInfo(
    logger,
    new UserService(logger),
    new ProductService(logger),
  );

  let responseStatus = constants.HTTP_STATUS_OK;

  const clientInfoResult: ClientInfoResponseDto = await clientInfo
    .execute(nationalId)
    .catch((err) => {
      logger.error(err, "Error getClientInfo");
      responseStatus = HttpStatusCode.InternalServerError;
      return err;
    });

  return formatJSONResponse(clientInfoResult, responseStatus);
};
// trigger pipeline 6
