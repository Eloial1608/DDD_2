import { Section } from '@Course/Section/domain/Section'
import { CourseId } from '@Course/Section/domain/ValueObjects/CourseId'
import { CreatedAt } from '@Course/Section/domain/ValueObjects/CreatedAt'
import { Id } from '@Course/Section/domain/ValueObjects/Id'
import { Order } from '@Course/Section/domain/ValueObjects/Order'
import { Title } from '@Course/Section/domain/ValueObjects/Title'
import { TotalLessons } from '@Course/Section/domain/ValueObjects/TotalLessons'
import { UpdatedAt } from '@Course/Section/domain/ValueObjects/UpdatedAt'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class SectionMother {
  static create (params: Partial<Section>):Section {
    return new Section(
      params.id ?? new Id(UuidMother.random()),
      params.courseId ?? new CourseId(UuidMother.random()),
      params.title ?? new Title(WordMother.random()),
      params.description ?? null,
      params.totalLessons ?? new TotalLessons(0),
      params.order ?? new Order(0),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Section {
    return this.create({})
  }
}
