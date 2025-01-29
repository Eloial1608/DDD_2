import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { CommunityId } from './ValueObjects/CommunityId'
import { FormCreatedDomainEvent } from './Events/FormCreatedDomainEvent'
import { FormUpdatedDomainEvent } from './Events/FormUpdatedDomainEvent'
import { FormDeletedDomainEvent } from './Events/FormDeletedDomainEvent'
import { FormContents } from './ValueObjects/FormContent'
import { Name } from './ValueObjects/Name'
import { IsActive } from './ValueObjects/IsActive'
import { CreatedBy } from './ValueObjects/CreatedBy'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { Nullable } from '@Shared/domain/Nullable'

export class Form extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly name: Name,
        readonly content: FormContents,
        readonly isActive: IsActive,
        readonly communityId: CommunityId,
        readonly createdBy: CreatedBy,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }

  static create (
    id: Id,
    name: Name,
    content: FormContents,
    isActive: IsActive,
    communityId: CommunityId,
    createdBy: CreatedBy
  ): Form {
    const form = new Form(
      id,
      name,
      content,
      isActive,
      communityId,
      createdBy,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    form.record(FormCreatedDomainEvent.fromAggregate(form))

    return form
  }

  update (
    name: Name,
    content: FormContents,
    isActive: IsActive
  ): Form {
    const form = new Form(
      this.id,
      name,
      content,
      isActive,
      this.communityId,
      this.createdBy,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    form.record(FormUpdatedDomainEvent.fromAggregate(form))

    return form
  }

  delete (): Form {
    const form = new Form(
      this.id,
      this.name,
      this.content,
      this.isActive,
      this.communityId,
      this.createdBy,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    form.record(FormDeletedDomainEvent.fromAggregate(form))

    return form
  }
}
