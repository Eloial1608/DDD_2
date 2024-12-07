import { CommunityPlan } from '@Core/CommunityPlan/domain/CommunityPlan'
import { CommunityPlanRepository } from '@Core/CommunityPlan/domain/CommunityPlanRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { CommunityPlanSchema } from './entity/CommunityPlanSchema'
import { Id } from '@Core/CommunityPlan/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmCommunityPlanRepository extends TypeOrmRepository<CommunityPlan> implements CommunityPlanRepository {
  protected get entitySchema (): EntitySchema {
    return CommunityPlanSchema
  }

  async find (id: Id): Promise<Nullable<CommunityPlan>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<CommunityPlan[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (communityplan: CommunityPlan): Promise<void> {
    await (await this.repository()).save(communityplan)
  }
}
