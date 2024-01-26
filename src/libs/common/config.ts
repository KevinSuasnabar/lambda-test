import "dotenv/config";

export default {
  env: process.env.ENV,
  aws: {
    region: process.env.SAB_AWS_REGION || process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  swapiService: {
    path: process.env.SWAPI_SERVICE_URL,
  },
  dynamodb: {
    endpoint: process.env.DYNAMODB_ENDPOINT_LOCAL,
  },
  logger: {
    level: process.env.LOGGER_LEVEL,
  },
};
