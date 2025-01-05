import { SpaceRepository } from '@Media/Space/domain/SpaceRepository'
import { Id } from '@Media/Space/domain/ValueObjects/Id'
import { Space } from '@Media/Space/domain/Space'
import { SpaceNotFound } from '@Media/Space/domain/Errors/SpaceNotFound'

export class FinderById {
  constructor (private readonly repository: SpaceRepository) {}

  async find (id: Id): Promise<Space> {
    const space = await this.repository.find(id)

    if (!space) throw new SpaceNotFound(id)

    return space
  }
}
