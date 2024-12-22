const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734798212308 {
    name = 'Core1734798212308'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community_plan" ADD "stripeId" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community_plan" DROP COLUMN "stripeId"`);
    }
}
