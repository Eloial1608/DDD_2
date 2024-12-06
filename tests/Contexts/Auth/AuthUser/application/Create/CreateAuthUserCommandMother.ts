import { CreateAuthUserCommand } from '@Auth/AuthUser/application/Create/CreateAuthUserCommand'
import { AuthUser } from '@Auth/AuthUser/domain/AuthUser'

export class CreateAuthUserCommandMother {
  static create (
    id: string,
    email: string,
    method: string,
    secret: string,
    userId: string,
    communityId: string
  ): CreateAuthUserCommand {
    return new CreateAuthUserCommand(
      id,
      email,
      method,
      secret,
      userId,
      communityId
    )
  }

  static fromAggregate (authUser: AuthUser): CreateAuthUserCommand {
    return this.create(
      authUser.id.valueOf(),
      authUser.email.valueOf(),
      authUser.method.valueOf(),
      authUser.secret.valueOf(),
      authUser.userId.valueOf(),
      authUser.communityId.valueOf()
    )
  }
}
