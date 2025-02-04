const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1738497544513 {
    name = 'Core1738497544513'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "form" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "name" character varying NOT NULL, "isActive" boolean NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8f72b95aa2f8ba82cf95dc7579e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_FORM_COMMUNITY_ID" ON "form" ("communityId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_FORM_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "form"`);
    }
}
