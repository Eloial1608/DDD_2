const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734797715724 {
    name = 'Core1734797715724'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "plan" ADD "stripeId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "plan" ADD "isPrivate" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "plan" ADD "allowedSubcommunities" integer NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "allowedSubcommunities"`);
        await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "isPrivate"`);
        await queryRunner.query(`ALTER TABLE "plan" DROP COLUMN "stripeId"`);
    }
}
