import crypto from "crypto";
import { SecretManagerFactory } from "@libs/secret-manager/secret-manager-factory";
import {
  ALGORITHM,
  ENCODING_CRYPTO,
  ENCODING_CRYPTO_FORMAT,
  QUERY_DATA_CRYPTO,
} from "@libs/api-gateway/common/constants";

export const getHMacSignature = (microserviceKey: string) => {
  return crypto
    .createHmac(ALGORITHM, microserviceKey)
    .setEncoding(ENCODING_CRYPTO_FORMAT)
    .update(QUERY_DATA_CRYPTO)
    .digest(ENCODING_CRYPTO);
};

export const customHMacHeaders = async (
  getHMacSignature: any,
  secretId: string,
  key: string,
) => {
  const secret =
    await SecretManagerFactory.create(key).getSecretValue(secretId);
  const signature = getHMacSignature(secret);
  return {
    "x-authorization-content-sha512": signature,
  };
};
