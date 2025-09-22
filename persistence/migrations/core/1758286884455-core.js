const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1758286884455 {
    name = 'Core1758286884455'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user_level" ("id" character varying NOT NULL, "communityId" character varying NOT NULL, "userId" character varying NOT NULL, "currentExp" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d33d938ab8244a12eccac00edd2" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user_level"`);
    }
}
