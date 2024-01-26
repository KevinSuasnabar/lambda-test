import { DynamoDBFactory } from "@libs/dynamodb/dynamodb-factory";
import { PutCommand, ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { STARSHIP_TABLE } from "@libs/dynamodb/table/table-name.dynamodb";

import { StarshipEntity } from "@libs/dynamodb/table/model/starship.entity";
import { SEED_ID } from "@libs/common/constants";

export class StarshipRepository extends DynamoDBFactory {
    private static instance: StarshipRepository;
    private constructor() {
        super();
    }

    static create(): StarshipRepository {
        if (!StarshipRepository.instance) {
            StarshipRepository.instance = new StarshipRepository();
        }
        return StarshipRepository.instance;
    }

    async insertStarship(starship: StarshipEntity): Promise<any> {
        const command = new PutCommand({
            TableName: STARSHIP_TABLE,
            Item: {
                ...starship,
                starship_id: Number(starship.starship_id),
            },
        });

        this.docClient.send(command);

    }

    async findNextStarShipId(): Promise<number> {
        const scanCommand = new ScanCommand({
            TableName: STARSHIP_TABLE,
            ProjectionExpression: "starship_id",
        });

        const result = await this.docClient.send(scanCommand);
        const ids = result.Items?.map((item: any) => item.starship_id as number) || [];
        return ids.length > 0 ? Math.max(...ids, SEED_ID) + 1 : SEED_ID;

    }

    async getStarshipById(starShipId: number) {
        const command: GetCommand = new GetCommand({
            TableName: STARSHIP_TABLE,
            Key: {
                starship_id: Number(starShipId),
            },
        });
        return this.docClient
            .send(command)
            .then(({ Item: item }: Record<string, any>): StarshipEntity => {
                if (!item) {
                    console.log("no hay")

                    return null;
                }
                console.log("si hay")

                return item;
            });
    }
}
