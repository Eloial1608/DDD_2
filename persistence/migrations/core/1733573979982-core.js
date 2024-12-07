const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1733573979982 {
    name = 'Core1733573979982'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "communityId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "about" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "planId" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "planId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "about" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "communityId"`);
    }
}
