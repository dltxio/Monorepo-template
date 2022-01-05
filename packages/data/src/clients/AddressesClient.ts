import { Pool } from "pg";

import ClientBase from "./EntityClientBase";

export default class AddressesClient
  extends ClientBase<data.Address, data.NewAddress>
  implements data.IAddressesClient {
  public constructor(pool: Pool, logger: core.backend.Logger) {
    super("addresses", pool, logger);
  }
}
