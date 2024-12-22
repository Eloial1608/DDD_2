import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidEntityType } from '../Errors/InvalidEntityType'

export enum AllowedEntityTypes {
    EVENT = 'EVENT',
    COURSE = 'COURSE'
}

export class EntityType extends EnumValueObject<AllowedEntityTypes> {
  constructor (value: AllowedEntityTypes) {
    super(value, Object.values(AllowedEntityTypes))
  }

  protected throwErrorForInvalidValue (value: string): void {
    throw new InvalidEntityType(value)
  }
}
