const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734777088390 {
    name = 'Core1734777088390'

    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX "IDX_USER_PLAN_USER_ID" ON "user_plan" ("userId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_PLAN_USER_ID"`);
    }
}
