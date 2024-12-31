const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Posts1735490539240 {
    name = 'Posts1735490539240'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "like" ("id" character varying NOT NULL, "postId" character varying NOT NULL, "userId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "like"`);
    }
}
