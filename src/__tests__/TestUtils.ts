import { Connection, EntityMetadata, getConnection } from 'typeorm';
import createConnection from '../database';
import ConstUtils from './ConstUtils';

export default class TestUtils {
  connection: Connection;

  async getDatabaseTestConnection(): Promise<Connection> {
    if (!this.isTestConnectionCreated()) {
      this.connection = await createConnection('test-connection');
    }
    return this.connection;
  }

  async cleanUpTestDatabase(): Promise<void> {
    const dbTestConnection: Connection = await this.getDatabaseTestConnection();

    await dbTestConnection.query('SET FOREIGN_KEY_CHECKS = 0');

    dbTestConnection.entityMetadatas.forEach(
      async (entityMetadata: EntityMetadata) => {
        await dbTestConnection.query(
          `${ConstUtils.DELETE_FROM_STATEMENT}${entityMetadata.tableName}`,
        );
      },
    );

    await dbTestConnection.query('SET FOREIGN_KEY_CHECKS = 1');
  }

  async closeDatabaseConnections(): Promise<void> {
    const mainConnection = getConnection();
    (await this.getDatabaseTestConnection()).close();
    await mainConnection.close();
  }

  async clearDatabaseAndRunMigrations(): Promise<void> {
    const dbTestConnection: Connection = await this.getDatabaseTestConnection();

    await dbTestConnection.query('SET FOREIGN_KEY_CHECKS = 0');

    dbTestConnection.entityMetadatas.forEach(
      async (entityMetadata: EntityMetadata) => {
        await dbTestConnection.query(
          `${ConstUtils.DROP_TABLE_IF_EXISTS_STATEMENT}${entityMetadata.tableName}`,
        );
      },
    );

    await dbTestConnection.query('DROP TABLE IF EXISTS migrations');
    await dbTestConnection.query('SET FOREIGN_KEY_CHECKS = 1');

    await dbTestConnection.runMigrations();
  }

  private isTestConnectionCreated(): boolean {
    return this.connection !== undefined;
  }

  public generateString(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
