const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734784783514 {
    name = 'Core1734784783514'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" ADD "allowsPayments" boolean NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "allowsPayments"`);
    }
}
