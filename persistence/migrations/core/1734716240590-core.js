const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Core1734716240590 {
  name = 'Core1734716240590'

  async up (queryRunner) {
    await queryRunner.query('CREATE TABLE "plan_for_users" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "communityId" character varying NOT NULL, "renovationInterval" integer NOT NULL, "renovationType" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "priceValue" integer NOT NULL, "priceCurrency" character varying NOT NULL, CONSTRAINT "PK_dbbf6e2f817ce3aea00fb5c5591" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE INDEX "IDX_PLAN_FOR_USER_COMMUNITY_ID" ON "plan_for_users" ("communityId") ')
  }

  async down (queryRunner) {
    await queryRunner.query('DROP INDEX "public"."IDX_PLAN_FOR_USER_COMMUNITY_ID"')
    await queryRunner.query('DROP TABLE "plan_for_users"')
  }
}
