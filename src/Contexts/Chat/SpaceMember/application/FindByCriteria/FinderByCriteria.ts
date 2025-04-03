import { SpaceMemberRepository } from '@Chat/SpaceMember/domain/SpaceMemberRepository'
import { SpaceMember } from '@Chat/SpaceMember/domain/SpaceMember'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: SpaceMemberRepository) {}

  async find (criteria: Criteria): Promise<Array<SpaceMember>> {
    return await this.repository.search(criteria)
  }
}
