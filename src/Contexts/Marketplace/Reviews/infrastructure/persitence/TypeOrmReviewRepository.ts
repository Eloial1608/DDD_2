import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { ReviewSchema } from './entity/Review.schema'
import { Review } from '@Marketplace/Reviews/domain/Review'
import { ReviewRepository } from '@Marketplace/Reviews/domain/ReviewRepository'
import { Id } from '@Marketplace/Reviews/domain/ValueObjects/Id'

export class TypeOrmReviewRepository extends TypeOrmRepository<Review> implements ReviewRepository {
  protected get entitySchema (): EntitySchema {
    return ReviewSchema
  }

  async find (id: Id): Promise<Nullable<Review>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Review[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (marketplace: Review): Promise<void> {
    await (await this.repository()).save(marketplace)
  }
}
