const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Projects1750848822219 {
    name = 'Projects1750848822219'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "mainId" character varying NOT NULL, "communityId" character varying NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "pictureUrl" character varying, "bannerUrl" character varying, "isAdmin" boolean NOT NULL, "isOwner" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_USER_COMMUNITY_ID" ON "user" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_USER_MAIN_ID" ON "user" ("mainId") `);
        await queryRunner.query(`CREATE TABLE "space_member" ("id" character varying NOT NULL, "spaceId" character varying NOT NULL, "userId" character varying NOT NULL, "isModerator" boolean NOT NULL, CONSTRAINT "PK_11ebe76f334b83775730cb38f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_MEMBER_SPACE_ID" ON "space_member" ("spaceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_MEMBER_USER_ID" ON "space_member" ("userId") `);
        await queryRunner.query(`CREATE TABLE "space" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "configuration" character varying NOT NULL, "accessibility" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_094f5ec727fe052956a11623640" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_COMMUNITY_ID" ON "space" ("communityId") `);
        await queryRunner.query(`CREATE TABLE "community" ("id" character varying NOT NULL, "isPrivate" boolean NOT NULL, CONSTRAINT "PK_cae794115a383328e8923de4193" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "community"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "space"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_MEMBER_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_MEMBER_SPACE_ID"`);
        await queryRunner.query(`DROP TABLE "space_member"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_MAIN_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
