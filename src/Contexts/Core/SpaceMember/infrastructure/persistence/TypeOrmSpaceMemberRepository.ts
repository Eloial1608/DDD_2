import { SpaceMember } from '@Core/SpaceMember/domain/SpaceMember'
import { SpaceMemberRepository } from '@Core/SpaceMember/domain/SpaceMemberRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { SpaceMemberSchema } from './entity/SpaceMemberSchema'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmSpaceMemberRepository extends TypeOrmRepository<SpaceMember> implements SpaceMemberRepository {
  protected get entitySchema (): EntitySchema {
    return SpaceMemberSchema
  }

  async find (id: Id): Promise<Nullable<SpaceMember>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<SpaceMember[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (spacemember: SpaceMember): Promise<void> {
    await (await this.repository()).save(spacemember)
  }
}
