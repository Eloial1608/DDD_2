import { Form } from '@Core/Form/domain/Form'
import { FormRepository } from '@Core/Form/domain/FormRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { FormSchema } from './entity/FormSchema'
import { Id } from '@Core/Form/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmFormRepository extends TypeOrmRepository<Form> implements FormRepository {
  protected get entitySchema (): EntitySchema {
    return FormSchema
  }

  async find (id: Id): Promise<Nullable<Form>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Form[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (form: Form): Promise<void> {
    await (await this.repository()).save(form)
  }
}
