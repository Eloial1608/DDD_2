const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Events1743591582470 {
    name = 'Events1743591582470'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "mainId" character varying NOT NULL, "communityId" character varying NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "pictureUrl" character varying, "bannerUrl" character varying, "isAdmin" boolean NOT NULL, "isOwner" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_USER_COMMUNITY_ID" ON "user" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_USER_MAIN_ID" ON "user" ("mainId") `);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" character varying NOT NULL, "eventId" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying, "isOnline" boolean NOT NULL, "isOnSite" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "priceValue" integer NOT NULL, "priceCurrency" character varying NOT NULL, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_TICKET_EVENT_ID" ON "ticket" ("eventId") `);
        await queryRunner.query(`CREATE TABLE "space_member" ("id" character varying NOT NULL, "spaceId" character varying NOT NULL, "userId" character varying NOT NULL, "isModerator" boolean NOT NULL, CONSTRAINT "PK_11ebe76f334b83775730cb38f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_MEMBER_SPACE_ID" ON "space_member" ("spaceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_MEMBER_USER_ID" ON "space_member" ("userId") `);
        await queryRunner.query(`CREATE TABLE "space" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "configuration" character varying NOT NULL, "accessibility" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_094f5ec727fe052956a11623640" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_SPACE_COMMUNITY_ID" ON "space" ("communityId") `);
        await queryRunner.query(`CREATE TABLE "events_user" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "eventId" character varying NOT NULL, "ticketId" character varying NOT NULL, "validatedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_09f256fb7f9a05f0ed9927f406b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_EVENTS_USER_USER_ID" ON "events_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_EVENTS_USER_EVENTS_ID" ON "events_user" ("eventId") `);
        await queryRunner.query(`CREATE TABLE "events" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "spaceId" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying, "userId" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "isPrivate" boolean NOT NULL, "accessibility" character varying NOT NULL, "bannerUrl" character varying, "isPaid" boolean NOT NULL, "type" character varying NOT NULL, "maxOnlineMembers" integer, "maxOnSiteMembers" integer NOT NULL, "totalOnlineMembers" integer NOT NULL, "totalOnSiteMembers" integer NOT NULL, "location" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "authorId" character varying NOT NULL, "authorMainid" character varying NOT NULL, "authorName" character varying NOT NULL, "authorUsername" character varying NOT NULL, "authorPictureurl" character varying, "authorBannerurl" character varying, "dataUrl" character varying, "dataPlatform" character varying, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_EVENTS_USER_ID" ON "events" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_EVENTS_COMMUNITY_ID" ON "events" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_EVENTS_SPACE_ID" ON "events" ("spaceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_EVENTS_START_DATE" ON "events" ("startDate") `);
        await queryRunner.query(`CREATE TABLE "community" ("id" character varying NOT NULL, "isPrivate" boolean NOT NULL, CONSTRAINT "PK_cae794115a383328e8923de4193" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "community"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_EVENTS_START_DATE"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_EVENTS_SPACE_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_EVENTS_COMMUNITY_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_EVENTS_USER_ID"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_EVENTS_USER_EVENTS_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_EVENTS_USER_USER_ID"`);
        await queryRunner.query(`DROP TABLE "events_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "space"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_MEMBER_USER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_SPACE_MEMBER_SPACE_ID"`);
        await queryRunner.query(`DROP TABLE "space_member"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_TICKET_EVENT_ID"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_MAIN_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
