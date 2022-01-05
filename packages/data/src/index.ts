import { Pool, PoolClient } from "pg";

import AddressesClient from "./clients/AddressesClient";
import DBTransactionsClient from "./clients/DBTransactionsClient";
import UsersClient from "./clients/UsersClient";

export const getDBConnection = async (
  config: data.Config,
  logger: core.backend.Logger
): Promise<Pool> =>
  new Promise<Pool>((resolve): void => {
    logger.debug("Establishing DB connection");
    const pool = new Pool({
      user: config.user,
      host: config.host,
      database: config.database,
      password: config.password,
      port: config.port
    });

    pool.connect().then(
      (conn: PoolClient): void => {
        conn.release();
        logger.debug("Successfully connected to DB");
        resolve(pool);
      },
      (error: Error): void => {
        logger.error("Error establishing DB connection. Retrying...", error);
        setTimeout(() => {
          resolve(getDBConnection(config, logger));
        }, 5000);
      }
    );
  });

export const getDBClients = (
  pool: Pool,
  logger: core.backend.Logger
): data.DataClients => ({
  users: new UsersClient(pool, logger),
  addresses: new AddressesClient(pool, logger),
  dbTransactions: new DBTransactionsClient(pool, logger)
});
