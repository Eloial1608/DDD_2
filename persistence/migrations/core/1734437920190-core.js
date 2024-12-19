const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734437920190 {
    name = 'Core1734437920190'

    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX "IDX_USER_MAIN_ID" ON "user" ("mainId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_MAIN_ID"`);
    }
}
