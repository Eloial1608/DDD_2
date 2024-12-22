const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734799540379 {
    name = 'Core1734799540379'

    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_PLAN_USER_ID"`);
        await queryRunner.query(`ALTER TABLE "user_plan" DROP COLUMN "userId"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_plan" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_USER_PLAN_USER_ID" ON "user_plan" ("userId") `);
    }
}
