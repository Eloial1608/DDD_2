import { SpaceRepository } from '@Posts/Space/domain/SpaceRepository'
import { Id } from '@Posts/Space/domain/ValueObjects/Id'
import { Space } from '@Posts/Space/domain/Space'
import { SpaceNotFound } from '@Posts/Space/domain/Errors/SpaceNotFound'

export class FinderById {
  constructor (private readonly repository: SpaceRepository) {}

  async find (id: Id): Promise<Space> {
    const space = await this.repository.find(id)

    if (!space) throw new SpaceNotFound(id)

    return space
  }
}
