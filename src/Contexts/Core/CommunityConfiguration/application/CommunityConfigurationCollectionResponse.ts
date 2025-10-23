import { CommunityConfiguration } from '../domain/CommunityConfiguration'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { CommunityConfigurationResponse, CommunityConfigurationResponseBody } from './CommunityConfigurationResponse'

export class CommunityConfigurationCollectionResponse implements QueryResponse<Array<CommunityConfigurationResponseBody>> {
  response: Array<CommunityConfigurationResponseBody>

  constructor (communityconfiguration: Array<CommunityConfiguration>) {
    this.response = communityconfiguration.map(x => new CommunityConfigurationResponse(x).response)
  }
}
