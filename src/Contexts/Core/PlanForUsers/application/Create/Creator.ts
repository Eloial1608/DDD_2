import { PlanForUsersRepository } from '@Core/PlanForUsers/domain/PlanForUsersRepository'
import { CommunityId } from '@Core/PlanForUsers/domain/ValueObjects/CommunityId'
import { Description } from '@Core/PlanForUsers/domain/ValueObjects/Description'
import { Id } from '@Core/PlanForUsers/domain/ValueObjects/Id'
import { Name } from '@Core/PlanForUsers/domain/ValueObjects/Name'
import { Price } from '@Core/PlanForUsers/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/PlanForUsers/domain/ValueObjects/RenovatioInterval'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'

export class Creator {
  constructor (private readonly repository: PlanForUsersRepository, private readonly eventBus: EventBus) {}

  async run ( 
    id: Id,
    name: Name,
    description: Nullable<Description>,
    communityId: CommunityId,
    price: Price,
    renovationInterval: RenovationInterval,
    renovationType: OrientationType
  ) {
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
