import { InvalidConfigurationType } from '@Core/Space/domain/Errors/InvalidConfigurationType'
import { PostsConfiguration } from './PostsConfiguration'
import { AllowedTypes } from '../AllowedTypes'
import { MediaConfiguration } from './MediaConfiguration'
import { Configuration } from '@Core/Space/domain/ValueObjects/Configuration'

export class ConfigurationFactory {
  static create (type: AllowedTypes, configuration: any) {
    switch (type) {
      case AllowedTypes.POST:
        return new PostsConfiguration(configuration)
      case AllowedTypes.MEDIA:
        return new MediaConfiguration(configuration)
      case AllowedTypes.COURSES:
        return new MediaConfiguration(configuration)
      case AllowedTypes.GROUP:
        return new Configuration(configuration)
      default:
        throw new InvalidConfigurationType(type)
    }
  }
}
