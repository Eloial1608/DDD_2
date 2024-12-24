import { SharedConfiguration } from './SharedConfiguration'

export class PostsConfiguration extends SharedConfiguration {
  constructor (
    readonly configuration = {
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
  ) {
    super(configuration)
  }
}
