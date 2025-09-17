import { LayoutType } from '@Core/Shared/domain/Theme/LayoutType'
import { ValueObject } from '@Shared/domain/ValueObjects/ValueObject'

export type ThemeType = {
  id: string,
  communityId: string | null,
  name: string,
  previewPicUrl: string,
  colors: string,
  typography: string,
  components: string | null,
  layout: LayoutType | null
}

export class CurrentTheme extends ValueObject<ThemeType> {}
