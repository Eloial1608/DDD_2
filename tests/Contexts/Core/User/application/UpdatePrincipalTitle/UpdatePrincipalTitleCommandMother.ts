import { UpdatePrincipalTitleCommand } from '@Core/User/application/UpdatePrincipalTitle/UpdatePrincipalTitleCommand'
import { User } from '@Core/User/domain/User'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdatePrincipalTitleCommandMother {
  static updatePrincipalTitle (
    id: string,
    principalTitle: Nullable<string>,
    communityId: string
  ): UpdatePrincipalTitleCommand {
    return new UpdatePrincipalTitleCommand(
      id,
      principalTitle,
      communityId
    )
  }

  static fromAggregate (user: User): UpdatePrincipalTitleCommand {
    return this.updatePrincipalTitle(
      user.id.valueOf(),
      user.principalTitle?.valueOf(),
      user.communityId.valueOf()
    )
  }
}
