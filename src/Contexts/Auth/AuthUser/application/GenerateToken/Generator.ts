import { AuthUserRepository } from '@Auth/AuthUser/domain/AuthUserRepository'
import { AuthUserNotFound } from '@Auth/AuthUser/domain/Errors/AuthUserNotFound'
import { CommunityId } from '@Auth/AuthUser/domain/ValueObjects/CommunityId'
import { Email } from '@Auth/AuthUser/domain/ValueObjects/Email'
import { Method, ValidMethods } from '@Auth/AuthUser/domain/ValueObjects/Method'
import { Secret } from '@Auth/AuthUser/domain/ValueObjects/Secret'
import { Encrypter } from '@Auth/Shared/domain/Encrypt/Encrypter'
import { Tokenizer } from '@Auth/Shared/domain/Tokenizer/Tokenizer'

export class Generator {
  constructor (private readonly repository: AuthUserRepository, private readonly tokenizer: Tokenizer, private readonly encrypter: Encrypter) {}

  async run (email: Email, communityId: CommunityId, method: Method, secret: Secret): Promise<string> {
    if (method.valueOf() === ValidMethods.PASSWORD) secret = new Secret(this.encrypter.encrypt(secret.valueOf()))

    const user = await this.repository.findByCommunityMethodEmailAndSecret(communityId, method, email, secret)

    if (!user) throw new AuthUserNotFound('User not found')

    return await this.tokenizer.create({
      userId: user.userId.valueOf(),
      communityId: user.communityId.valueOf()
    }, 60 * 60 * 24 * 30 * 6)
  }
}
