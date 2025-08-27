const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Metrics1756285719327 {
    name = 'Metrics1756285719327'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "mainId" character varying NOT NULL, "communityId" character varying NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "isAdmin" boolean NOT NULL, "isOwner" boolean NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_USER_COMMUNITY_ID" ON "user" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_USER_MAIN_ID" ON "user" ("mainId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_MAIN_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_COMMUNITY_ID"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
