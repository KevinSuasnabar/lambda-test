import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway/api-gateway";
import { Logger } from "@libs/logger/logger";
import { constants } from "http2";
import { HttpStatusCode } from "axios";
import { StarshipCreateRequestDto } from "@functions/starships-data-create/dtos/starship-create-request.dto";
import { StarshipCreateUseCase } from "@functions/starships-data-create/use-cases/starships-create.use-case";

export const handler = async (
  event: Record<string, any>,
): Promise<APIGatewayProxyResult> => {
  const logger: Logger = Logger.create("StarshipCreateUseCase");
  const payload = new StarshipCreateRequestDto(JSON.parse(event?.body));
  logger.log("Init StarshipCreateUseCase ");
  const starshipCreateUseCase = new StarshipCreateUseCase(logger);
  let responseStatus = constants.HTTP_STATUS_CREATED;
  const starshipCreated: any = await starshipCreateUseCase
    .execute(payload)
    .catch((error) => {
      logger.error(error, "Error when create starship");
      responseStatus = HttpStatusCode.InternalServerError;
      return error;
    });

  return formatJSONResponse(starshipCreated, responseStatus);
};
