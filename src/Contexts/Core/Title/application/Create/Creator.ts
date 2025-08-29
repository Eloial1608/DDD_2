import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { TitleImageUrl } from '@Core/Title/domain/ValueObjects/TitleImageUrl'
import { Title } from '@Core/Title/domain/Title'
import { TitleRepository } from '@Core/Title/domain/TitleRepository'
import { Nullable } from '@Shared/domain/Nullable'
import { TitleAlreadyExistsById } from '@Core/Title/domain/Errors/TitleAlreadyExistsById'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { TitleAlreadyExistsByName } from '@Core/Title/domain/Errors/TitleAlreadyExistsByName'

export class Creator {
  constructor (private readonly repository: TitleRepository, private readonly eventBus: EventBus) {}

  async run (id: Id, name: Name, communityId: CommunityId, titleImageUrl: Nullable<TitleImageUrl>) {
    await this.checkIfTitleExists(id, name, communityId)

    const title = await Title.create(
      id,
      name,
      communityId,
      titleImageUrl,
    )

    await this.repository.persist(title)

    await this.eventBus.publish(title.pullDomainEvents())
  }

  private async checkIfTitleExists (id: Id, name: Name, communityId: CommunityId) {
    const existingTitleById = await this.repository.find(id)

    if (existingTitleById) throw new TitleAlreadyExistsById(existingTitleById.id)

    const existingTitleByName = (await this.repository.search(
      new Criteria(
        new Filters(
          [
            Filter.simple('name', '=', name.valueOf()),
            Filter.simple('communityId', '=', communityId.valueOf())]
        )
      )
    )).pop()

    if (existingTitleByName) throw new TitleAlreadyExistsByName(existingTitleByName.name)

  }
}