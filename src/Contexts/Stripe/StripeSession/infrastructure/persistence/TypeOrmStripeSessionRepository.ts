import { StripeSession } from '@Stripe/StripeSession/domain/StripeSession'
import { StripeSessionRepository } from '@Stripe/StripeSession/domain/StripeSessionRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { StripeSessionSchema } from './entity/StripeSessionSchema'
import { Nullable } from '@Shared/domain/Nullable'
import { Id } from '@Stripe/StripeSession/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmStripeSessionRepository extends TypeOrmRepository<StripeSession> implements StripeSessionRepository {
  protected get entitySchema (): EntitySchema {
    return StripeSessionSchema
  }

  async find (id: Id): Promise<Nullable<StripeSession>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<StripeSession[]> {
    return await (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (session: StripeSession): Promise<void> {
    await (await this.repository()).save(session)
  }
}
