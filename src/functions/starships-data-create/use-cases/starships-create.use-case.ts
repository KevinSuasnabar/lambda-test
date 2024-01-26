import { Logger } from "@libs/logger/logger";
import { StarshipCreateRequestDto as StarshipCreateRequestDto } from "@functions/starships-data-create/dtos/starship-create-request.dto";
import { StarshipRepository } from "@libs/dynamodb/repository/starships.repository";

export class StarshipCreateUseCase {


  constructor(
    private readonly logger: Logger,
  ) { }



  async execute(
    request: StarshipCreateRequestDto,
  ): Promise<any> {
    this.logger.log("Execute use case StarshipCreateUseCase")
    const starShipRespository = StarshipRepository.create();
    const nextId = await starShipRespository.findNextStarShipId()
    await starShipRespository.insertStarship(this.buildEntityToSave(request, nextId));

    return {
      comment: 'ok'
    };
  }



  private buildEntityToSave(request: StarshipCreateRequestDto, starshipId: number) {
    if (request && starshipId) {
      const starshipToSave = {
        starship_id: starshipId,
        name: request?.nombre,
        model: request?.modelo,
        manufacturer: request?.fabricante,
        cost_in_credits: request?.costoEnCreditos,
        length: request?.longitud,
        max_atmosphering_speed: request?.velocidadMaximaAtmosferica,
        crew: request?.tripulacion,
        passengers: request?.pasajeros,
        cargo_capacity: request?.capacidadCarga,
        consumables: request?.consumibles,
        hyperdrive_rating: request?.indiceDeHipervelocidad,
        MGLT: request?.MGLT,
        starship_class: request?.claseDeNave,
        pilots: request?.pilotos,
        films: request?.peliculas,
        created: new Date().toISOString(),
        edited: new Date().toISOString(),
        url: request?.url
      }
      return starshipToSave;
    }
    return null;
  }
}
