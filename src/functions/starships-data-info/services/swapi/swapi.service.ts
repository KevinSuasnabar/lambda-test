import { StarshipApiResponseDto } from "@functions/starships-data-info/dto/response/starship-api-response.dto";
import config from "@libs/common/config";
import { Logger } from "@libs/logger/logger";
import axios from "axios";

export class SwapiService {
  constructor(private readonly logger: Logger) { }

  async findStarShipById(starShipId: number): Promise<StarshipApiResponseDto> {
    this.logger.log(`Start findStarShipById, starShipId: ${starShipId}`);
    return axios
      .get(`${config.swapiService.path}/starships/${starShipId}`)
      .then(({ data: response }) => {
        console.log(response)
        return response
      })
      .catch((error) => {
        this.logger.log(`Error in findStarShipById, message: ${error?.response}`);
        return error;
      })
  }
}
