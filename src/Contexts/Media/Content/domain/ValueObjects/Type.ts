import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidMediaType } from '../Errors/InvalidMediaType'

export enum AllowedMediaTypes {
    IMAGE = 'image',
    VIDEO = 'video',
    PDF = 'pdf',
    OTHER = 'other'
}

export class Type extends EnumValueObject<AllowedMediaTypes> {
  constructor (value: AllowedMediaTypes) {
    super(value, Object.values(AllowedMediaTypes))
  }

  protected throwErrorForInvalidValue (value: AllowedMediaTypes): void {
    throw new InvalidMediaType(value)
  }
}
