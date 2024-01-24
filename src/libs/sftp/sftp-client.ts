import sftp from "ssh2-sftp-client";
import Ssh2SftpClient from "ssh2-sftp-client";
import { Logger } from "@libs/logger/logger";
import { Config } from "@libs/sftp/interfaces/sftp-client-config.interface";
import { SftpClientEventType } from "@functions/sabs-sftp-daily-files/common/enums";
import { stringifyReplacer } from "@libs/common/json";
import { ConnectOptionsSensitiveFields } from "@libs/sftp/enums";

export class SftpClient {
  private connectionOptions: sftp.ConnectOptions;
  private logger: Logger;
  private client: sftp;
  private static instance: SftpClient;

  //TODO: hide sensitive data until masking service is implemented
  private hideSensitiveConfig = (key: string, value: any) =>
    stringifyReplacer(key, value, [
      ConnectOptionsSensitiveFields.Username,
      ConnectOptionsSensitiveFields.Password,
    ]);

  private constructor(config: Config) {
    this.connectionOptions = config.connectionOptions;
    this.logger = Logger.create("SftpClient");
    this.logger.log("Init SFTP client");
    this.logger.debug(
      `SFTP client config: ${JSON.stringify(config, this.hideSensitiveConfig)}`,
    );

    this.client = new Ssh2SftpClient(config.clientName);
  }

  static create(config: Config): SftpClient {
    if (!SftpClient.instance) {
      SftpClient.instance = new SftpClient(config);
    }
    return SftpClient.instance;
  }

  async getCurrentWorkingDirectory(): Promise<void> {
    try {
      await this.client.connect(this.connectionOptions);
      const workingDirectory = await this.client.cwd();
      this.logger.log(`Working directory ${workingDirectory}`);
    } finally {
      this.client.end();
    }
  }

  async exists(path: string): Promise<void> {
    this.logger.log("Check if exist file or dir in SFTP");
    try {
      await this.client.connect(this.connectionOptions);
      const listResult = await this.client.exists(path);
      this.logger.log(`${path}: ${listResult}`);
    } finally {
      this.client.end();
    }
  }

  async listFilesInDir(path: string): Promise<void> {
    this.logger.log(`Listing files from SFTP dir: '${path}'`);
    try {
      await this.client.connect(this.connectionOptions);
      const listResult = await this.client.list(path);
      this.logger.log(listResult, `List result`);
    } finally {
      this.client.end();
    }
  }

  async downloadDir(source: string, target: string): Promise<string> {
    this.logger.log(
      `Downloading files from SFTP dir: '${source}' to dir: '${target}'`,
    );
    try {
      await this.client.connect(this.connectionOptions);

      this.client.on(SftpClientEventType.Download, (info) => {
        this.logger.log(info, `Listener: Downloading...`);
      });

      const result = await this.client.downloadDir(source, target);

      return result;
    } finally {
      this.client.end();
    }
  }

  async downloadFile(
    source: string,
    target: string,
  ): Promise<string | NodeJS.WritableStream | Buffer> {
    this.logger.log(`Downloading '${source}' to '${target}'`);
    try {
      await this.client.connect(this.connectionOptions);

      const result = await this.client.get(source, target);

      return result;
    } finally {
      this.client.end();
    }
  }
}
