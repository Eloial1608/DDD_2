import { InvalidConfigurationType } from '@Core/Space/domain/Errors/InvalidConfigurationType'
import { PostsConfiguration } from './PostsConfiguration'
import { AllowedTypes } from '../AllowedTypes'
import { MediaConfiguration } from './MediaConfiguration'

export class ConfigurationFactory {
  static create (type: AllowedTypes, configuration: any) {
    switch (type) {
      case AllowedTypes.POST:
        return new PostsConfiguration(configuration)
      case AllowedTypes.MEDIA:
        return new MediaConfiguration(configuration)
      default:
        throw new InvalidConfigurationType(type)
    }
  }
}
