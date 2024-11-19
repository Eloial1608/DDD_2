import { Query } from '@Shared/domain/Criteria/Query'

export class FindCommunityByIdQuery extends Query {
  constructor (
        readonly id: string
  ) {
    super()
  }
}
