const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Course1739873811471 {
    name = 'Course1739873811471'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "endDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "bannerUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "maxStudents" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "deletedAt" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "deletedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "maxStudents" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "bannerUrl" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "endDate" SET NOT NULL`);
    }
}
