const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1735644725510 {
    name = 'Core1735644725510'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "pictureUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "bannerUrl" character varying`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bannerUrl"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "pictureUrl"`);
    }
}
