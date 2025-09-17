import { SpaceRepository } from '@Metrics/Space/domain/SpaceRepository'
import { Id } from '@Metrics/Space/domain/ValueObjects/Id'
import { Space } from '@Metrics/Space/domain/Space'
import { SpaceNotFound } from '@Metrics/Space/domain/Errors/SpaceNotFound'

export class FinderById {
  constructor (private readonly repository: SpaceRepository) {}

  async find (id: Id): Promise<Space> {
    const space = await this.repository.find(id)

    if (!space) throw new SpaceNotFound(id)

    return space
  }
}
