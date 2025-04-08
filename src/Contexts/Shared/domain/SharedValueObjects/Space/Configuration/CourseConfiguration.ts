import { SharedConfiguration } from './SharedConfiguration'

const defaultConfiguration = {
  allowsCreation: true,
  allowsHideMetadata: false,
  allowsComments: true,
  allowsLikes: true,
  showFinishedCourses: true,
  showFutureCourses: true,
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
