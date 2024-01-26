export class StarshipApiCamelCaseResponseDto {
    constructor(
        public starshipId: number,
        public name: string,
        public model: string,
        public manufacturer: string,
        public costInCredits: string,
        public length: string,
        public maxAtmospheringSpeed: string,
        public crew: string,
        public passengers: string,
        public cargoCapacity: string,
        public consumables: string,
        public hyperdriveRating: string,
        public MGLT: string,
        public starshipClass: string,
        public pilots: string[],
        public films: string[],
        public created: string,
        public edited: string,
        public url: string) {

    }
}

