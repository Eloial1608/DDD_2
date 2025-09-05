import { ThemeNotFound } from '@Core/Theme/domain/Errors/ThemeNotFound'
import { ThemeRepository } from '@Core/Theme/domain/ThemeRepository'
import { CommunityId } from '@Core/Theme/domain/ValueObjects/CommunityId'
import { Id } from '@Core/Theme/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { Name } from '@Core/Theme/domain/ValueObjects/Name'
import { PreviewPicUrl } from '@Core/Theme/domain/ValueObjects/PreviewPicUrl'
import { Colors } from '@Core/Theme/domain/ValueObjects/Colors'
import { Typography } from '@Core/Theme/domain/ValueObjects/Typography'
import { Components } from '@Core/Theme/domain/ValueObjects/Components'
import { Layout } from '@Core/Theme/domain/ValueObjects/Layout'

export class Updater {
  constructor (private readonly repository: ThemeRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: Nullable<CommunityId>,
    name: Name,
    previewPicUrl: PreviewPicUrl,
    colors: Colors,
    typography:Typography,
    components: Nullable<Components>,
    layout: Nullable<Layout>
  ) {
    const theme = await this.repository.find(id)

    if (!theme) throw new ThemeNotFound(id)

    const updatedTheme = theme.update(
      id,
      communityId,
      name,
      previewPicUrl,
      colors,
      typography,
      components,
      layout
    )

    await this.repository.persist(updatedTheme)
    await this.eventBus.publish(updatedTheme.pullDomainEvents())
  }
}
