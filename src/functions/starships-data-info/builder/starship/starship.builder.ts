import { StarshipApiCamelCaseResponseDto } from "@functions/starships-data-info/dto/response/starship-api-camel-case-response.dto";
import { StarshipApiResponseDto } from "@functions/starships-data-info/dto/response/starship-api-response.dto";

export class StarshipApiCamelCaseBuilder {
    private starshipId: number = null;
    private name: string = '';
    private model: string = '';
    private manufacturer: string = '';
    private costInCredits: string = '';
    private length: string = '';
    private maxAtmospheringSpeed: string = '';
    private crew: string = '';
    private passengers: string = '';
    private cargoCapacity: string = '';
    private consumables: string = '';
    private hyperdriveRating: string = '';
    private MGLT: string = '';
    private starshipClass: string = '';
    private pilots: string[] = [];
    private films: string[] = [];
    private created: string = '';
    private edited: string = '';
    private url: string = '';

    setStarshipId(starshipId: number): StarshipApiCamelCaseBuilder {
        this.starshipId = starshipId;
        return this;
    }

    setName(name: string): StarshipApiCamelCaseBuilder {
        this.name = name;
        return this;
    }

    setModel(model: string): StarshipApiCamelCaseBuilder {
        this.model = model;
        return this;
    }

    setManufacturer(manufacturer: string): StarshipApiCamelCaseBuilder {
        this.manufacturer = manufacturer;
        return this;
    }

    setCostInCredits(costInCredits: string): StarshipApiCamelCaseBuilder {
        this.costInCredits = costInCredits;
        return this;
    }

    setLength(length: string): StarshipApiCamelCaseBuilder {
        this.length = length;
        return this;
    }

    setMaxAtmospheringSpeed(maxAtmospheringSpeed: string): StarshipApiCamelCaseBuilder {
        this.maxAtmospheringSpeed = maxAtmospheringSpeed;
        return this;
    }


    setCrew(crew: string): StarshipApiCamelCaseBuilder {
        this.crew = crew;
        return this;
    }

    setPassengers(passengers: string): StarshipApiCamelCaseBuilder {
        this.passengers = passengers;
        return this;
    }

    setCargoCapacity(cargoCapacity: string): StarshipApiCamelCaseBuilder {
        this.cargoCapacity = cargoCapacity;
        return this;
    }

    setConsumables(consumables: string): StarshipApiCamelCaseBuilder {
        this.consumables = consumables;
        return this;
    }

    setHyperdriveRating(hyperdriveRating: string): StarshipApiCamelCaseBuilder {
        this.hyperdriveRating = hyperdriveRating;
        return this;
    }
    setMGLT(MGLT: string): StarshipApiCamelCaseBuilder {
        this.MGLT = MGLT;
        return this;
    }
    setStarshipClass(starshipClass: string): StarshipApiCamelCaseBuilder {
        this.starshipClass = starshipClass;
        return this;
    }

    setPilots(pilots: string[]): StarshipApiCamelCaseBuilder {
        this.pilots = pilots;
        return this;
    }
    setFilms(films: string[]): StarshipApiCamelCaseBuilder {
        this.films = films;
        return this;
    }
    setCreated(created: string): StarshipApiCamelCaseBuilder {
        this.created = created;
        return this;
    }
    setEdited(edited: string): StarshipApiCamelCaseBuilder {
        this.edited = edited;
        return this;
    }

    setUrl(url: string): StarshipApiCamelCaseBuilder {
        this.url = url;
        return this;
    }

    build(): StarshipApiCamelCaseResponseDto {
        return new StarshipApiCamelCaseResponseDto(
            this.starshipId,
            this.name,
            this.model,
            this.manufacturer,
            this.costInCredits,
            this.length,
            this.maxAtmospheringSpeed,
            this.crew,
            this.passengers,
            this.cargoCapacity,
            this.consumables,
            this.hyperdriveRating,
            this.MGLT,
            this.starshipClass,
            this.pilots,
            this.films,
            this.created,
            this.edited,
            this.url,

        );
    }


    static createStarshipApiCamelCaseBuilderFromStarshipApiResponseDto(apiResponseData: StarshipApiResponseDto, starShipId: number) {
        return new StarshipApiCamelCaseBuilder()
            .setStarshipId(starShipId)
            .setName(apiResponseData?.name)
            .setModel(apiResponseData?.model)
            .setManufacturer(apiResponseData?.manufacturer)
            .setCostInCredits(apiResponseData?.cost_in_credits)
            .setLength(apiResponseData?.length)
            .setMaxAtmospheringSpeed(apiResponseData?.max_atmosphering_speed)
            .setCrew(apiResponseData?.crew)
            .setPassengers(apiResponseData?.passengers)
            .setCargoCapacity(apiResponseData?.cargo_capacity)
            .setConsumables(apiResponseData?.consumables)
            .setHyperdriveRating(apiResponseData?.hyperdrive_rating)
            .setMGLT(apiResponseData?.MGLT)
            .setStarshipClass(apiResponseData?.starship_class)
            .setPilots(apiResponseData?.pilots)
            .setFilms(apiResponseData?.films)
            .setCreated(apiResponseData?.created)
            .setEdited(apiResponseData?.edited)
            .setUrl(apiResponseData?.url)
            .build();
    }

}