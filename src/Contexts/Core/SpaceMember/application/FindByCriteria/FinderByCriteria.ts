import { SpaceMemberRepository } from '@Core/SpaceMember/domain/SpaceMemberRepository'
import { SpaceMember } from '@Core/SpaceMember/domain/SpaceMember'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: SpaceMemberRepository) {}

  async find (criteria: Criteria): Promise<Array<SpaceMember>> {
    return await this.repository.search(criteria)
  }
}
