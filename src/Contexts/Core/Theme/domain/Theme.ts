import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { ThemeDeletedDomainEvent } from './Events/ThemeDeletedDomainEvent'
import { ThemeCreatedDomainEvent } from './Events/ThemeCreatedDomainEvent'
import { Nullable } from '../../../Shared/domain/Nullable'
import { Components } from './ValueObjects/Components'
import { Typography } from './ValueObjects/Typography'
import { Colors } from './ValueObjects/Colors'
import { PreviewPicUrl } from './ValueObjects/PreviewPicUrl'
import { Name } from './ValueObjects/Name'
import { CommunityId } from './ValueObjects/CommunityId'
import { Layout } from './ValueObjects/Layout'
import { ThemeUpdatedDomainEvent } from './Events/ThemeUpdatedDomainEvent'

export class Theme extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: Nullable<CommunityId>,
        readonly name: Name,
        readonly previewPicUrl: PreviewPicUrl,
        readonly colors: Colors,
        readonly typography: Typography,
        readonly components: Nullable<Components>,
        readonly layout: Nullable<Layout>
  ) {
    super()
  }

  static create (
    id: Id,
    communityId: Nullable<CommunityId>,
    name: Name,
    previewPicUrl: PreviewPicUrl,
    colors: Colors,
    typography: Typography,
    components: Nullable<Components>,
    layout: Nullable<Layout>
  ) {
    const theme = new Theme(
      id,
      communityId,
      name,
      previewPicUrl,
      colors,
      typography,
      components,
      layout
    )

    theme.record(ThemeCreatedDomainEvent.fromAggregate(theme))

    return theme
  }

  delete () {
    const theme = new Theme(
      this.id,
      this.communityId,
      this.name,
      this.previewPicUrl,
      this.colors,
      this.typography,
      this.components,
      this.layout
    )

    theme.record(ThemeDeletedDomainEvent.fromAggregate(theme))

    return theme
  }

  update (
    id: Id,
    communityId: Nullable<CommunityId>,
    name: Name,
    previewPicUrl: PreviewPicUrl,
    colors: Colors,
    typography: Typography,
    components: Nullable<Components>,
    layout: Nullable<Layout>
  ): Theme {
    const theme = new Theme(
      id,
      communityId,
      name,
      previewPicUrl,
      colors,
      typography,
      components,
      layout
    )

    theme.record(ThemeUpdatedDomainEvent.fromAggregate(theme))

    return theme
  }
}
