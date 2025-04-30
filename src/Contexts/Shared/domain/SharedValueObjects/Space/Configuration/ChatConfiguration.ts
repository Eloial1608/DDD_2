import { SharedConfiguration } from './SharedConfiguration'

const defaultConfiguration = {
  allowsMessages: true,
  numberOfMessagesPerMinute: 0,
  allowsMedia: true
}
export class ChatConfiguration extends SharedConfiguration {
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
