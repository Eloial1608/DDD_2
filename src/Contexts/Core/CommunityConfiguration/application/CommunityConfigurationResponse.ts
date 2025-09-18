import { Nullable } from '@Shared/domain/Nullable'
import { CommunityConfiguration } from '../domain/CommunityConfiguration'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { ThemeType } from '../domain/ValueObjects/CurrentTheme'

export type CommunityConfigurationResponseBody = {
    readonly id: string
    readonly communityId: Nullable<string>
    readonly currentTheme: Nullable<ThemeType>
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class CommunityConfigurationResponse implements QueryResponse<CommunityConfigurationResponseBody> {
  response: CommunityConfigurationResponseBody

  constructor (communityconfiguration: CommunityConfiguration) {
    this.response = {
      id: communityconfiguration.id.valueOf(),
      communityId: communityconfiguration.communityId ? communityconfiguration.communityId.valueOf() : null,
      currentTheme: communityconfiguration.currentTheme ? communityconfiguration.currentTheme.valueOf() : null,
      createdAt: communityconfiguration.createdAt.valueOf(),
      updatedAt: communityconfiguration.updatedAt.valueOf()
    }
  }
}
