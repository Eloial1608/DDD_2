const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Threads1746437259676 {
    name = 'Threads1746437259676'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "thread" ALTER COLUMN "title" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "thread" ALTER COLUMN "title" SET NOT NULL`);
    }
}
