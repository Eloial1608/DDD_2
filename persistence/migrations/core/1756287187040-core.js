const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Core1756287187040 {
  name = 'Core1756287187040'

  async up (queryRunner) {
    await queryRunner.query('CREATE TABLE "theme" ("id" character varying NOT NULL, "communityId" character varying, "name" character varying NOT NULL, "previewPicUrl" character varying NOT NULL, "colors" character varying NOT NULL, "typography" character varying NOT NULL, "components" character varying, "layoutHeader" character varying NOT NULL, "layoutNav" character varying NOT NULL, "layoutContent" character varying NOT NULL, "layoutFooter" character varying NOT NULL, CONSTRAINT "PK_c1934d0b4403bf10c1ab0c18166" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE INDEX "IDX_THEME_COMMUNITY_ID" ON "theme" ("communityId") ')
  }

  async down (queryRunner) {
    await queryRunner.query('DROP INDEX "public"."IDX_THEME_COMMUNITY_ID"')
    await queryRunner.query('DROP TABLE "theme"')
  }
}
