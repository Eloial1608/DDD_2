import { UserAlreadyExistsById } from '@Core/User/domain/Errors/UserAlreadyExistsById'
import { UserAlreadyExistsByEmail } from '@Core/User/domain/Errors/UserAlreadyExistsBySuffix'
import { User } from '@Core/User/domain/User'
import { UserRepository } from '@Core/User/domain/UserRepository'
import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'
import { Email } from '@Core/User/domain/ValueObjects/Email'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { IsAdmin } from '@Core/User/domain/ValueObjects/IsAdmin'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { IsOwner } from '../../domain/ValueObjects/IsOwner'
import { MainId } from '@Core/User/domain/ValueObjects/MainId'

export class Creator {
  constructor (private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

  async run (id: Id, mainId: MainId, name: Name, email: Email, communityId: CommunityId, isAdmin: IsAdmin, isOwner: IsOwner) {
    await this.checkIfUserExists(id, email, communityId, mainId)

    const user = await User.create(
      id,
      mainId,
      name,
      Username.createFromNonSlug(
        `${name.valueOf()}-${id.valueOf().substring(0, id.valueOf().indexOf('-') - 1)}`
      ),
      email,
      communityId,
      isAdmin,
      isOwner
    )

    await this.repository.persist(user)

    await this.eventBus.publish(user.pullDomainEvents())
  }

  private async checkIfUserExists (id: Id, email: Email, communityId: CommunityId, mainId: MainId) {
    const existingUserById = await this.repository.find(id)

    if (existingUserById) throw new UserAlreadyExistsById(existingUserById.id)

    const existingUserByEmail = (await this.repository.search(
      new Criteria(
        new Filters(
          [
            Filter.simple('communityId', '=', communityId.valueOf()),
            Filter.simple('email', '=', email.valueOf())
          ]
        )
      )
    )).pop()

    if (existingUserByEmail) throw new UserAlreadyExistsByEmail(existingUserByEmail.email)

    const existingUserByMainId = (await this.repository.search(
      new Criteria(
        new Filters(
          [
            Filter.simple('communityId', '=', communityId.valueOf()),
            Filter.simple('mainId', '=', mainId.valueOf())
          ]
        )
      )
    )).pop()

    if (existingUserByMainId) throw new UserAlreadyExistsById(existingUserByMainId.mainId)
  }
}
