const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Media1741603817731 {
    name = 'Media1741603817731'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "content" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "mediaId" character varying NOT NULL, "type" character varying NOT NULL, "url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_CONTENT_COMMUNITY_ID" ON "content" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_CONTENT_MEDIA_ID" ON "content" ("mediaId") `);
        await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "contentIds"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "media" ADD "contentIds" text NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_CONTENT_MEDIA_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_CONTENT_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "content"`);
    }
}
