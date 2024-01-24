import {
  GetSecretValueCommand,
  GetSecretValueCommandOutput,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { DEV_LOCAL } from "@libs/api-gateway/common/constants";
import config from "@libs/common/config";
import { Logger } from "@libs/logger/logger";

export class SecretManagerFactory {
  private client: SecretsManagerClient;
  private logger: Logger;
  private static instance: SecretManagerFactory;
  private static key: string;
  private constructor() {
    this.logger = Logger.create("SecretManagerFactory");
    this.client = this.buildAWSConfigToSecretManager();
  }
  static create(key: string): SecretManagerFactory {
    SecretManagerFactory.key = key;
    if (!SecretManagerFactory.instance) {
      SecretManagerFactory.instance = new SecretManagerFactory();
    }
    return SecretManagerFactory.instance;
  }

  async getSecretValue(secretId: string): Promise<string> {
    if (config.env === DEV_LOCAL) {
      return "na";
    }
    return this.client
      .send(
        new GetSecretValueCommand({
          SecretId: secretId,
        }),
      )
      .then(
        (response: GetSecretValueCommandOutput) =>
          JSON.parse(response.SecretString)[SecretManagerFactory.key],
      )
      .catch((error) => this.logger.error(error));
  }

  private buildAWSConfigToSecretManager() {
    const { region } = config.aws;
    const { accessKeyId, secretAccessKey } = config.aws;
    if (config.env === DEV_LOCAL) {
      return new SecretsManagerClient({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
    }
    return new SecretsManagerClient({
      region,
    });
  }
}
