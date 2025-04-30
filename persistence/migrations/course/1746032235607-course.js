const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Course1746032235607 {
    name = 'Course1746032235607'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "course" ADD "description" character varying`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "description"`);
    }
}
