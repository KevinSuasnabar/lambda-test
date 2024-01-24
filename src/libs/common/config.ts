import "dotenv/config";

export default {
  env: process.env.ENV,
  aws: {
    region: process.env.SAB_AWS_REGION || process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  productService: {
    path: process.env.PRODUCT_SERVICE_URL,
  },
  userService: {
    path: process.env.USER_SERVICE_URL,
  },
  dynamodb: {
    endpoint: process.env.DYNAMODB_ENDPOINT_LOCAL,
  },
  hmacKeys: {
    productHmacKey: process.env.PRODUCT_SERVICE_HMAC_KEY,
  },
  accountService: {
    basePath: process.env.ACCOUNT_SERVICE_URL,
    hmacKey: process.env.ACCOUNT_SERVICE_HMAC_KEY_SECRET_ARN,
  },
  sftpService: {
    sftp: {
      sourceFolder: process.env.GCS_SFTP_SOURCE_FOLDER,
      server: process.env.GCS_SFTP_SERVER,
      user: process.env.GCS_SFTP_USER,
      password: process.env.GCS_SFTP_PASSWORD,
      port: process.env.GCS_SFTP_PORT,
      timeout: process.env.GCS_SFTP_TIMEOUT,
      debugEnabled: process.env.GCS_SFTP_DEBUG_ENABLED,
    },
    sftpTempTargetFolder: process.env.SFTP_TEMP_TARGET_FOLDER,
  },
  logger: {
    level: process.env.LOGGER_LEVEL,
  },
};
