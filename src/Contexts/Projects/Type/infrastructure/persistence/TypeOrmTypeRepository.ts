import { Type } from '@Projects/Type/domain/Type'
import { TypeRepository } from '@Projects/Type/domain/TypeRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { TypeSchema } from './entity/TypeSchema'
import { Id } from '@Projects/Type/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmTypeRepository extends TypeOrmRepository<Type> implements TypeRepository {
  protected get entitySchema (): EntitySchema {
    return TypeSchema
  }

  async find (id: Id): Promise<Nullable<Type>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Type[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (type: Type): Promise<void> {
    await (await this.repository()).save(type)
  }

  async delete (type: Type): Promise<void> {
    await (await this.repository()).remove(type)
  }
}
