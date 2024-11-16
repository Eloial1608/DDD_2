import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'

export class UrlMother {
  static random (): string {
    return MotherCreator.random().internet.url()
  }
}
