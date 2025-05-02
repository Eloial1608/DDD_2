import { Lesson } from '@Course/Lesson/domain/Lesson'
import { Content } from '@Course/Lesson/domain/ValueObjects/Content'
import { CreatedAt } from '@Course/Lesson/domain/ValueObjects/CreatedAt'
import { Id } from '@Course/Lesson/domain/ValueObjects/Id'
import { Order } from '@Course/Lesson/domain/ValueObjects/Order'
import { SectionId } from '@Course/Lesson/domain/ValueObjects/SectionId'
import { Title } from '@Course/Lesson/domain/ValueObjects/Title'
import { UpdatedAt } from '@Course/Lesson/domain/ValueObjects/UpdatedAt'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class LessonMother {
  static create (params: Partial<Lesson>):Lesson {
    return new Lesson(
      params.id ?? new Id(UuidMother.random()),
      params.sectionId ?? new SectionId(UuidMother.random()),
      params.title ?? new Title(WordMother.random()),
      params.content ?? new Content(WordMother.random()),
      params.order ?? new Order(0),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Lesson {
    return this.create({})
  }
}
