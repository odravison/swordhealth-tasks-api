import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTaskEntity1629759496881
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'summary',
            type: 'text',
          },
          {
            name: 'performed_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'owner_user_id',
            isNullable: false,
            type: 'varchar(36)',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        columnNames: ['owner_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tasks');
    if (table !== undefined) {
      const foreignKey = table.foreignKeys.find(
        fk => fk.columnNames.indexOf('owner_user_id') !== -1,
      );
      if (foreignKey !== undefined) {
        await queryRunner.dropForeignKey('tasks', foreignKey);
      }
    }
    await queryRunner.dropTable('tasks');
  }
}
