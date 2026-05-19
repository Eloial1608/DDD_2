import { AccountMovement } from '@Core/AccountMovement/domain/AccountMovement'
import { AccountMovementRepository } from '@Core/AccountMovement/domain/AccountMovementRepository'
import { AccountId } from '@Core/AccountMovement/domain/ValueObjects/AccountId'
import { TransferId } from '@Core/AccountMovement/domain/ValueObjects/TransferId'
import { AccountMovementAmount } from '@Core/AccountMovement/domain/ValueObjects/AccountMovementAmount'
import { AccountMovementType } from '@Core/AccountMovement/domain/ValueObjects/AccountMovementType'
import { AccountMovementDescription } from '@Core/AccountMovement/domain/ValueObjects/AccountMovementDescription'
import { RelatedAccountId } from '@Core/AccountMovement/domain/ValueObjects/RelatedAccountId'
import { CardId } from '@Core/AccountMovement/domain/ValueObjects/CardId'
import { AccountMovementAlreadyExists } from '@Core/AccountMovement/domain/Errors/AccountMovementAlreadyExists'

export class Creator {
  constructor (readonly repository: AccountMovementRepository) {}

  async run(
    id: AccountId,
    transferId: TransferId,
    accountId: AccountId,
    amount: AccountMovementAmount,
    type: AccountMovementType,
    description: AccountMovementDescription,
    relatedAccountId?: RelatedAccountId,
    cardId?: CardId
  ): Promise<void> {
    await this.ensureNotExists(id)

    const movement = AccountMovement.create(
      id,
      transferId,
      accountId,
      amount,
      type,
      description,
      relatedAccountId,
      cardId
    )

    await this.repository.persist(movement)
  }

  private async ensureNotExists(id: AccountId): Promise<void> {
    const existing = await this.repository.find(id)

    if (existing) {
      throw new AccountMovementAlreadyExists(id)
    }
  }
}