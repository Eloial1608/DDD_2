const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Course1746189036197 {
    name = 'Course1746189036197'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "section" ADD "description" character varying`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "section" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD "type" character varying NOT NULL`);
    }
}
