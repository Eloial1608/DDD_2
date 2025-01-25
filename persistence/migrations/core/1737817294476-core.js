const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1737817294476 {
    name = 'Core1737817294476'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "plan_for_users" DROP COLUMN "priceValue"`);
        await queryRunner.query(`ALTER TABLE "plan_for_users" ADD "priceValue" bigint NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "plan_for_users" DROP COLUMN "priceValue"`);
        await queryRunner.query(`ALTER TABLE "plan_for_users" ADD "priceValue" integer NOT NULL`);
    }
}
