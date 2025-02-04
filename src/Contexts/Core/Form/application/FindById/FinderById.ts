import { FormRepository } from '@Core/Form/domain/FormRepository'
import { Id } from '@Core/Form/domain/ValueObjects/Id'
import { Form } from '@Core/Form/domain/Form'
import { FormNotFound } from '@Core/Form/domain/Errors/FormNotFound'

export class FinderById {
  constructor (private readonly repository: FormRepository) {}

  async find (id: Id): Promise<Form> {
    const form = await this.repository.find(id)

    if (!form) throw new FormNotFound(id)

    return form
  }
}
