import { SpaceMemberRepository } from '@Media/SpaceMember/domain/SpaceMemberRepository'
import { SpaceMember } from '@Media/SpaceMember/domain/SpaceMember'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: SpaceMemberRepository) {}

  async find (criteria: Criteria): Promise<Array<SpaceMember>> {
    return await this.repository.search(criteria)
  }
}
