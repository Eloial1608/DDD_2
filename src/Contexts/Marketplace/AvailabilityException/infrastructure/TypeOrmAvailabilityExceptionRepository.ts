import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import type { AvailabilityException } from '../domain/AvailabilityException'
import { AvailabilityExceptionSchema } from './entity/AvailabilityException.schema'
import type { AvailabilityExceptionRepository } from '../domain/AvailabilityExceptionRepository'
import type { AvailabilityExceptionId } from '../domain/ValueObjects/AvailabilityExceptionId'
import type { Nullable } from '@Shared/domain/Nullable'
import type { Criteria } from '@Shared/domain/Criteria/Criteria'
import type { EntitySchema } from 'typeorm'
import { Equal } from 'typeorm'

export class TypeOrmAvailabilityExceptionRepository extends TypeOrmRepository<AvailabilityException> implements AvailabilityExceptionRepository {
  protected get entitySchema (): EntitySchema {
    return AvailabilityExceptionSchema
  }

  async find (id: AvailabilityExceptionId): Promise<Nullable<AvailabilityException>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<AvailabilityException[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (exception: AvailabilityException): Promise<void> {
    await (await this.repository()).save(exception)
  }

  async delete (exception: AvailabilityException): Promise<void> {
    await (await this.repository()).remove(exception)
  }
}
