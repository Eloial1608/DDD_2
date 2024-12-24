import { InvalidConfigurationType } from '@Core/Space/domain/Errors/InvalidConfigurationType'
import { PostsConfiguration } from './PostsConfiguration'
import { AllowedTypes } from '../AllowedTypes'

export class ConfigurationFactory {
  static create (type: AllowedTypes, configuration: any) {
    switch (type) {
      case AllowedTypes.POST:
        return new PostsConfiguration(configuration)
      default:
        throw new InvalidConfigurationType(type)
    }
  }
}
