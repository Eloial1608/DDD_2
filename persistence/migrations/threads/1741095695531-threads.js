const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Threads1741095695531 {
    name = 'Threads1741095695531'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "like" ("id" character varying NOT NULL, "threadId" character varying NOT NULL, "userId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_LIKE_USER_ID" ON "like" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_LIKE_THREAD_ID" ON "like" ("threadId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_LIKE_THREAD_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_LIKE_USER_ID"`);
        await queryRunner.query(`DROP TABLE "like"`);
    }
}
