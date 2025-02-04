import { FormRepository } from '@Core/Form/domain/FormRepository'
import { Form } from '@Core/Form/domain/Form'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: FormRepository) {}

  async find (criteria: Criteria): Promise<Array<Form>> {
    return await this.repository.search(criteria)
  }
}
