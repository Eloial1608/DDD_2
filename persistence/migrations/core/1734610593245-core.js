const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734610593245 {
    name = 'Core1734610593245'

    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX "IDX_USER_PLAN_PLAN_ID" ON "user_plan" ("planId") `);
        await queryRunner.query(`CREATE INDEX "IDX_USER_PLAN_USER_ID" ON "user_plan" ("userId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_PLAN_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_PLAN_PLAN_ID"`);
    }
}
