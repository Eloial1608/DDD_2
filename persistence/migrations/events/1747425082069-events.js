const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Events1747425082069 {
    name = 'Events1747425082069'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "ticket" ADD "communityId" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_TICKET_COMMUNITY_ID" ON "ticket" ("communityId") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_TICKET_COMMUNITY_ID"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "communityId"`);
    }
}
