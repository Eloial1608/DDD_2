import { AuthUser } from '@Auth/AuthUser/domain/AuthUser'
import { AuthUserRepository } from '@Auth/AuthUser/domain/AuthUserRepository'
import { AuthUserAlreadyExists } from '@Auth/AuthUser/domain/Errors/AuthUserAlreadyExists'
import { InvalidSecret } from '@Auth/AuthUser/domain/Errors/InvalidSecret'
import { OAuthRepository } from '@Auth/AuthUser/domain/OAuthRepository'
import { CommunityId } from '@Auth/AuthUser/domain/ValueObjects/CommunityId'
import { Email } from '@Auth/AuthUser/domain/ValueObjects/Email'
import { Id } from '@Auth/AuthUser/domain/ValueObjects/Id'
import { Method, ValidMethods } from '@Auth/AuthUser/domain/ValueObjects/Method'
import { Secret } from '@Auth/AuthUser/domain/ValueObjects/Secret'
import { UserId } from '@Auth/AuthUser/domain/ValueObjects/UserId'
import { Encrypter } from '@Auth/Shared/domain/Encrypt/Encrypter'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Creator {
  constructor (
        private readonly repository: AuthUserRepository,
        private readonly eventBus: EventBus,
        private readonly oauthRepository: OAuthRepository,
        private readonly encrypter: Encrypter
  ) {}

  async run (
    id: Id,
    email: Email,
    method: Method,
    secret: Secret,
    userId: UserId,
    communityId: CommunityId
  ) {
    if (method.valueOf() === ValidMethods.PASSWORD) secret = this.encryptSecret(secret)
    if (method.valueOf() === ValidMethods.GOOGLE) {
      const oauthUser = await this.oauthRepository.getByUid(secret.valueOf())
      if (!oauthUser) throw new InvalidSecret('The given secret isnt valid')
    }

    const existing = (await this.repository.search(
      new Criteria(
        new Filters([
          Filter.simple('communityId', '=', communityId.valueOf()),
          Filter.simple('email', '=', email.valueOf())
        ])
      )
    )).pop()

    if (existing) throw new AuthUserAlreadyExists('Cant create the auth user as it exists')

    const authUser = AuthUser.create(
      id,
      email,
      method,
      secret,
      userId,
      communityId
    )

    await this.repository.persist(authUser)
    await this.eventBus.publish(authUser.pullDomainEvents())
  }

  private encryptSecret (secret: Secret): Secret {
    return new Secret(this.encrypter.encrypt(secret.valueOf()))
  }
}
