import { UserRepository } from '@Core/User/domain/UserRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { RegisterData } from '@Core/User/domain/ValueObjects/RegisterData'

export class UpdaterUserRegisterData {
  constructor (
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus
  ) {}

  async run (
    id: Id,
    registerData: RegisterData
  ) {
    const user = await this.repository.find(id)

    if (!user) throw new UserNotFound(id)

    const updatedUser = user.updateRegisterData(registerData)

    await this.repository.persist(updatedUser)
    await this.eventBus.publish(updatedUser.pullDomainEvents())
  }
}
