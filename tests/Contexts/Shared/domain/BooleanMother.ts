import { MotherCreator } from './MotherCreator'

export class BooleanMother {
  static random (): boolean {
    return MotherCreator.random().datatype.boolean()
  }
}
