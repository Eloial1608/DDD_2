import { SpaceMemberRepository } from '@Core/SpaceMember/domain/SpaceMemberRepository'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { SpaceMember } from '@Core/SpaceMember/domain/SpaceMember'
import { SpaceMemberNotFound } from '@Core/SpaceMember/domain/Errors/SpaceMemberNotFound'

export class FinderById {
  constructor (private readonly repository: SpaceMemberRepository) {}

  async find (id: Id): Promise<SpaceMember> {
    const spaceMember = await this.repository.find(id)

    if (!spaceMember) throw new SpaceMemberNotFound(id)

    return spaceMember
  }
}
