const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Posts1735819920451 {
    name = 'Posts1735819920451'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "post" ADD "spaceId" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_POST_SPACE_ID" ON "post" ("spaceId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_POST_SPACE_ID"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "spaceId"`);
    }
}
