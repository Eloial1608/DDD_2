/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Core1778072960846 {
    name = 'Core1778072960846'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "card_movements" ("id" character varying NOT NULL, "cardId" character varying NOT NULL, "amount" integer NOT NULL, "description" character varying, "accountMovementId" character varying, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_e72e9696d4a3d88ce50ab090df8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_CARD_ID" ON "card_movements" ("cardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ACCOUNT_MOVEMENT" ON "card_movements" ("accountMovementId") `);
        await queryRunner.query(`CREATE TABLE "AccountMovements" ("id" character varying NOT NULL, "transferId" character varying NOT NULL, "accountId" character varying NOT NULL, "amount" integer NOT NULL, "type" character varying NOT NULL, "description" character varying NOT NULL, "relatedAccountId" character varying, "cardId" character varying, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_83b75c2fa5fa8cf7a1b2172c251" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_AccountMovement_ACCOUNT" ON "AccountMovements" ("accountId") `);
        await queryRunner.query(`CREATE INDEX "IDX_AccountMovement_TRANSFER" ON "AccountMovements" ("transferId") `);
        await queryRunner.query(`CREATE INDEX "IDX_AccountMovement_TYPE" ON "AccountMovements" ("type") `);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_AccountMovement_TYPE"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AccountMovement_TRANSFER"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AccountMovement_ACCOUNT"`);
        await queryRunner.query(`DROP TABLE "AccountMovements"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ACCOUNT_MOVEMENT"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_CARD_ID"`);
        await queryRunner.query(`DROP TABLE "card_movements"`);
    }
}
