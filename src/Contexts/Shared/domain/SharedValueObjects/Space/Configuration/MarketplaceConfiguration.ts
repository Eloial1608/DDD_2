import { SharedConfiguration } from './SharedConfiguration'

const defaultConfiguration = {
  allowsCreation: true,
  allowsRatings: true

}
export class MarketplaceConfiguration extends SharedConfiguration {
  configuration: typeof defaultConfiguration

  constructor (
    configuration: Partial<typeof defaultConfiguration> = defaultConfiguration
  ) {
    super({
      ...defaultConfiguration,
      ...configuration
    })

    this.configuration = {
      ...defaultConfiguration,
      ...configuration
    }
  }
}
