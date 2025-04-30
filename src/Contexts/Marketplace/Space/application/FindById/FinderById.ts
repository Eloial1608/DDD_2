import { SpaceRepository } from '@Marketplace/Space/domain/SpaceRepository'
import { Id } from '@Marketplace/Space/domain/ValueObjects/Id'
import { Space } from '@Marketplace/Space/domain/Space'
import { SpaceNotFound } from '@Marketplace/Space/domain/Errors/SpaceNotFound'

export class FinderById {
  constructor (private readonly repository: SpaceRepository) {}

  async find (id: Id): Promise<Space> {
    const space = await this.repository.find(id)

    if (!space) throw new SpaceNotFound(id)

    return space
  }
}
