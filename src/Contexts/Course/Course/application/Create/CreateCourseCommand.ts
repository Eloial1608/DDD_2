import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateCourseCommand implements Command {
  constructor (
    readonly id: string,
    readonly communityId: string,
    readonly spaceId: string,
    readonly userId: string,
    readonly title: string,
    readonly bannerUrl: Nullable<string>,
    readonly isPaid: boolean,
    readonly price: Nullable<{
      value: number,
      currency: string
    }>,
    readonly startDate: Date,
    readonly endDate: Nullable<Date>,
    readonly maxStudents: number
  ) {}
}
