import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import type { EntitySchema } from 'typeorm'
import { Equal } from 'typeorm'
import type { Nullable } from '@Shared/domain/Nullable'
import type { Criteria } from '@Shared/domain/Criteria/Criteria'
import { ActionSchema } from './entity/Action.schema'
import type { Action } from '@Marketplace/Action/domain/Action'
import type { ActionRepository } from '@Marketplace/Action/domain/ActionRepository'
import type { Id } from '@Marketplace/Action/domain/ValueObjects/Id'

export class TypeOrmActionRepository extends TypeOrmRepository<Action> implements ActionRepository {
  protected get entitySchema (): EntitySchema {
    return ActionSchema
  }

  async find (id: Id): Promise<Nullable<Action>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Action[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (marketplace: Action): Promise<void> {
    await (await this.repository()).save(marketplace)
  }

  async delete (marketplace: Action): Promise<void> {
    await (await this.repository()).remove(marketplace)
  }
}
