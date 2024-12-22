import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { PlanForUsersRepository } from '../../domain/PlanForUsersRepository'
import { EntitySchema, Equal } from 'typeorm'
import { PlanForUsers } from '../../domain/PlanForUsers'
import { Id } from '../../domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { PlanForUsersSchema } from './entity/PlanForUsersSchema'

export class TypeOrmPlanForUsersRepository extends TypeOrmRepository<PlanForUsers> implements PlanForUsersRepository {
  protected get entitySchema (): EntitySchema {
    return PlanForUsersSchema
  }

  async find (id: Id): Promise<Nullable<PlanForUsers>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<PlanForUsers[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (planForUsers: PlanForUsers): Promise<void> {
    await (await this.repository()).save(planForUsers)
  }
}
