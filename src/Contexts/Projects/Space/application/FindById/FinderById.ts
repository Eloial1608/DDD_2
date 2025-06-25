import { SpaceRepository } from '@Projects/Space/domain/SpaceRepository'
import { Id } from '@Projects/Space/domain/ValueObjects/Id'
import { Space } from '@Projects/Space/domain/Space'
import { SpaceNotFound } from '@Projects/Space/domain/Errors/SpaceNotFound'

export class FinderById {
  constructor (private readonly repository: SpaceRepository) {}

  async find (id: Id): Promise<Space> {
    const space = await this.repository.find(id)

    if (!space) throw new SpaceNotFound(id)

    return space
  }
}
