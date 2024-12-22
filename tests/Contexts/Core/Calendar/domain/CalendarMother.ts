import { Calendar } from '@Core/Calendar/domain/Calendar'
import { CommunityId } from '@Core/Calendar/domain/ValueObjects/CommunityId'
import { Content } from '@Core/Calendar/domain/ValueObjects/Content'
import { CreatedAt } from '@Core/Calendar/domain/ValueObjects/CreatedAt'
import { DateAt } from '@Core/Calendar/domain/ValueObjects/DateAt'
import { Id } from '@Core/Calendar/domain/ValueObjects/Id'
import { UpdatedAt } from '@Core/Calendar/domain/ValueObjects/UpdatedAt'
import { UserIds } from '@Core/Calendar/domain/ValueObjects/UserIds'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class CalendarMother {
  static create (params: Partial<Calendar>): Calendar {
    return new Calendar(
      params.id ?? new Id(UuidMother.random()),
      params.dateAt ?? new DateAt(new Date()),
      params.userIds ?? new UserIds([UuidMother.random()]),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.content ?? new Content(WordMother.random()),
      params.entityId ?? null,
      params.entityType ?? null,
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date())
    )
  }

  static random (): Calendar {
    return this.create({})
  }
}
