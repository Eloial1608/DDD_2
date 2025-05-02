const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Course1746193956506 {
    name = 'Course1746193956506'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "section" ADD "order" integer NOT NULL DEFAULT '99'`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD "order" integer NOT NULL DEFAULT '99'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "section" DROP COLUMN "order"`);
    }
}
