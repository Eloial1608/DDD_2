import { DomainError } from '@Shared/domain/Errors/DomainError'
import { LevelNumber } from '../ValueObjects/LevelNumber'

export class LevelAlreadyExistsByNumber extends DomainError {
  protected code = 'level-number-already-exists'
  protected message

  constructor (levelNumber: LevelNumber) {
    super()
    this.message = `A levelNumber with id ${levelNumber} already exists`
  }
}
