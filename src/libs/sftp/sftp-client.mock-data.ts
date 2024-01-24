import { Config } from "@libs/sftp/interfaces/sftp-client-config.interface";
import sftp from "ssh2-sftp-client";

export const mockClientName = "client-name";

export const mockSftpClientConfig: Config = {
  connectionOptions: {
    debug: expect.any(Function),
    host: "localhost",
    password: "secret",
    port: 2222,
    readyTimeout: 2000,
    username: "qik",
  },
  clientName: mockClientName,
};

export const mockClientCwdResponse = "mockMorkingDirectory";

export const mockMethodCwdLog = `Working directory ${mockClientCwdResponse}`;

export const testedFilePath = `./test-file`;

export const mockMethodExistLog1 = `Check if exist file or dir in SFTP`;
export const mockClientExistResponse = `${testedFilePath}: false`;

export const mockMethodListLog1 = `Listing files from SFTP dir: '${testedFilePath}'`;

export const mockClientListResponse: sftp.FileInfo[] = [
  {
    type: "d",
    name: "bbb",
    size: 0,
    modifyTime: 0,
    accessTime: 0,
    rights: {
      user: "444",
      group: "1",
      other: "",
    },
    owner: 0,
    group: 0,
  },
  {
    type: "l",
    name: "aaa",
    size: 0,
    modifyTime: 0,
    accessTime: 0,
    rights: {
      user: "123",
      group: "2",
      other: "",
    },
    owner: 0,
    group: 0,
  },
];

export const mockMethodListLog2Param1 = mockClientListResponse;
export const mockMethodListLog2Param2 = "List result";

export const mockMethodDownloadDirSource = "./";
export const mockMethodDownloadDirTarget = "./qik";
export const mockLogDownloadDir = `Downloading files from SFTP dir: '${mockMethodDownloadDirSource}' to dir: '${mockMethodDownloadDirTarget}'`;
export const mockClientDownloadDirResponse = "mockClientDownloadDirResponse";

export const mockMethodDownloadFileSource = "./test-file.txt";
export const mockMethodDownloadFileTarget = "./qik/test-file.txt";
export const mockLogDownloadFile = `Downloading '${mockMethodDownloadFileSource}' to '${mockMethodDownloadFileTarget}'`;
