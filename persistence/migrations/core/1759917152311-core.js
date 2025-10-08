const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1759917152311 {
    name = 'Core1759917152311'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "community" DROP COLUMN "allowsTitles"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "principalTitle" character varying`);
        await queryRunner.query(`ALTER TABLE "title" ALTER COLUMN "titleImageUrl" SET NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "title" ALTER COLUMN "titleImageUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "principalTitle"`);
        await queryRunner.query(`ALTER TABLE "community" ADD "allowsTitles" boolean NOT NULL DEFAULT false`);
    }
}
