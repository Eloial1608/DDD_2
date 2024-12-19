import { UserNotFound } from "@Core/User/domain/Errors/UserNotFound";
import { UserRepository } from "@Core/User/domain/UserRepository";
import { Id } from "@Core/User/domain/ValueObjects/Id";
import { EventBus } from "@Shared/domain/EventBus/EventBus";

export class Updater {
  constructor(private readonly repository: UserRepository, private readonly eventBus: EventBus){}

  async run(id:Id){
    const user = await this.repository.find(id)

    if(!user) throw new UserNotFound(id)

    const userBanned = user.ban()

    await this.repository.persist(userBanned)
    await this.eventBus.publish(userBanned.pullDomainEvents())
  }
}