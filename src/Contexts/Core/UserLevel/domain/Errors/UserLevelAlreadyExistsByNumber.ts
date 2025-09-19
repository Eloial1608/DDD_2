import { DomainError } from '@Shared/domain/Errors/DomainError'
import { LevelNumber } from '../ValueObjects/LevelNumber'

export class UserLevelAlreadyExistsByNumber extends DomainError {
  protected code = 'user-level-number-already-exists'
  protected message

  constructor (levelNumber: LevelNumber) {
    super()
    this.message = `A user level with number ${levelNumber} already exists`
  }
}
