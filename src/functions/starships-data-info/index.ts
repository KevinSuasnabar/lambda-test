import { APIGatewayProxyResult } from "aws-lambda";
import { Logger } from "@libs/logger/logger";
import { formatJSONResponse } from "@libs/api-gateway/api-gateway";
import { constants } from "http2";
import { StarshipByIdUseCase } from "@functions/starships-data-info/use-cases/starships-by-id.use-case";
import { SwapiService } from "@functions/starships-data-info/services/swapi/swapi.service";
import { HttpStatusCode } from "axios";
import { StarshipResponseDto } from "@functions/starships-data-info/dto/response/starship-response.dto";

export const handler = async (
  event: Record<string, any>,
): Promise<APIGatewayProxyResult> => {
  const logger: Logger = Logger.create("StarShipByIdUseCase");
  logger.log("Init StarShipByIdUseCase");
  const starShipId: number = event.pathParameters?.starShipId;
  const starShipSearchUseCase = new StarshipByIdUseCase(
    logger,
    new SwapiService(logger),
  );
  let responseStatus = constants.HTTP_STATUS_OK;
  const starShipsResult: StarshipResponseDto = await starShipSearchUseCase
    .execute(starShipId)
    .catch((err) => {
      logger.error(err, "Error when get starship");
      responseStatus = HttpStatusCode.InternalServerError;
      return err;
    });

  return formatJSONResponse(starShipsResult, responseStatus);
};
