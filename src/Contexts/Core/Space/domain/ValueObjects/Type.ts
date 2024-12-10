import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidType } from '../Errors/InvalidType'

export enum AllowedTypes {
    POST = 'post',
    GROUP = 'group',
    EVENT = 'event',
    FORUM = 'forum',
    CHAT = 'chat',
    MEDIA = 'media',
    COURSES = 'courses',
}

export class Type extends EnumValueObject<AllowedTypes> {
  constructor (value: AllowedTypes) {
    super(value, Object.values(AllowedTypes))
  }

  protected throwErrorForInvalidValue (): void {
    throw new InvalidType(this)
  }
}
