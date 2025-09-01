import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Theme } from '../Theme'
import { Nullable } from '@Shared/domain/Nullable'
import { LayoutType } from '../ValueObjects/Layout'

type ThemeDeletedDomainEventBody = {
    readonly id: string,
    readonly communityId: Nullable<string>
    readonly name: string
    readonly previewPicUrl: string
    readonly colors: string
    readonly typography: string
    readonly components: Nullable<string>
    readonly layout: Nullable<LayoutType>
    readonly createdAt: Date
    readonly deletedAt: Date
}

export class ThemeDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.core.theme.v1.deleted'

  readonly id: string
  readonly communityId: Nullable<string>
  readonly name: string
  readonly previewPicUrl: string
  readonly colors: string
  readonly typography: string
  readonly components: Nullable<string>
  readonly layout: Nullable<LayoutType>
  readonly createdAt: Date
  readonly deletedAt: Date

  static {
    DomainEvent.derived.add(ThemeDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: ThemeDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ThemeDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.name = params.name
    this.previewPicUrl = params.previewPicUrl
    this.colors = params.colors
    this.typography = params.typography
    this.components = params.components
    this.layout = params.layout
    this.createdAt = params.createdAt
    this.deletedAt = params.deletedAt
  }

  static fromAggregate (theme: Theme): ThemeDeletedDomainEvent {
    return new ThemeDeletedDomainEvent({
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
      deletedAt: theme.deletedAt!.valueOf()

    })
  }

  toPrimitive (): ThemeDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ThemeDeletedDomainEventBody, eventId: string, occurredOn: Date): ThemeDeletedDomainEvent {
    return new ThemeDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
