const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1733847821343 {
    name = 'Core1733847821343'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "space_member" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "spaceId" character varying NOT NULL, "communityId" character varying NOT NULL, "isModerator" boolean NOT NULL, "isBanned" boolean NOT NULL, "invitedBy" character varying, "invitedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_11ebe76f334b83775730cb38f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_MEMBER_SPACE_ID" ON "space_member" ("spaceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_MEMBER_USER_ID" ON "space_member" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_MEMBER_COMMUNITY_ID" ON "space_member" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_COMMUNITY_ID" ON "space" ("communityId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_COMMUNITY_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_MEMBER_COMMUNITY_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_MEMBER_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_MEMBER_SPACE_ID"`);
        await queryRunner.query(`DROP TABLE "space_member"`);
    }
}
