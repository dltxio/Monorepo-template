import express, { Request } from "express";

import Logger from "../../../core-backend/src/logger";
import { getAuthHeader } from "../utils/auth";
import { notAuthorized } from "../utils/errors";

export type HandlerPayload<
  User,
  Parameters_ = Record<string, unknown>,
  QueryString = Record<string, unknown>,
  Body = Record<string, unknown>
> = {
  user: User;
  params: Parameters_;
  queryString: QueryString;
  headers: Request["headers"];
  body: Body;
  config: Config;
  services: Services;
  logger: core.backend.Logger;
};

type AuthRequestHandlerPayload<Parameters_, QueryString, Body> = HandlerPayload<
  data.User,
  Parameters_,
  QueryString,
  Body
>;

type UnAuthRequestHandlerPayload<
  Parameters_,
  QueryString,
  Body
> = HandlerPayload<data.User | undefined, Parameters_, QueryString, Body>;

type RequestHandler<Payload, Result> = (
  payload: Payload
) => Promise<Result | api.ErrorResponse>;

export type AuthRequestHandler<
  Parameters_,
  QueryString,
  Body,
  Result
> = RequestHandler<
  AuthRequestHandlerPayload<Parameters_, QueryString, Body>,
  Result
>;

export type UnAuthRequestHandler<
  Parameters_,
  QueryString,
  Body,
  Result
> = RequestHandler<
  UnAuthRequestHandlerPayload<Parameters_, QueryString, Body>,
  Result
>;

export const requestHandlerWrapper = (
  fn:
    | AuthRequestHandler<any, any, any, any>
    | UnAuthRequestHandler<any, any, any, any>,
  config: Config,
  getServices: (logger: core.backend.Logger) => Services,
  requiresAuth: boolean,
  requiresAdmin: boolean
) => async (request: express.Request, response: express.Response) => {
  const logger = new Logger(config.env);
  const start = Date.now();
  logger.debug(`----> ${request.method} ${request.url}`, {
    method: request.method,
    url: request.url
  });

  let responseStatus: number;
  let responseBody: Record<string, unknown>;

  try {
    const services = getServices(logger);

    let user: data.User | undefined;

    const authToken = getAuthHeader(request);

    if (authToken) {
      const decodedToken = await services.auth.decodeJWT(authToken);

      if (decodedToken) {
        user = await services.data.users.findOne({
          userId: decodedToken.userId
        });
        if (user) {
          logger.setUserId(user.userId);
        }
      }
    }

    if (!user && (requiresAuth || requiresAdmin)) {
      responseStatus = 401;
      responseBody = notAuthorized();
    } else if (user && requiresAdmin && !user.admin) {
      responseStatus = 401;
      responseBody = notAuthorized();
    } else {
      const payload: HandlerPayload<data.User | undefined> = {
        user,
        params: request.params,
        queryString: request.query,
        headers: request.headers,
        body: request.body || {},
        config,
        services,
        logger
      };

      const result = await fn(payload as any);
      responseStatus = result.statusCode || 200;
      responseBody = result.statusCode
        ? { ...result, incidentId: logger.getIncidentId() }
        : result;
    }
  } catch (error) {
    logger.error("Failed to process request", error);
    responseStatus = 500;
    responseBody = {
      status: 500,
      message: "Internal Error",
      incidentId: logger.getIncidentId()
    };
  }

  const end = Date.now();
  logger.debug(
    `<---- ${request.method} ${request.url} ${responseStatus} ${end - start}ms`,
    {
      method: request.method,
      url: request.url,
      duration: end - start
    }
  );
  response.status(responseStatus);
  response.send(responseBody);
};

const authWrapper = (
  fn: AuthRequestHandler<any, any, any, any>,
  config: Config,
  services: (logger: core.backend.Logger) => Services
) => requestHandlerWrapper(fn, config, services, true, false);

const unAuthWrapper = (
  fn: UnAuthRequestHandler<any, any, any, any>,
  config: Config,
  services: (logger: core.backend.Logger) => Services
) => requestHandlerWrapper(fn, config, services, false, false);

const adminAuthWrapper = (
  fn: AuthRequestHandler<any, any, any, any>,
  config: Config,
  services: (logger: core.backend.Logger) => Services
) => requestHandlerWrapper(fn, config, services, true, true);

export default (
  config: Config,
  services: (logger: core.backend.Logger) => Services
) => ({
  authWrapper: (fn: AuthRequestHandler<any, any, any, any>) =>
    authWrapper(fn, config, services),
  unAuthWrapper: (fn: UnAuthRequestHandler<any, any, any, any>) =>
    unAuthWrapper(fn, config, services),
  adminAuthWrapper: (fn: AuthRequestHandler<any, any, any, any>) =>
    adminAuthWrapper(fn, config, services)
});
