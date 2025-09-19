import { MotherCreator } from './MotherCreator'

export class IntegerMother {
  static random (max?: number): number {
    return MotherCreator.random().number.int()
  }

  static positive (max?: number): number {
    return MotherCreator.random().number.int({ min: 1, max })
  }
}
