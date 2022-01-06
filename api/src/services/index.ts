import { getDBClients } from "../../../data/src";
import AuthService from "./auth-service";
import EmailService from "./email-service";

const getServices = (config: Config, dbConnection: any) => (
  logger: core.backend.Logger
): Services => {
  const email = new EmailService(config, logger);
  return {
    email,
    auth: new AuthService(config.jwt),
    data: getDBClients(dbConnection, logger)
  };
};

export default getServices;
