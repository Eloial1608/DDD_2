import { Form } from '@Core/Form/domain/Form'
import { CommunityId } from '@Core/Form/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Core/Form/domain/ValueObjects/CreatedAt'
import { CreatedBy } from '@Core/Form/domain/ValueObjects/CreatedBy'
import { FormContents } from '@Core/Form/domain/ValueObjects/FormContent'
import { Id } from '@Core/Form/domain/ValueObjects/Id'
import { IsActive } from '@Core/Form/domain/ValueObjects/IsActive'
import { Name } from '@Core/Form/domain/ValueObjects/Name'
import { UpdatedAt } from '@Core/Form/domain/ValueObjects/UpdatedAt'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class FormMother {
  static create (params: Partial<Form>): Form {
    return new Form(
      params.id ?? new Id(UuidMother.random()),
      params.name ?? new Name(WordMother.random()),
      params.content ?? FormContents.fromPrimitives([]),
      params.isActive ?? new IsActive(true),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.createdBy ?? new CreatedBy(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Form {
    return this.create({})
  }
}
