const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Course1746192523882 {
    name = 'Course1746192523882'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "section" ALTER COLUMN "deletedAt" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "section" ALTER COLUMN "deletedAt" SET NOT NULL`);
    }
}
