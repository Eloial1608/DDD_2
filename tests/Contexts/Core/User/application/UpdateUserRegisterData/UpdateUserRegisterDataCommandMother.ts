import { UpdateUserRegisterDataCommand } from '@Core/User/application/UpdateUserRegisterData/UpdateUserRegisterDataCommand'
import { User } from '@Core/User/domain/User'

export class UpdateUserRegisterDataCommandMother {
  static updateUserRegisterData (
    id: string,
    registerData: object
  ):UpdateUserRegisterDataCommand {
    return new UpdateUserRegisterDataCommand(
      id,
      registerData
    )
  }

  static fromAggregate (user: User): UpdateUserRegisterDataCommand {
    return this.updateUserRegisterData(
      user.id.valueOf(),
      user.registerData!.valueOf()
    )
  }
}
