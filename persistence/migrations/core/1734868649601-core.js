const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1734868649601 {
    name = 'Core1734868649601'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "calendar" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "dateAt" TIMESTAMP NOT NULL, "userIds" text NOT NULL, "entityType" character varying, "entityId" character varying, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2492fb846a48ea16d53864e3267" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_CALENDAR_COMMUNITY_ID" ON "calendar" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_CALENDAR_USER_IDS" ON "calendar" ("userIds") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_CALENDAR_USER_IDS"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_CALENDAR_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "calendar"`);
    }
}
