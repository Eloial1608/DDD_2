import { StatusRepository } from '@Projects/Status/domain/StatusRepository'
import { Id } from '@Projects/Status/domain/ValueObjects/Id'
import { Status } from '@Projects/Status/domain/Status'
import { StatusNotFound } from '@Projects/Status/domain/Errors/StatusNotFound'

export class FinderById {
  constructor (private readonly repository: StatusRepository) {}

  async find (id: Id): Promise<Status> {
    const status = await this.repository.find(id)

    if (!status) throw new StatusNotFound(id)

    return status
  }
}
