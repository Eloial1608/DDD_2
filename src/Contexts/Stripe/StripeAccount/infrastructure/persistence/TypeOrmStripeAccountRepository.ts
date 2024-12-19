import { StripeAccount } from '@Stripe/StripeAccount/domain/StripeAccount'
import { AccountRepository } from '@Stripe/StripeAccount/domain/AccountRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { StripeAccountSchema } from './entity/StripeAccountSchema'
import { Nullable } from '@Shared/domain/Nullable'
import { Id } from '@Stripe/StripeAccount/domain/ValueObjects/Id'

export class TypeOrmStripeAccountRepository extends TypeOrmRepository<StripeAccount> implements AccountRepository {
  protected get entitySchema (): EntitySchema {
    return StripeAccountSchema
  }

  async find (id: Id): Promise<Nullable<StripeAccount>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async persist (account: StripeAccount): Promise<void> {
    await (await this.repository()).save(account)
  }
}
