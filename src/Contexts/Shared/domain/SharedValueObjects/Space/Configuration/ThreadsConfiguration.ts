import { SharedConfiguration } from './SharedConfiguration'

const defaultConfiguration = {
  allowsComments: true,
  allowsLikes: true,
  allowsImages: true,
  allowsVideos: true,
  allowsPaid: false

}
export class ThreadsConfiguration extends SharedConfiguration {
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
