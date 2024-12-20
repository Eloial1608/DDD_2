const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734690980424 {
    name = 'Core1734690980424'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "stripe_product" ADD "name" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "stripe_product" DROP COLUMN "name"`);
    }
}
