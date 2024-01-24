import sftp from "ssh2-sftp-client";

export declare type Config = {
  connectionOptions: sftp.ConnectOptions;
  clientName: string;
};
