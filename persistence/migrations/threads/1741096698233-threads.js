const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Threads1741096698233 {
    name = 'Threads1741096698233'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "thread_user" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "threadId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_268f824f2f1f84dac247b7776fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_THREAD_USER_USER_ID" ON "thread_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_THREAD_USER_THREAD_ID" ON "thread_user" ("threadId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_THREAD_USER_THREAD_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_THREAD_USER_USER_ID"`);
        await queryRunner.query(`DROP TABLE "thread_user"`);
    }
}
