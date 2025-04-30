import { SpaceMemberRepository } from '@Events/SpaceMember/domain/SpaceMemberRepository'
import { SpaceMember } from '@Events/SpaceMember/domain/SpaceMember'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: SpaceMemberRepository) {}

  async find (criteria: Criteria): Promise<Array<SpaceMember>> {
    return await this.repository.search(criteria)
  }
}
