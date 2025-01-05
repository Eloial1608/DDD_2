const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Media1736077401008 {
    name = 'Media1736077401008'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "mainId" character varying NOT NULL, "communityId" character varying NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "pictureUrl" character varying, "bannerUrl" character varying, "isAdmin" boolean NOT NULL, "isOwner" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_USER_COMMUNITY_ID" ON "user" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_USER_MAIN_ID" ON "user" ("mainId") `);
        await queryRunner.query(`CREATE TABLE "space_member" ("id" character varying NOT NULL, "spaceId" character varying NOT NULL, "userId" character varying NOT NULL, "isModerator" boolean NOT NULL, CONSTRAINT "PK_11ebe76f334b83775730cb38f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_MEMBER_SPACE_ID" ON "space_member" ("spaceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_MEMBER_USER_ID" ON "space_member" ("userId") `);
        await queryRunner.query(`CREATE TABLE "space" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "configuration" character varying NOT NULL, "accessibility" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_094f5ec727fe052956a11623640" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_COMMUNITY_ID" ON "space" ("communityId") `);
        await queryRunner.query(`CREATE TABLE "media_user" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "mediaId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c0dd13ee4ffc96e61bdc1fb592d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_MEDIA_USER_USER_ID" ON "media_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_MEDIA_USER_MEDIA_ID" ON "media_user" ("mediaId") `);
        await queryRunner.query(`CREATE TABLE "media" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "userId" character varying NOT NULL, "spaceId" character varying NOT NULL, "title" character varying NOT NULL, "contentIds" text NOT NULL, "bannerUrl" character varying, "isPaid" boolean NOT NULL, "totalLikes" integer NOT NULL, "totalComments" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "priceValue" integer, "priceCurrency" character varying, "authorId" character varying NOT NULL, "authorMainid" character varying NOT NULL, "authorName" character varying NOT NULL, "authorUsername" character varying NOT NULL, "authorPictureurl" character varying, "authorBannerurl" character varying, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_MEDIA_COMMUNITY_ID" ON "media" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_MEDIA_USER_ID" ON "media" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_MEDIA_SPACE_ID" ON "media" ("spaceId") `);
        await queryRunner.query(`CREATE TABLE "like" ("id" character varying NOT NULL, "postId" character varying NOT NULL, "userId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_LIKE_USER_ID" ON "like" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_LIKE_POST_ID" ON "like" ("postId") `);
        await queryRunner.query(`CREATE TABLE "community" ("id" character varying NOT NULL, "isPrivate" boolean NOT NULL, CONSTRAINT "PK_cae794115a383328e8923de4193" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" character varying NOT NULL, "mediaId" character varying NOT NULL, "userId" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "authorId" character varying NOT NULL, "authorMainid" character varying NOT NULL, "authorName" character varying NOT NULL, "authorUsername" character varying NOT NULL, "authorPictureurl" character varying, "authorBannerurl" character varying, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_COMMENT_MEDIA_ID" ON "comment" ("mediaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_COMMENT_USER_ID" ON "comment" ("userId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_COMMENT_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_COMMENT_MEDIA_ID"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "community"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_LIKE_POST_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_LIKE_USER_ID"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_MEDIA_SPACE_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_MEDIA_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_MEDIA_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "media"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_MEDIA_USER_MEDIA_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_MEDIA_USER_USER_ID"`);
        await queryRunner.query(`DROP TABLE "media_user"`);
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
