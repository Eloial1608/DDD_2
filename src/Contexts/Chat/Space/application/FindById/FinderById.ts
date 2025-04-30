import { SpaceRepository } from '@Chat/Space/domain/SpaceRepository'
import { Id } from '@Chat/Space/domain/ValueObjects/Id'
import { Space } from '@Chat/Space/domain/Space'
import { SpaceNotFound } from '@Chat/Space/domain/Errors/SpaceNotFound'

export class FinderById {
  constructor (private readonly repository: SpaceRepository) {}

  async find (id: Id): Promise<Space> {
    const space = await this.repository.find(id)

    if (!space) throw new SpaceNotFound(id)

    return space
  }
}
