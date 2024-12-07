import { UserAlreadyExistsById } from '@Core/User/domain/Errors/UserAlreadyExistsById'
import { UserAlreadyExistsByEmail } from '@Core/User/domain/Errors/UserAlreadyExistsBySuffix'
import { User } from '@Core/User/domain/User'
import { UserRepository } from '@Core/User/domain/UserRepository'
import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'
import { Email } from '@Core/User/domain/ValueObjects/Email'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Creator {
  constructor (private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

  async run (id: Id, name: Name, email: Email, communityId: CommunityId) {
    await this.checkIfUserExists(id, email, communityId)

    const user = await User.create(
      id,
      name,
      Username.createFromNonSlug(
        `${name.valueOf()}-${id.valueOf().substring(0, id.valueOf().indexOf('-') - 1)}`
      ),
      email,
      communityId
    )

    await this.repository.persist(user)

    await this.eventBus.publish(user.pullDomainEvents())
  }

  private async checkIfUserExists (id: Id, email: Email, communityId: CommunityId) {
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
  }
}
