import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway/api-gateway";
import { Logger } from "@libs/logger/logger";
import { constants } from "http2";
import { DepositDto } from "@functions/sabs-debit-credit/dtos/deposit.dto";
import { MakeDeposit } from "@functions/sabs-debit-credit/use-cases/make-deposit.use-case";
import { DepositService } from "@functions/sabs-debit-credit/services/deposit-service";
import { HttpStatusCode } from "axios";
import { SabsResponseStatusCodeDto } from "./dtos/response-credit.dto";
export const handler = async (
  event: Record<string, any>,
): Promise<APIGatewayProxyResult> => {
  const logger: Logger = Logger.create("Deposit Credit-Debit ");
  const payload = new DepositDto(JSON.parse(event?.body));
  const makeDeposit = new MakeDeposit(logger, new DepositService(logger));
  let responseStatus = constants.HTTP_STATUS_OK;

  const makeDepositResult: SabsResponseStatusCodeDto = await makeDeposit
    .execute(payload)
    .catch((error) => {
      logger.error(error, "Error when send saving account");
      responseStatus = HttpStatusCode.InternalServerError;
      return error;
    });

  return formatJSONResponse(makeDepositResult, responseStatus);
};
// trigger pipeline 1
