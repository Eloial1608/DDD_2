import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidType } from './Errors/InvalidType'

export enum ALLOWED_TYPES {
    POST = 'post',
    GROUP = 'group',
    EVENT = 'event',
    FORUM = 'forum',
    CHAT = 'chat',
    MEDIA = 'media',
    COURSES = 'courses',
}

export class EntityType extends EnumValueObject<ALLOWED_TYPES> {
  constructor (value: ALLOWED_TYPES) {
    super(value, Object.values(ALLOWED_TYPES))
  }

  protected throwErrorForInvalidValue (value: ALLOWED_TYPES): void {
    throw new InvalidType(this)
  }
}

