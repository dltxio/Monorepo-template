import * as uuid from "uuid";

export default class Logger implements core.backend.Logger {
  constructor(
    private environment: "test" | "development" | "staging" | "production",
    private userId?: string,
    private incidentId?: string
  ) {
    this.incidentId = incidentId || uuid.v4().replace(/-/g, "");
  }

  public getUserId(): string | undefined {
    return this.userId;
  }

  public getIncidentId(): string {
    return this.incidentId!;
  }

  public setUserId = (userId: string): void => {
    this.userId = userId;
  };

  public setIncidentId = (incidentId: string): void => {
    this.incidentId = incidentId;
  };

  public setEnvironment = (
    enviroment: "test" | "development" | "staging" | "production"
  ) => (this.environment = enviroment);

  public silly = (message: string, data?: any): void => {
    this.log("silly", message, null, data);
  };

  public debug = (message: string, data?: any): void => {
    this.log("debug", message, null, data);
  };

  public info = (message: string, data?: any): void => {
    this.log("info", message, null, data);
  };

  public warn = (message: string, error?: any, data?: any): void => {
    this.log("warn", message, error, data);
  };

  public error = (message: string, error: any, data?: any): void => {
    this.log("error", message, error, data);
  };

  private readonly log = (
    level: string,
    message: string,
    error?: any,
    data?: any
  ): void => {
    if (this.environment === "test") {
    } else if (this.environment === "development") {
      this.logDev(level, message, error, data);
    } else {
      this.logProd(level, message, error, data);
    }
  };

  private readonly getLogMessageDev = (
    message: string,
    includeNewLine: boolean
  ): string =>
    `${new Date().toISOString()} - ${message}${
      includeNewLine ? "\r\n  ---" : ""
    }`;

  private readonly logDev = (
    level: string,
    message: string,
    error?: any,
    data?: any
  ): void => {
    console.log(
      level,
      this.getLogMessageDev(message, Boolean(data) || Boolean(error)),
      data ? data : ""
    );

    if (error) {
      console.log(level, error);
    }
  };

  private readonly logProd = (
    level: string,
    message: string,
    error?: any,
    data?: any
  ): void => {
    // Tslint:disable-next-line:no-console
    console.log(
      JSON.stringify({
        level,
        message,
        incidentId: this.incidentId,
        timestamp: new Date().toISOString(),
        userId: this.userId,
        error: error && {
          name: error.name,
          message: error.message,
          stack: error.stack,
          serialized: JSON.stringify(error)
        },
        data
      })
    );
  };
}
