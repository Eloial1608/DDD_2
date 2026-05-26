import { Account } from '@Core/Account/domain/Account'
import { AccountRepository } from '@Core/Account/domain/AccountRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { Id } from '@Core/Account/domain/ValueObjects/Id'
import { Iban } from '@Core/Account/domain/ValueObjects/Iban'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { AccountSchema } from './entity/AccountSchema'

export class TypeOrmAccountRepository extends TypeOrmRepository<Account> implements AccountRepository {
  protected get entitySchema (): EntitySchema {
    return AccountSchema
  }

  async find (id: Id): Promise<Nullable<Account>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async findByIban (iban: string): Promise<Nullable<Account>> {
    return await (await this.repository()).findOneBy({ iban: Equal(new Iban(iban)) })
  }

  async findByPhoneNumber (phoneNumber: string): Promise<Nullable<Account>> {
    return await (await this.repository()).findOneBy({ phoneNumber: Equal(phoneNumber) })
  }

  async search (criteria: Criteria): Promise<Account[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (Account: Account): Promise<void> {
    await (await this.repository()).save(Account)
  }
}
