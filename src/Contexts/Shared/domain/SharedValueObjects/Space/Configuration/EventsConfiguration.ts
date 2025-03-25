import { SharedConfiguration } from './SharedConfiguration'

const defaultConfiguration = {
  showFutureEvents: true,
  showPastEvents: true
}
export class EventsConfiguration extends SharedConfiguration {
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
