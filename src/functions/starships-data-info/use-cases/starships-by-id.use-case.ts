import { Logger } from "@libs/logger/logger";
import { SwapiService } from "@functions/starships-data-info/services/swapi/swapi.service";
import { StarshipRepository } from "@libs/dynamodb/repository/starships.repository";
import { mapperKeys } from "@libs/mapper-keys/mapper-keys";
import { StarshipResponseDto } from "@functions/starships-data-info/dto/response/starship-response.dto";
import { StarshipApiResponseDto } from "@functions/starships-data-info/dto/response/starship-api-response.dto";
import { StarshipApiCamelCaseBuilder } from "@functions/starships-data-info/builder/starship/starship.builder";

export class StarshipByIdUseCase {

  
  constructor(
    private readonly logger: Logger,
    private readonly swapiService: SwapiService,
  ) { }



  public async execute(starShipId: number): Promise<StarshipResponseDto> {
    this.logger.log("Execute use case StarshipByIdUseCase")
    //find in database
    const starshipFoundedInDb = await this.getStarship(starShipId);
    if (starshipFoundedInDb) {
      return mapperKeys(starshipFoundedInDb);
    }
    //if not found in database, find in api (swapi) and save
    const starshipFoundedInApi = await this.swapiService.findStarShipById(starShipId);
    if (starshipFoundedInApi) {
      const starshipCamelCaseBuilded = StarshipApiCamelCaseBuilder.createStarshipApiCamelCaseBuilderFromStarshipApiResponseDto(starshipFoundedInApi, starShipId);
      await this.createStarship({ ...starshipFoundedInApi, starship_id: starShipId });
      return mapperKeys(starshipCamelCaseBuilded);
    }
    return null;
  }



  private async createStarship(starShipDto: StarshipApiResponseDto) {
    const starshipRespository = StarshipRepository.create();
    const starshipCreated = await starshipRespository.insertStarship({ ...starShipDto, created: new Date().toISOString(), edited: new Date().toISOString() });
    return starshipCreated;
  }




  private async getStarship(starShipId: number) {
    const starshipRespository = StarshipRepository.create();
    const starshipCreated = await starshipRespository.getStarshipById(starShipId);
    const starshipBuilded = StarshipApiCamelCaseBuilder.createStarshipApiCamelCaseBuilderFromStarshipApiResponseDto(starshipCreated, starShipId);
    return starshipBuilded;

  }



}





