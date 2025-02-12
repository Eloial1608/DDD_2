const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Course1738844458713 {
    name = 'Course1738844458713'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "course" ADD "maxStudents" integer NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "maxStudents"`);
    }
}
