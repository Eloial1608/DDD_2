const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Auth1733319964839 {
    name = 'Auth1733319964839'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "auth_user" ("id" character varying NOT NULL, "email" character varying NOT NULL, "method" character varying NOT NULL, "secret" character varying NOT NULL, "userId" character varying NOT NULL, "communityId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9922406dc7d70e20423aeffadf3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_USER_COMMUNITYID" ON "auth_user" ("communityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_USER_METHOD" ON "auth_user" ("method") `);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_USER_SECRET" ON "auth_user" ("secret") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_USER_SECRET"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_USER_METHOD"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_USER_COMMUNITYID"`);
        await queryRunner.query(`DROP TABLE "auth_user"`);
    }
}
