import { CreateThemeCommand } from '@Core/Theme/application/Create/CreateThemeCommand'
import { Theme } from '@Core/Theme/domain/Theme'
import { LayoutType } from '@Core/Theme/domain/ValueObjects/Layout'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateThemeCommandMother {
  static create (
    id: string,
    communityId: string,
    name: string,
    previewPicUrl: string,
    colors: string,
    typography: string,
    components: Nullable<string>,
    layout: Nullable<LayoutType>
  ): CreateThemeCommand {
    return new CreateThemeCommand(
      id,
      communityId,
      name,
      previewPicUrl,
      colors,
      typography,
      components,
      layout
    )
  }

  static fromAggregate (theme: Theme): CreateThemeCommand {
    return this.create(
      theme.id.valueOf(),
      theme.communityId ? theme.communityId.valueOf() : '',
      theme.name.valueOf(),
      theme.previewPicUrl.valueOf(),
      theme.colors.valueOf(),
      theme.typography.valueOf(),
      theme.components ? theme.components.valueOf() : null,
      theme.layout
        ? {
            nav: theme.layout.nav.valueOf(),
            header: theme.layout.header.valueOf(),
            footer: theme.layout.footer.valueOf(),
            content: theme.layout.content.valueOf()
          }
        : null
    )
  }
}
