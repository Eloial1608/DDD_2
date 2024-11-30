const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1732965933845 {
    name = 'Core1732965933845'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "auth_user" ("id" character varying NOT NULL, "email" character varying NOT NULL, "method" character varying NOT NULL, "secret" character varying NOT NULL, "userId" character varying NOT NULL, "communityId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9922406dc7d70e20423aeffadf3" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "auth_user"`);
    }
}
