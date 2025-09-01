import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Theme } from '../Theme'
import { Nullable } from '@Shared/domain/Nullable'
import { LayoutType } from '../ValueObjects/Layout'

type ThemeCreatedDomainEventBody = {
    readonly id: string,
    readonly communityId: Nullable<string>,
    readonly name: string,
    readonly previewPicUrl: string,
    readonly colors: string,
    readonly typography: string,
    readonly components: Nullable<string>,
    readonly layout: Nullable<LayoutType>,
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class ThemeCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.core.theme.v1.created'

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

  static {
    DomainEvent.derived.add(ThemeCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ThemeCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ThemeCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.name = params.name
    this.previewPicUrl = params.previewPicUrl
    this.colors = params.colors
    this.typography = params.typography
    this.components = params.components
    this.layout = params.layout
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
  }

  static fromAggregate (theme: Theme): ThemeCreatedDomainEvent {
    return new ThemeCreatedDomainEvent({
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
      updatedAt: theme.updatedAt.valueOf()
    })
  }

  toPrimitive (): ThemeCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ThemeCreatedDomainEventBody, eventId: string, occurredOn: Date): ThemeCreatedDomainEvent {
    return new ThemeCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
