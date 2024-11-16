import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'

export class SlugMother {
  static random (): string {
    return MotherCreator.random().lorem.slug()
  }
}
