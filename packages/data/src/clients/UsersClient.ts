import { Pool } from "pg";

import ClientBase from "./EntityClientBase";

export default class UsersClient extends ClientBase<data.User, data.NewUser>
  implements data.IUsersClient {
  public constructor(pool: Pool, logger: core.backend.Logger) {
    super("users", pool, logger);
  }
}
