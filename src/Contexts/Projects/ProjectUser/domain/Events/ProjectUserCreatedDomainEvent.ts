import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { ProjectUser } from '../ProjectUser'

type ProjectUserCreatedDomainEventBody = {
    readonly id: string
    readonly userId: string
    readonly projectId: string
    readonly createdAt: Date
}

export class ProjectUserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.projects.project-user.v1.created'

  readonly id: string
  readonly userId: string
  readonly projectId: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(ProjectUserCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ProjectUserCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(ProjectUserCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.userId = params.userId
    this.projectId = params.projectId
    this.createdAt = params.createdAt
  }

  static fromAggregate (courseUser: ProjectUser): ProjectUserCreatedDomainEvent {
    return new ProjectUserCreatedDomainEvent({
      id: courseUser.id.valueOf(),
      userId: courseUser.userId.valueOf(),
      projectId: courseUser.projectId.valueOf(),
      createdAt: courseUser.createdAt.valueOf()
    })
  }

  toPrimitive (): ProjectUserCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ProjectUserCreatedDomainEventBody, eventId: string, occurredOn: Date): ProjectUserCreatedDomainEvent {
    return new ProjectUserCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
