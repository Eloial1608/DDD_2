import { Theme } from '@Core/Theme/domain/Theme'
import { CreatedAt } from '@Core/Theme/domain/ValueObjects/CreatedAt'
import { Id } from '@Core/Theme/domain/ValueObjects/Id'
import { CommunityId } from '@Core/Theme/domain/ValueObjects/CommunityId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'
import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'
import { Name } from '@Core/Theme/domain/ValueObjects/Name'
import { PreviewPicUrl } from '@Core/Theme/domain/ValueObjects/PreviewPicUrl'
import { Colors } from '@Core/Theme/domain/ValueObjects/Colors'
import { Typography } from '@Core/Theme/domain/ValueObjects/Typography'

export class ThemeMother {
  static create (params: Partial<Theme> = {}): Theme {
    return new Theme(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.name ?? new Name(WordMother.random()),
      params.previewPicUrl ?? new PreviewPicUrl(MotherCreator.random().internet.url()),
      params.colors ?? new Colors(WordMother.random()),
      params.typography ?? new Typography(WordMother.random()),
      params.components ?? null,
      params.layout ?? null,
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new CreatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Theme {
    return this.create({})
  }
}
