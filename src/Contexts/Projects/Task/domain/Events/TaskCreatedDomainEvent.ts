import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Task } from '../Task'
import { Nullable } from '@Shared/domain/Nullable'

type TaskCreatedDomainEventBody = {
    readonly id: string,
    readonly title: string,
    readonly description: Nullable<string>,
    readonly assignedUserId: Nullable<string>,
    readonly priority: Nullable<number>,
    readonly status: Nullable<string>,
    readonly type: Nullable<string>,
    readonly deadline: Nullable<Date>,
    readonly points: Nullable<number>,
    readonly projectId: string,
    readonly communityId: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly deletedAt: Nullable<Date>
}

export class TaskCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.tasks.task.v1.created'

  readonly id: string
  readonly title: string
  readonly description: Nullable<string>
  readonly assignedUserId: Nullable<string>
  readonly priority: Nullable<number>
  readonly status: Nullable<string>
  readonly type: Nullable<string>
  readonly deadline: Nullable<Date>
  readonly points: Nullable<number>
  readonly projectId: string
  readonly communityId: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly deletedAt: Nullable<Date>

  static {
    DomainEvent.derived.add(TaskCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: TaskCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(TaskCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.title = params.title
    this.description = params.description
    this.assignedUserId = params.assignedUserId
    this.priority = params.priority
    this.status = params.status
    this.type = params.type
    this.deadline = params.deadline
    this.points = params.points
    this.projectId = params.projectId
    this.communityId = params.communityId
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.deletedAt = params.deletedAt
  }

  static fromAggregate (task: Task): TaskCreatedDomainEvent {
    return new TaskCreatedDomainEvent({
      id: task.id.valueOf(),
      title: task.title.valueOf(),
      description: task.description?.valueOf(),
      assignedUserId: task.assignedUserId?.valueOf(),
      priority: task.priority?.valueOf(),
      status: task.status?.valueOf(),
      type: task.type?.valueOf(),
      deadline: task.deadline?.valueOf(),
      points: task.points?.valueOf(),
      projectId: task.projectId.valueOf(),
      communityId: task.communityId.valueOf(),
      createdAt: task.createdAt.valueOf(),
      updatedAt: task.updatedAt.valueOf(),
      deletedAt: task.deletedAt?.valueOf()

    })
  }

  toPrimitive (): TaskCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: TaskCreatedDomainEventBody, eventId: string, occurredOn: Date): TaskCreatedDomainEvent {
    return new TaskCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
