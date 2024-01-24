import { Logger } from "@libs/logger/logger";
import { MockProxy, mock } from "jest-mock-extended";
import axios from "axios";
import { ProductService } from "@functions/sabs-client-info/services/product-service";
import {
  mockHttpResponse,
  mockNationalId,
} from "@libs/data-unit-test/mock-data";

describe("ProductService", () => {
  let logger: MockProxy<Logger>;

  beforeEach(() => {
    logger = mock();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getClientInfo function", async () => {
    const service = new ProductService(logger);
    const hmac = jest.spyOn(ProductService.prototype as any, "getHMAC");
    const mockAxiosget = jest
      .mock("axios")
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve(mockHttpResponse));

    await service.getClientInfo(mockNationalId);
    expect(mockAxiosget).toBeCalledTimes(1);
    expect(hmac).toBeCalledTimes(1);
  });

  it("getClientInfo function axios error", async () => {
    const service = new ProductService(logger);
    const hmac = jest.spyOn(ProductService.prototype as any, "getHMAC");
    jest.mock("axios").spyOn(axios, "get").mockRejectedValue("Error");

    await expect(service.getClientInfo(mockNationalId)).rejects.toThrow();
    expect(hmac).toBeCalledTimes(1);
  });
});
