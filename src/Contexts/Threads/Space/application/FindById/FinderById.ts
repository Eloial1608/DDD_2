import { SpaceRepository } from 'src/Contexts/Threads/Space/domain/SpaceRepository'
import { Id } from 'src/Contexts/Threads/Space/domain/ValueObjects/Id'
import { Space } from 'src/Contexts/Threads/Space/domain/Space'
import { SpaceNotFound } from 'src/Contexts/Threads/Space/domain/Errors/SpaceNotFound'

export class FinderById {
  constructor (private readonly repository: SpaceRepository) {}

  async find (id: Id): Promise<Space> {
    const space = await this.repository.find(id)

    if (!space) throw new SpaceNotFound(id)

    return space
  }
}
