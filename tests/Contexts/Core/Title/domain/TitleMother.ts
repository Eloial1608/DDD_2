import { Title } from '@Core/Title/domain/Title'
import { CommunityId } from '@Core/Title/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Core/Title/domain/ValueObjects/CreatedAt'
import { Id } from '@Core/Title/domain/ValueObjects/Id'
import { Name } from '@Core/Title/domain/ValueObjects/Name'
import { TitleImageUrl } from '@Core/Title/domain/ValueObjects/TitleImageUrl'
import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'
import { UpdatedAt } from '@Threads/Thread/domain/ValueObjects/UpdatedAt'

export class TitleMother {
  static create (params: Partial<Title>): Title {
    const name = params.name ?? new Name(WordMother.random())
    const id = params.id ?? new Id(UuidMother.random())
    const titleImageUrl = params.titleImageUrl ?? new TitleImageUrl(MotherCreator.random().internet.url())
    return new Title(
      id,
      name,
      params.communityId ?? new CommunityId(UuidMother.random()),
      titleImageUrl,
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Title {
    return this.create({})
  }
}