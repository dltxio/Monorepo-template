type Config = {
  env: "development" | "staging" | "production";
  port: number;
  jwt: AuthService.Config;
  bcryptSaltRounds: number;
  postgres: Omit<data.Config, "env">;
  appURL: string;
  mailJet: {
    apiKey: string;
    apiSecret: string;
    fromEmailAddress: string;
  };
};
