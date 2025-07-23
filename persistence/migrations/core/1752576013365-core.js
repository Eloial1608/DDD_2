const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1752576013365 {
    name = 'Core1752576013365'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" ADD "spaceOrderedIds" character varying NOT NULL DEFAULT '[]'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "spaceOrderedIds"`);
    }
}
