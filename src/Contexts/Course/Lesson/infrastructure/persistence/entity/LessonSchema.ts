import { Lesson } from '@Course/Lesson/domain/Lesson'
import { Content } from '@Course/Lesson/domain/ValueObjects/Content'
import { CreatedAt } from '@Course/Lesson/domain/ValueObjects/CreatedAt'
import { DeletedAt } from '@Course/Lesson/domain/ValueObjects/DeletedAt'
import { Id } from '@Course/Lesson/domain/ValueObjects/Id'
import { SectionId } from '@Course/Lesson/domain/ValueObjects/SectionId'
import { Title } from '@Course/Lesson/domain/ValueObjects/Title'
import { UpdatedAt } from '@Course/Lesson/domain/ValueObjects/UpdatedAt'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

export const Lessonchema = new EntitySchema<Lesson>({
  name: 'Lesson',
  target: Lesson,
  tableName: 'lesson',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    sectionId: {
      type: String,
      transformer: ValueObjectTransformer(SectionId)
    },
    title: {
      type: String,
      transformer: ValueObjectTransformer(Title)
    },
    content: {
      type: String,
      transformer: ValueObjectTransformer(Content)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    },
    updatedAt: {
      type: Date,
      updateDate: true,
      transformer: ValueObjectTransformer(UpdatedAt)
    },
    deletedAt: {
      type: Date,
      deleteDate: true,
      transformer: ValueObjectTransformer(DeletedAt)
    }
  },
  indices: [
    {
      name: 'IDX_LESSON_SECTION_ID',
      columns: ['sectionId']
    }
  ]
})
