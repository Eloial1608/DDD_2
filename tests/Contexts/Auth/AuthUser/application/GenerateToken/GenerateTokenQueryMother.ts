import { GenerateTokenQuery } from '@Auth/AuthUser/application/GenerateToken/GenerateTokenQuery'
import { AuthUser } from '@Auth/AuthUser/domain/AuthUser'

export class GenerateTokenQueryMother {
  static create (
    email: string,
    method: string,
    secret: string,
    communityId: string
  ): GenerateTokenQuery {
    return new GenerateTokenQuery(
      email,
      communityId,
      method,
      secret
    )
  }

  static fromAggregate (authUser: AuthUser): GenerateTokenQuery {
    return this.create(
      authUser.email.valueOf(),
      authUser.method.valueOf(),
      authUser.secret.valueOf(),
      authUser.communityId.valueOf()
    )
  }
}
