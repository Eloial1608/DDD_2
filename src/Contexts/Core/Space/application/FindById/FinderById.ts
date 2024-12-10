import { SpaceRepository } from '@Core/Space/domain/SpaceRepository'
import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { Space } from '@Core/Space/domain/Space'
import { SpaceNotFound } from '@Core/Space/domain/Errors/SpaceNotFound'

export class FinderById {
  constructor (private readonly repository: SpaceRepository) {}

  async find (id: Id): Promise<Space> {
    const space = await this.repository.find(id)

    if (!space) throw new SpaceNotFound(id)

    return space
  }
}
