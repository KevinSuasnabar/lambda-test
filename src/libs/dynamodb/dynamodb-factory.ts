import config from "@libs/common/config";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DEV_LOCAL } from "@libs/api-gateway/common/constants";
export class DynamoDBFactory {
  private readonly client: DynamoDBClient;
  docClient: DynamoDBDocumentClient;
  constructor() {
    this.client = new DynamoDBClient(this.buildAWSConfig());
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }
  private buildAWSConfig() {
    const { endpoint } = config.dynamodb;
    const { region, accessKeyId, secretAccessKey } = config.aws;
    const env = config.env;
    if (env === DEV_LOCAL) {
      return {
        endpoint,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
        region,
      };
    }
    return {
      region,
    };
  }
}
