import { GcsStatusCodesRepository } from "@libs/dynamodb/repository/gcs-status-codes.repository";
import {
  GENERIC_ERROR_CODE,
  GENERIC_ERROR_MESSAGE,
} from "@libs/common/constants";
import { ResponseError } from "@libs/common/response-error.dto";

export const mapQikToGcsError = async (error: any): Promise<ResponseError> => {
  if (error.response) {
    const errorQikCode =
      Number(error?.response?.data?.businessErrorCode) || null;
    if (!errorQikCode) {
      return new ResponseError(GENERIC_ERROR_CODE, GENERIC_ERROR_MESSAGE);
    }
    const errorGCSCode =
      await GcsStatusCodesRepository.create().getStatusCodeByQikStatusId(
        errorQikCode,
      );
    return new ResponseError(
      errorGCSCode?.gcsStatusId,
      errorGCSCode?.qikStatusDetail,
    );
  } else {
    return new ResponseError(GENERIC_ERROR_CODE, GENERIC_ERROR_MESSAGE);
  }
};
