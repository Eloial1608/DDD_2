const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1733484852530 {
    name = 'Core1733484852530'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "about" character varying NOT NULL, "email" character varying NOT NULL, "hasPayed" boolean NOT NULL, "planId" character varying NOT NULL, "hasCompletedRegister" boolean NOT NULL, "registerData" jsonb NOT NULL, "isBanned" boolean NOT NULL, "totalPosts" integer NOT NULL, "totalMedia" integer NOT NULL, "totalThreads" integer NOT NULL, "totalThreadResponses" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_USER_USERNAME" ON "user" ("username") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_USERNAME"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
