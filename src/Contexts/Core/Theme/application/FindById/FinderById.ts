import { ThemeRepository } from '@Core/Theme/domain/ThemeRepository'
import { Id } from '@Core/Theme/domain/ValueObjects/Id'
import { Theme } from '@Core/Theme/domain/Theme'
import { ThemeNotFound } from '@Core/Theme/domain/Errors/ThemeNotFound'

export class FinderById {
  constructor (private readonly repository: ThemeRepository) {}

  async find (id: Id): Promise<Theme> {
    const theme = await this.repository.find(id)

    if (!theme) throw new ThemeNotFound(id)

    return theme
  }
}
