const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Threads1740383960819 {
    name = 'Threads1740383960819'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "space_member" ("id" character varying NOT NULL, "spaceId" character varying NOT NULL, "userId" character varying NOT NULL, "isModerator" boolean NOT NULL, CONSTRAINT "PK_11ebe76f334b83775730cb38f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_MEMBER_SPACE_ID" ON "space_member" ("spaceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_MEMBER_USER_ID" ON "space_member" ("userId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_MEMBER_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_MEMBER_SPACE_ID"`);
        await queryRunner.query(`DROP TABLE "space_member"`);
    }
}
