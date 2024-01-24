import pino, { Logger as PinoLogger } from "pino";
import pinoPretty from "pino-pretty";
import config from "@libs/common/config";
import {
  DEFAULT_LEVEL,
  DEFAULT_MESSAGE_FORMAT,
  IGNORED_PRETTY_KEYS,
} from "@libs/logger/constants";

export class Logger {
  private readonly logger: PinoLogger;
  private readonly context: string;
  private static instance: Logger;

  static create(functionName: string): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(functionName);
    }
    return Logger.instance;
  }
  private constructor(functionName: string) {
    this.context = functionName;
    this.logger = this.toInit();
  }

  log(trace: any, message?: string): void {
    this.logger.info(trace, message);
  }

  warn(trace: any, message?: string): void {
    this.logger.warn(trace, message);
  }

  debug(trace: any, message?: string): void {
    this.logger.debug(trace, message);
  }

  error(trace: any, message?: string): void {
    this.logger.error(trace, message);
  }

  private toInit(): PinoLogger<{
    level: string;
    name: string;
    timestamp: () => string;
  }> {
    const pretty: pinoPretty.PrettyStream = pinoPretty({
      colorize: true,
      ignore: IGNORED_PRETTY_KEYS,
      messageFormat: DEFAULT_MESSAGE_FORMAT,
    });
    return pino(
      {
        level: config.logger.level || DEFAULT_LEVEL,
        timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
        name: this.context,
      },
      pretty,
    );
  }
}
