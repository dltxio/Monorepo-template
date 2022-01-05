declare namespace data {
  type Config = {
    env: "development" | "staging" | "production";
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
}
