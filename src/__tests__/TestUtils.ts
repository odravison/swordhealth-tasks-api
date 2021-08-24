import { Connection } from 'typeorm';
import createConnection from '../database';
import ConstUtils from './ConstUtils';

export default class TestUtils {
  public static connection: Connection;

  static async getDatabaseTestConnection(): Promise<Connection> {
    if (!TestUtils.isTestConnectionCreated()) {
      TestUtils.connection = await createConnection();
    }
    return TestUtils.connection;
  }

  static async cleanUpTestDatabase(): Promise<void> {
    const dbTestConnection: Connection =
      await TestUtils.getDatabaseTestConnection();

    await dbTestConnection.query('SET FOREIGN_KEY_CHECKS = 0');

    await dbTestConnection.query(`${ConstUtils.DELETE_FROM_STATEMENT}users`);
    await dbTestConnection.query(`${ConstUtils.DELETE_FROM_STATEMENT}tasks`);

    await dbTestConnection.query('SET FOREIGN_KEY_CHECKS = 1');
  }

  static async closeDatabaseConnections(): Promise<void> {
    const connection = await this.getDatabaseTestConnection();
    connection.close();
  }

  static async clearDatabaseAndRunMigrations(): Promise<void> {
    const dbTestConnection: Connection = await this.getDatabaseTestConnection();

    await dbTestConnection.query('SET FOREIGN_KEY_CHECKS = 0');

    await dbTestConnection.query(
      `${ConstUtils.DROP_TABLE_IF_EXISTS_STATEMENT}users`,
    );
    await dbTestConnection.query(
      `${ConstUtils.DROP_TABLE_IF_EXISTS_STATEMENT}tasks`,
    );

    await dbTestConnection.query('DROP TABLE IF EXISTS migrations');
    await dbTestConnection.query('SET FOREIGN_KEY_CHECKS = 1');

    await dbTestConnection.runMigrations();
  }

  private static isTestConnectionCreated(): boolean {
    return TestUtils.connection !== undefined;
  }

  public static generateString(length: number): string {
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
