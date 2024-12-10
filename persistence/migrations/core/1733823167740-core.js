const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1733823167740 {
    name = 'Core1733823167740'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "space" ("id" character varying NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "parentId" character varying, "totalMembers" integer NOT NULL, "icon" character varying, "createdBy" character varying NOT NULL, "accessibility" character varying NOT NULL, "headerUrl" character varying, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "priceValue" integer, "priceCurrency" character varying, CONSTRAINT "PK_094f5ec727fe052956a11623640" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "space"`);
    }
}
