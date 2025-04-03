import { SpaceRepository } from '@Events/Space/domain/SpaceRepository'
import { Id } from '@Events/Space/domain/ValueObjects/Id'
import { Space } from '@Events/Space/domain/Space'
import { SpaceNotFound } from '@Events/Space/domain/Errors/SpaceNotFound'

export class FinderById {
  constructor (private readonly repository: SpaceRepository) {}

  async find (id: Id): Promise<Space> {
    const space = await this.repository.find(id)

    if (!space) throw new SpaceNotFound(id)

    return space
  }
}
