
import { AccountMovementRepository } from '@Core/AccountMovement/domain/AccountMovementRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { AccountMovementSchema } from './entity/AccountMovementSchema'
import { AccountMovementId } from '@Core/AccountMovement/domain/ValueObjects/AccountMovementId'
import { AccountMovement } from '@Core/AccountMovement/domain/AccountMovement'

export class TypeOrmAccountMovementRepository extends TypeOrmRepository<AccountMovement> implements AccountMovementRepository {
  protected get entitySchema (): EntitySchema {
    return AccountMovementSchema
  }

  async find (id: AccountMovementId): Promise<Nullable<AccountMovement>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<AccountMovement[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (AccountMovement: AccountMovement): Promise<void> {
    await (await this.repository()).save(AccountMovement)
    
  }
}