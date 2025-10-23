import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Project } from '../Project'

type ProjectDeletedDomainEventBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly spaceId: string
}

export class ProjectDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Project.project.v1.deleted'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly spaceId: string

  static {
    DomainEvent.derived.add(ProjectDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: ProjectDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ProjectDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.spaceId = params.spaceId
  }

  static fromAggregate (project: Project): ProjectDeletedDomainEvent {
    return new ProjectDeletedDomainEvent({
      id: project.id.valueOf(),
      communityId: project.communityId.valueOf(),
      userId: project.userId.valueOf(),
      spaceId: project.spaceId.valueOf()
    })
  }

  toPrimitive (): ProjectDeletedDomainEvent {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ProjectDeletedDomainEventBody, eventId: string, occurredOn: Date): ProjectDeletedDomainEvent {
    return new ProjectDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
