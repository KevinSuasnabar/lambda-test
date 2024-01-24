import { DynamoDBFactory } from "@libs/dynamodb/dynamodb-factory";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { GCS_STATUS_CODES_TABLE } from "@libs/dynamodb/table/table-name.dynamodb";
import { GcsStatusCodesEntity } from "@libs/dynamodb/table/model/gcs-status-codes.entity";
import { ResponseError } from "@libs/common/response-error.dto";
import {
  GENERIC_ERROR_CODE,
  GENERIC_ERROR_MESSAGE,
} from "@libs/common/constants";

export class GcsStatusCodesRepository extends DynamoDBFactory {
  private static instance: GcsStatusCodesRepository;
  private constructor() {
    super();
  }

  static create(): GcsStatusCodesRepository {
    if (!GcsStatusCodesRepository.instance) {
      GcsStatusCodesRepository.instance = new GcsStatusCodesRepository();
    }
    return GcsStatusCodesRepository.instance;
  }

  async getStatusCodeByQikStatusId(
    qikStatusId: number
  ): Promise<GcsStatusCodesEntity> {
    const command: GetCommand = new GetCommand({
      TableName: GCS_STATUS_CODES_TABLE,
      Key: {
        qik_status_id: qikStatusId,
      },
    });
    return this.docClient
      .send(command)
      .then(({ Item: item }: Record<string, any>): GcsStatusCodesEntity => {
        if (!item) {
          throw new ResponseError(GENERIC_ERROR_CODE, GENERIC_ERROR_MESSAGE);
        }

        return {
          qikStatusId: item.qik_status_id,
          gcsStatusId: item.gcs_status_id,
          qikStatusDetail: item.qik_status_detail,
        };
      });
  }
}
