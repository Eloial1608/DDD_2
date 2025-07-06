import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { ProjectUser } from '../ProjectUser'

type ProjectUserDeletedDomainEventBody = {
    readonly id: string
    readonly projectId: string
    readonly userId: string
}

export class ProjectUserDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.projects.project-user.v1.deleted'

  readonly id: string
  readonly projectId: string
  readonly userId: string

  static {
    DomainEvent.derived.add(ProjectUserDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: ProjectUserDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ProjectUserDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.projectId = params.projectId
    this.userId = params.userId
  }

  static fromAggregate (projectUser: ProjectUser): ProjectUserDeletedDomainEvent {
    return new ProjectUserDeletedDomainEvent({
      id: projectUser.id.valueOf(),
      projectId: projectUser.projectId.valueOf(),
      userId: projectUser.userId.valueOf()

    })
  }

  toPrimitive (): ProjectUserDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ProjectUserDeletedDomainEventBody, eventId: string, occurredOn: Date): ProjectUserDeletedDomainEvent {
    return new ProjectUserDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
