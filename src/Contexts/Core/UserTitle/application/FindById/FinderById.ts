import { UserTitleRepository } from '@Core/UserTitle/domain/UserTitleRepository'
import { Id } from '@Core/UserTitle/domain/ValueObjects/Id'
import { UserTitle } from '@Core/UserTitle/domain/UserTitle'
import { UserTitleNotFound } from '@Core/UserTitle/domain/Errors/UserTitleNotFound'

export class FinderById {
  constructor (private readonly repository: UserTitleRepository) {}

  async find (id: Id): Promise<UserTitle> {
    const userTitle = await this.repository.find(id)

    if (!userTitle) throw new UserTitleNotFound(id)

    return userTitle
  }
}
