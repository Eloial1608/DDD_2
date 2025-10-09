const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1759431060521 {
    name = 'Core1759431060521'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "title" ALTER COLUMN "titleImageUrl" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "title" ALTER COLUMN "titleImageUrl" SET NOT NULL`);
    }
}
