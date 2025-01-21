import { SharedConfiguration } from './SharedConfiguration'

const defaultConfiguration = {
  allowsCreation: true,
  allowsHideMetadata: false,
  allowBanner: true,
  mustHaveBanner: false,
  mustHideMetadata: false,
  allowsComments: true,
  allowsLikes: true,
  allowsImages: true,
  allowsVideos: true,
  allowsPaid: false
}
export class CourseConfiguration extends SharedConfiguration {
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
