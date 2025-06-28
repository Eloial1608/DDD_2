import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { Id } from "./ValueObjects/Id";
import { Title } from "./ValueObjects/Title";
import { Nullable } from "@Shared/domain/Nullable";
import { Description } from "./ValueObjects/Description";
import { Priority } from "./ValueObjects/Priority";
import { TaskStatus } from "./ValueObjects/TaskStatus";
import { TaskTypes } from "./ValueObjects/TaskTypes";
import { Deadline } from "./ValueObjects/Deadline";
import { Points } from "./ValueObjects/Points";
import { UserId } from "./ValueObjects/UserId";
import { CreatedAt } from "./ValueObjects/CreatedAt";
import { UpdatedAt } from "./ValueObjects/UpdatedAt";
import { DeletedAt } from "./ValueObjects/DeletedAt";
import { CommunityId } from "./ValueObjects/CommunityId";
import { ProjectId } from "./ValueObjects/ProjectId";
import { Author } from "./ValueObjects/Author";

export class Task extends AggregateRoot {
  constructor(
    readonly id: Id,
    readonly title: Title,
    readonly description: Nullable<Description>,
    readonly assignedUserId: Nullable<UserId>,
    readonly assignedUser: Nullable<Author>,
    readonly priority: Nullable<Priority>,
    readonly status: Nullable<TaskStatus>,
    readonly type: Nullable<TaskTypes>,
    readonly deadline: Nullable<Deadline>,
    readonly points: Nullable<Points>,
    readonly projectId: ProjectId,
    readonly communityId: CommunityId,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }
}
