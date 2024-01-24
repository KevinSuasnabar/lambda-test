import { Logger } from "@libs/logger/logger";
import { SftpClient } from "@libs/sftp/sftp-client";
import Ssh2SftpClient from "ssh2-sftp-client";
import {
  testedFilePath,
  mockMethodCwdLog,
  mockClientCwdResponse,
  mockSftpClientConfig,
  mockMethodExistLog1,
  mockClientExistResponse,
  mockClientListResponse,
  mockMethodListLog1,
  mockMethodListLog2Param1,
  mockMethodListLog2Param2,
  mockLogDownloadDir,
  mockClientDownloadDirResponse,
  mockMethodDownloadFileSource,
  mockMethodDownloadFileTarget,
  mockLogDownloadFile,
  mockMethodDownloadDirSource,
  mockMethodDownloadDirTarget,
} from "@libs/sftp/sftp-client.mock-data";

describe("SftpClient", () => {
  let sftpClient: SftpClient;
  const spyClientConnect: jest.SpyInstance<any> = jest.spyOn(
    Ssh2SftpClient.prototype,
    "connect",
  );
  const spyClientEnd: jest.SpyInstance<any> = jest.spyOn(
    Ssh2SftpClient.prototype,
    "end",
  );
  const spyLoggerLog: jest.SpyInstance<any> = jest.spyOn(
    Logger.prototype,
    "log",
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    const mockLoggerCreate = jest
      .fn()
      .mockReturnValue(Logger.create("test SftpClient"));
    Logger.create = mockLoggerCreate;

    sftpClient = SftpClient.create(mockSftpClientConfig);

    spyClientConnect.mockImplementation(() => Promise.resolve(null));
    spyLoggerLog.mockImplementation(() => Promise.resolve(null));
  });

  it("getCurrentWorkingDirectory function", async () => {
    const mockClientCwd = jest
      .spyOn(Ssh2SftpClient.prototype, "cwd")
      .mockImplementation(() => Promise.resolve(mockClientCwdResponse));

    await sftpClient.getCurrentWorkingDirectory();

    expect(spyClientConnect).toHaveBeenCalledTimes(1);
    expect(spyClientConnect).toHaveBeenCalledWith(
      mockSftpClientConfig.connectionOptions,
    );

    expect(mockClientCwd).toHaveBeenCalledTimes(1);

    expect(spyLoggerLog).toHaveBeenCalledTimes(1);
    expect(spyLoggerLog).toHaveBeenCalledWith(mockMethodCwdLog);

    expect(spyClientEnd).toHaveBeenCalledTimes(1);
  });

  it("exists function", async () => {
    const mockClientExist = jest
      .spyOn(Ssh2SftpClient.prototype, "exists")
      .mockImplementation(() => Promise.resolve(false));

    await sftpClient.exists(testedFilePath);

    expect(spyClientConnect).toHaveBeenCalledTimes(1);
    expect(spyClientConnect).toHaveBeenCalledWith(
      mockSftpClientConfig.connectionOptions,
    );

    expect(mockClientExist).toHaveBeenCalledTimes(1);
    expect(mockClientExist).toHaveBeenCalledWith(testedFilePath);

    expect(spyLoggerLog).toHaveBeenCalledTimes(2);
    expect(spyLoggerLog).toHaveBeenNthCalledWith(1, mockMethodExistLog1);
    expect(spyLoggerLog).toHaveBeenNthCalledWith(2, mockClientExistResponse);

    expect(spyClientEnd).toHaveBeenCalledTimes(1);
  });

  it("listFilesInDir function", async () => {
    const mockClientList = jest
      .spyOn(Ssh2SftpClient.prototype, "list")
      .mockImplementation(() => Promise.resolve(mockClientListResponse));

    await sftpClient.listFilesInDir(testedFilePath);

    expect(spyClientConnect).toHaveBeenCalledTimes(1);
    expect(spyClientConnect).toHaveBeenCalledWith(
      mockSftpClientConfig.connectionOptions,
    );

    expect(mockClientList).toHaveBeenCalledTimes(1);
    expect(mockClientList).toHaveBeenCalledWith(testedFilePath);

    expect(spyLoggerLog).toHaveBeenCalledTimes(2);
    expect(spyLoggerLog).toHaveBeenNthCalledWith(1, mockMethodListLog1);
    expect(spyLoggerLog).toHaveBeenNthCalledWith(
      2,
      mockMethodListLog2Param1,
      mockMethodListLog2Param2,
    );

    expect(spyClientEnd).toHaveBeenCalledTimes(1);
  });

  it("downloadDir function", async () => {
    const mockClientDownloadDir = jest
      .spyOn(Ssh2SftpClient.prototype, "downloadDir")
      .mockImplementation(() => Promise.resolve(mockClientDownloadDirResponse));

    const result = await sftpClient.downloadDir(
      mockMethodDownloadDirSource,
      mockMethodDownloadDirTarget,
    );

    expect(spyClientConnect).toHaveBeenCalledTimes(1);
    expect(spyClientConnect).toHaveBeenCalledWith(
      mockSftpClientConfig.connectionOptions,
    );

    expect(mockClientDownloadDir).toHaveBeenCalledTimes(1);
    expect(mockClientDownloadDir).toHaveBeenCalledWith(
      mockMethodDownloadDirSource,
      mockMethodDownloadDirTarget,
    );

    expect(spyLoggerLog).toHaveBeenCalledTimes(1);
    expect(spyLoggerLog).toHaveBeenCalledWith(mockLogDownloadDir);

    expect(result).toStrictEqual(mockClientDownloadDirResponse);

    expect(spyClientEnd).toHaveBeenCalledTimes(1);
  });

  it("downloadFile function", async () => {
    const mockClientGet = jest
      .spyOn(Ssh2SftpClient.prototype, "get")
      .mockImplementation(() => Promise.resolve(mockClientDownloadDirResponse));

    const result = await sftpClient.downloadFile(
      mockMethodDownloadFileSource,
      mockMethodDownloadFileTarget,
    );

    expect(spyClientConnect).toHaveBeenCalledTimes(1);
    expect(spyClientConnect).toHaveBeenCalledWith(
      mockSftpClientConfig.connectionOptions,
    );

    expect(mockClientGet).toHaveBeenCalledTimes(1);
    expect(mockClientGet).toHaveBeenCalledWith(
      mockMethodDownloadFileSource,
      mockMethodDownloadFileTarget,
    );

    expect(spyLoggerLog).toHaveBeenCalledTimes(1);
    expect(spyLoggerLog).toHaveBeenCalledWith(mockLogDownloadFile);

    expect(result).toStrictEqual(mockClientDownloadDirResponse);

    expect(spyClientEnd).toHaveBeenCalledTimes(1);
  });
});
