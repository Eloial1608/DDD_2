const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1732966007996 {
    name = 'Core1732966007996'

    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_USER_COMMUNITYID" ON "auth_user" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_USER_METHOD" ON "auth_user" ("method") `);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_USER_SECRET" ON "auth_user" ("secret") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_USER_SECRET"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_USER_METHOD"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_USER_COMMUNITYID"`);
    }
}
