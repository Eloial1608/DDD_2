import { Nullable } from '@Shared/domain/Nullable'
import { Theme } from '../domain/Theme'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { LayoutType } from '../domain/ValueObjects/Layout'

export type ThemeResponseBody = {
    readonly id: string
    readonly communityId: Nullable<string>
    readonly name: string
    readonly previewPicUrl: string
    readonly colors: string
    readonly typography: string
    readonly components: Nullable<string>
    readonly layout: Nullable<LayoutType>
    readonly createdAt: Date
    readonly updatedAt: Date
    readonly deletedAt: Nullable<Date>
}

export class ThemeResponse implements QueryResponse<ThemeResponseBody> {
  response: ThemeResponseBody

  constructor (theme: Theme) {
    this.response = {
      id: theme.id.valueOf(),
      communityId: theme.communityId ? theme.communityId.valueOf() : null,
      name: theme.name.valueOf(),
      previewPicUrl: theme.previewPicUrl.valueOf(),
      colors: theme.colors.valueOf(),
      typography: theme.typography.valueOf(),
      components: theme.components ? theme.components.valueOf() : null,
      layout: theme.layout
        ? {
            header: theme.layout.header.valueOf(),
            nav: theme.layout.nav.valueOf(),
            footer: theme.layout.footer.valueOf(),
            content: theme.layout.content.valueOf()
          }
        : null,
      createdAt: theme.createdAt.valueOf(),
      updatedAt: theme.updatedAt.valueOf(),
      deletedAt: theme.deletedAt ? theme.deletedAt.valueOf() : null
    }
  }
}
