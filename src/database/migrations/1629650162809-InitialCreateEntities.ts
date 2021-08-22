import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InitialCreateEntities1629650162809
  implements MigrationInterface {
  name = 'InitialCreateEntities1629650162809';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tasks_management\`.\`users\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`role\` enum ('MANAGER', 'TECHNICIAN') NOT NULL DEFAULT 'TECHNICIAN', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tasks_management\`.\`tasks\` (\`id\` char(36) NOT NULL, \`summary\` varchar(255) NOT NULL, \`performed_date\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`owner_user_id\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tasks_management\`.\`tasks\` ADD CONSTRAINT \`FK_055dfbbfb9d8203956e24df5bda\` FOREIGN KEY (\`owner_user_id\`) REFERENCES \`tasks_management\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tasks_management\`.\`tasks\` DROP FOREIGN KEY \`FK_055dfbbfb9d8203956e24df5bda\``,
    );
    await queryRunner.query(`DROP TABLE \`tasks_management\`.\`tasks\``);
    await queryRunner.query(`DROP TABLE \`tasks_management\`.\`users\``);
  }
}
