import { Query } from '@Shared/domain/QueryBus/Query'
import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { GenerateTokenQuery } from './GenerateTokenQuery'
import { Generator } from './Generator'
import { Email } from '@Auth/AuthUser/domain/ValueObjects/Email'
import { CommunityId } from '@Auth/AuthUser/domain/ValueObjects/CommunityId'
import { Method, ValidMethods } from '@Auth/AuthUser/domain/ValueObjects/Method'
import { Secret } from '@Auth/AuthUser/domain/ValueObjects/Secret'
import { GenerateTokenResponse } from './GenerateTokenResponse'

export class GenerateTokenQueryHandler implements QueryHandler<GenerateTokenQuery, GenerateTokenResponse> {
  constructor (private readonly generator: Generator) {}
  subscribedTo (): Query {
    return GenerateTokenQuery
  }

  async handle (data: GenerateTokenQuery): Promise<GenerateTokenResponse> {
    return new GenerateTokenResponse(
      await this.generator.run(
        new Email(data.email),
        new CommunityId(data.communityId),
        new Method(data.method as ValidMethods),
        new Secret(data.secret)
      )
    )
  }
}
