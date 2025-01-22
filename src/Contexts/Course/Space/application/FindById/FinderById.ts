import { SpaceRepository } from '@Course/Space/domain/SpaceRepository'
import { Id } from '@Course/Space/domain/ValueObjects/Id'
import { Space } from '@Course/Space/domain/Space'
import { SpaceNotFound } from '@Course/Space/domain/Errors/SpaceNotFound'

export class FinderById {
  constructor (private readonly repository: SpaceRepository) {}

  async find (id: Id): Promise<Space> {
    const space = await this.repository.find(id)

    if (!space) throw new SpaceNotFound(id)

    return space
  }
}
