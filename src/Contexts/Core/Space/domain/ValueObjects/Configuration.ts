import { SharedConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/SharedConfiguration'

export class Configuration extends SharedConfiguration {
  constructor (
    readonly configuration = {
      allowsCreation: true,
      allowsHideMetadata: false,
      allowBanner: true,
      mustHaveBanner: false,
      mustHideMetadata: false
    }
  ) {
    super(configuration)
  }
}
