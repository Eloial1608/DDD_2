import { CreateUserRetentionCommand } from '@Metrics/UserRetention/application/Create/CreateUserRetentionCommand'
import { UserRetention } from '@Metrics/UserRetention/domain/UserRetention'

export class CreateUserRetentionCommandMother {
  static create (
    id: string,
    userId: string,
    communityId: string
  ): CreateUserRetentionCommand {
    return new CreateUserRetentionCommand(
      id,
      userId,
      communityId
    )
  }

  static fromAggregate (userretention: UserRetention): CreateUserRetentionCommand {
    return this.create(
      userretention.id.valueOf(),
      userretention.userId.valueOf(),
      userretention.communityId.valueOf()
    )
  }
}
