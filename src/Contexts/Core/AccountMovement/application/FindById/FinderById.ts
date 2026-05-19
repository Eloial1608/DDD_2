import { AccountMovementRepository } from '@Core/AccountMovement/domain/AccountMovementRepository'
import { AccountMovement } from '@Core/AccountMovement/domain/AccountMovement'
import { AccountMovementNotFound } from '@Core/AccountMovement/domain/Errors/AccountMovementNotFound'
import { AccountId } from '@Core/AccountMovement/domain/ValueObjects/AccountId'

export class FinderById {
  constructor (private readonly repository: AccountMovementRepository) {}

  async find (id: AccountId): Promise<AccountMovement> {
    const AccountMovement = await this.repository.find(id)

    if (!AccountMovement) throw new AccountMovementNotFound(id)

    return AccountMovement
  }
}
