import { ProductTypes } from '@Marketplace/Products/domain/ValueObjects/Type'
import { SharedConfiguration } from './SharedConfiguration'

const defaultConfiguration = {
  allowsCreation: true,
  allowedTypes: [
    ProductTypes.PHYSICAL,
    ProductTypes.CODE,
    ProductTypes.FILE,
    ProductTypes.SERVICE
  ],
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
