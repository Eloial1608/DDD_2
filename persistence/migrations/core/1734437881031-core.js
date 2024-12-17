const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734437881031 {
    name = 'Core1734437881031'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "mainId" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mainId"`);
    }
}
