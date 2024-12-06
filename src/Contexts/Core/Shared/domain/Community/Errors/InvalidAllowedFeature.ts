import { DomainError } from '@Shared/domain/Errors/DomainError'
import { CommunityAllowedFeature } from '../CommunityAllowedFeatures'

export class InvalidAllowedFeature extends DomainError {
  protected code = 'invalid-allowed-feature'
  protected message

  constructor (feature: CommunityAllowedFeature) {
    super()
    this.message = `The feature ${feature.valueOf()} isn't valid`
  }
}
