import { UserLevelRepository } from '@Core/UserLevel/domain/UserLevelRepository'
import { Id } from '@Core/UserLevel/domain/ValueObjects/Id'
import { UserLevel } from '@Core/UserLevel/domain/UserLevel'
import { UserLevelNotFound } from '@Core/UserLevel/domain/Errors/UserLevelNotFound'

export class FinderById {
  constructor (private readonly repository: UserLevelRepository) {}

  async find (id: Id): Promise<UserLevel> {
    const userlevel = await this.repository.find(id)

    if (!userlevel) throw new UserLevelNotFound(id)

    return userlevel
  }
}
