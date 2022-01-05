import * as dotenv from "dotenv";

dotenv.config();

const getConfig = () => {
  const config: Config = {
    appURL: getEnvVariable("APP_URL"),
    mailJet: {
      apiKey: getEnvVariable("MAILJET_API_KEY"),
      apiSecret: getEnvVariable("MAILJET_SECRET_KEY"),
      fromEmailAddress: getEnvVariable("FROM_EMAIL_ADDRESS")
    },
    env: getEnvVariable("NODE_ENV") as Config["env"],
    port: getEnvVariable("PORT"),
    jwt: {
      secret: getEnvVariable("JWT_SECRET"),
      validForInHours: 8
    },
    bcryptSaltRounds: 10,

    postgres: {
      host: getEnvVariable("POSTGRES_HOST"),
      database: getEnvVariable("POSTGRES_DB_NAME"),
      port: 5432,
      user: getEnvVariable("POSTGRES_USER"),
      password: getEnvVariable("POSTGRES_PASSWORD")
    }
  };

  return config;
};

export default getConfig;

const getEnvVariable = (property: string, canBeUndefined = false): any => {
  const value = process.env[property];

  if (!canBeUndefined && !value) {
    throw new Error(`${property} environment variable is not set`);
  }

  return value;
};
