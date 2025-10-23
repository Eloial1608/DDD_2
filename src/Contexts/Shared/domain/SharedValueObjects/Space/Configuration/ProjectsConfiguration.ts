import { SharedConfiguration } from './SharedConfiguration'

const defaultConfiguration = {
  allowsCreation: false
}
export class ProjectsConfiguration extends SharedConfiguration {
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
