import { UpdateThemeCommand } from '@Core/Theme/application/Update/UpdateThemeCommand'
import { Theme } from '@Core/Theme/domain/Theme'
import { Nullable } from '@Shared/domain/Nullable'
import { LayoutType } from '../../../../../../src/Contexts/Core/Theme/domain/ValueObjects/Layout'

export class UpdateThemeCommandMother {
  static update (
    id: string,
    communityId: Nullable<string>,
    name: string,
    previewPicUrl: string,
    colors: string,
    typography: string,
    components: Nullable<string>,
    layout: Nullable<LayoutType>
  ): UpdateThemeCommand {
    return new UpdateThemeCommand(
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

  static fromAggregate (theme: Theme): UpdateThemeCommand {
    return this.update(
      theme.id.valueOf(),
      theme.communityId ? theme.communityId.valueOf() : null,
      theme.name.valueOf(),
      theme.previewPicUrl.valueOf(),
      theme.colors.valueOf(),
      theme.typography.valueOf(),
      theme.components ? theme.components.valueOf() : null,
      theme.layout
        ? {
            header: theme.layout.header.valueOf(),
            nav: theme.layout.nav.valueOf(),
            content: theme.layout.content.valueOf(),
            footer: theme.layout.footer.valueOf()
          }
        : null
    )
  }
}
