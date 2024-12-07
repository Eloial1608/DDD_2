import _ from 'lodash'

export class SlugFactory {
  static create (value: string): string {
    return _.kebabCase(this.removeUnwantedCharacters(value))
  }

  private static removeUnwantedCharacters (input: string): string {
    const unwantedCharsRegex = /[^a-zA-Z0-9\s]/g

    return input.replace(unwantedCharsRegex, '')
  }
}
