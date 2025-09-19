import { LevelRepository } from '@Core/Level/domain/LevelRepository'
import { Id } from '@Core/Level/domain/ValueObjects/Id'
import { Level } from '@Core/Level/domain/Level'
import { LevelNotFound } from '@Core/Level/domain/Errors/LevelNotFound'

export class FinderById {
  constructor (private readonly repository: LevelRepository) {}

  async find (id: Id): Promise<Level> {
    const level = await this.repository.find(id)

    if (!level) throw new LevelNotFound(id)

    return level
  }
}
