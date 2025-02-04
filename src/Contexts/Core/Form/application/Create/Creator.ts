import { Id } from '@Core/Form/domain/ValueObjects/Id'
import { FormRepository } from '@Core/Form/domain/FormRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Form } from '@Core/Form/domain/Form'
import { Name } from '@Core/Form/domain/ValueObjects/Name'
import { FormContents } from '@Core/Form/domain/ValueObjects/FormContent'
import { CommunityId } from '@Core/Form/domain/ValueObjects/CommunityId'
import { CreatedBy } from '@Core/Form/domain/ValueObjects/CreatedBy'
import { IsActive } from '@Core/Form/domain/ValueObjects/IsActive'
import { FormAlreadyExists } from '@Core/Form/domain/Errors/FormAlreadyExists'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { CommunityAlreadyHasForm } from '@Core/Form/domain/Errors/CommunityAlreadyHasForm'

type Params = {
    id: Id
    name: Name
    content: FormContents
    communityId: CommunityId
    createdBy: CreatedBy
    isActive: IsActive
}

export class Creator {
  constructor (private readonly repository: FormRepository, private readonly eventBus: EventBus) {}

  async run (params: Params): Promise<void> {
    await this.checkIfFormAlreadyExists(params.id, params.communityId)

    const form = Form.create(
      params.id,
      params.name,
      params.content,
      params.isActive,
      params.communityId,
      params.createdBy
    )

    await this.repository.persist(form)

    await this.eventBus.publish(form.pullDomainEvents())
  }

  private async checkIfFormAlreadyExists (id: Id, communityId: CommunityId) {
    if (await this.repository.find(id)) throw new FormAlreadyExists(id)

    const criteria = new Criteria(
      new Filters([
        Filter.simple('communityId', '=', communityId.valueOf())
      ])
    )

    if ((await this.repository.search(criteria)).pop()) throw new CommunityAlreadyHasForm(communityId)
  }
}
