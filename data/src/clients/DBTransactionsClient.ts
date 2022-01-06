import MysqlClientBase, { PGTransaction } from "./PGClientBase";

export default class PGDBTransactionClient extends MysqlClientBase
  implements data.IDBTransactionClient {
  public async create<T>(
    action: (dbTransaction: PGTransaction) => Promise<T>
  ): Promise<T> {
    const dbTransaction = await this.beginTransaction();
    try {
      const response = await action(dbTransaction);
      await dbTransaction.end();
      return response;
    } catch (error) {
      await dbTransaction.rollback();
      throw error;
    }
  }
}
