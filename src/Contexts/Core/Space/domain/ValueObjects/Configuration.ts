import { SharedConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/SharedConfiguration'

export class Configuration extends SharedConfiguration {
  constructor (
    readonly configuration = {}
  ) {
    super(configuration)
  }
}
