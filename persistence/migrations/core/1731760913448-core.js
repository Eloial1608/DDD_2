const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1731760913448 {
    name = 'Core1731760913448'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "community" ("id" character varying NOT NULL, "name" character varying NOT NULL, "suffix" character varying NOT NULL, "domain" character varying, "membersCount" integer NOT NULL DEFAULT '0', "firstPaymentDone" boolean NOT NULL DEFAULT false, "spacesCount" integer NOT NULL DEFAULT '0', "hasPayment" boolean NOT NULL DEFAULT false, "allowedFeatures" jsonb NOT NULL, "hasRegisterForm" boolean NOT NULL, "registerFormId" character varying, "planId" character varying NOT NULL, "allowedUsers" integer NOT NULL DEFAULT '1', "color" character varying NOT NULL, "isPrivate" boolean NOT NULL DEFAULT false, "isRegisterOpen" boolean NOT NULL DEFAULT true, "homeSpaceId" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cae794115a383328e8923de4193" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_COMMUNITY_DOMAIN" ON "community" ("domain") `);
        await queryRunner.query(`CREATE INDEX "IDX_COMMUNITY_SUFFIX" ON "community" ("suffix") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_COMMUNITY_SUFFIX"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_COMMUNITY_DOMAIN"`);
        await queryRunner.query(`DROP TABLE "community"`);
    }
}
