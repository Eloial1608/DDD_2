import { CreatePageViewCommand } from '@Metrics/PageView/application/Create/CreatePageViewCommand'
import { PageView } from '@Metrics/PageView/domain/PageView'

export class CreatePageViewCommandMother {
  static create (
    id: string,
    userId: string,
    communityId: string,
    spaceId: string
  ): CreatePageViewCommand {
    return new CreatePageViewCommand(
      id,
      communityId,
      userId,
      spaceId
    )
  }

  static fromAggregate (pageview: PageView): CreatePageViewCommand {
    return this.create(
      pageview.id.valueOf(),
      pageview.communityId.valueOf(),
      pageview.userId.valueOf(),
      pageview.spaceId.valueOf()
    )
  }
}
