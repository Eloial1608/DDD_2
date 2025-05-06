const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Threads1746027357148 {
    name = 'Threads1746027357148'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "thread" ADD "mainThreadId" character varying`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "thread" DROP COLUMN "mainThreadId"`);
    }
}
