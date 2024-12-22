import { StripeProduct } from '@Stripe/StripeProduct/domain/StripeProduct'
import { StripeProductRepository } from '@Stripe/StripeProduct/domain/StripeProductRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { StripeProductSchema } from './entity/StripeProductSchema'
import { Nullable } from '@Shared/domain/Nullable'
import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmStripeProductRepository extends TypeOrmRepository<StripeProduct> implements StripeProductRepository {
  protected get entitySchema (): EntitySchema {
    return StripeProductSchema
  }

  async find (id: Id): Promise<Nullable<StripeProduct>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<StripeProduct[]> {
    return await (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (product: StripeProduct): Promise<void> {
    await (await this.repository()).save(product)
  }

  async delete (product: StripeProduct): Promise<void> {
    await (await this.repository()).remove(product)
  }
}
