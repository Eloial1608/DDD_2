import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { Theme } from '../Theme'
import { LayoutType } from '../ValueObjects/Layout'

type ThemeUpdatedDomainEventBody = {
    readonly id: string,
    readonly communityId: Nullable<string>,
    readonly name: string,
    readonly previewPicUrl: string,
    readonly colors: string,
    readonly typography: string,
    readonly components: Nullable<string>,
    readonly layout: Nullable<LayoutType>
}

export class ThemeUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.themes.theme.v1.updated'

  readonly id: string
  readonly communityId: Nullable<string>
  readonly name: string
  readonly previewPicUrl: string
  readonly colors: string
  readonly typography: string
  readonly components: Nullable<string>
  readonly layout: Nullable<LayoutType>

  static {
    DomainEvent.derived.add(ThemeUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ThemeUpdatedDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(ThemeUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.name = params.name
    this.previewPicUrl = params.previewPicUrl
    this.colors = params.colors
    this.typography = params.typography
    this.components = params.components
    this.layout = params.layout
  }

  static fromAggregate (theme: Theme): ThemeUpdatedDomainEvent {
    return new ThemeUpdatedDomainEvent({
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
        : null
    })
  }

  toPrimitive (): ThemeUpdatedDomainEvent {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ThemeUpdatedDomainEventBody, eventId: string, occurredOn: Date): ThemeUpdatedDomainEvent {
    return new ThemeUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
