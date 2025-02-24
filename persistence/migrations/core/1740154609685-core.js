const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Core1740154609685 {
    name = 'Core1740154609685'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "stripe_session" ADD "customerId" character varying NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "stripe_session" DROP COLUMN "customerId"`);
    }
}
