import { Section } from '@Course/Section/domain/Section'
import { CourseId } from '@Course/Section/domain/ValueObjects/CourseId'
import { CreatedAt } from '@Course/Section/domain/ValueObjects/CreatedAt'
import { Id } from '@Course/Section/domain/ValueObjects/Id'
import { Title } from '@Course/Section/domain/ValueObjects/Title'
import { TotalLessons } from '@Course/Section/domain/ValueObjects/TotalLessons'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { UpdatedAt } from '@Course/Section/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Course/Section/domain/ValueObjects/DeletedAt'
import { EntitySchema } from 'typeorm'
import { Description } from '@Course/Section/domain/ValueObjects/Description'

export const SectionSchema = new EntitySchema<Section>({
  name: 'Section',
  target: Section,
  tableName: 'section',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    courseId: {
      type: String,
      transformer: ValueObjectTransformer(CourseId)
    },
    title: {
      type: String,
      transformer: ValueObjectTransformer(Title)
    },
    description: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(Description)
    },
    totalLessons: {
      type: Number,
      transformer: ValueObjectTransformer(TotalLessons)
    },
    createdAt: {
      type: Date,
      transformer: ValueObjectTransformer(CreatedAt)
    },
    updatedAt: {
      type: Date,
      transformer: ValueObjectTransformer(UpdatedAt)
    },
    deletedAt: {
      type: Date,
      transformer: ValueObjectTransformer(DeletedAt)
    }

  },
  indices: [
    {
      name: 'IDX_SECTION_COURSE_ID',
      columns: ['courseId']
    }
  ]
})
