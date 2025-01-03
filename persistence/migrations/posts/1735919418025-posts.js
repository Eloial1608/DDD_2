const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Posts1735919418025 {
    name = 'Posts1735919418025'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "comment" ("id" character varying NOT NULL, "postId" character varying NOT NULL, "userId" character varying NOT NULL, "userMetadata" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "comment"`);
    }
}
