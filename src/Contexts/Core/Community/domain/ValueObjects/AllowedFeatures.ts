import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidAllowedFeature } from '../Errors/InvalidAllowedFeature'
import { ArrayValueObject } from '@Shared/domain/ValueObjects/ArrayValueObject'

enum ALLOWED_FEATURES {
    POST = 'post',
    COURSE = 'course',
    EVENT = 'event',
    CHAT = 'chat',
    FORUM = 'forum',
    MEDIA = 'media',
    FORM = 'form',
    PAYMENT = 'payment',
    CUSTOM_DOMAIN = 'customDomain',
    WORKFLOW = 'workflow'
}

export class AllowedFeature extends EnumValueObject<ALLOWED_FEATURES> {
  constructor (value: ALLOWED_FEATURES) {
    super(value, Object.values(ALLOWED_FEATURES))
  }

  protected throwErrorForInvalidValue (value: ALLOWED_FEATURES): void {
    throw new InvalidAllowedFeature(this)
  }
}

export class AllowedFeatures extends ArrayValueObject<AllowedFeature> {
  static fromPrimitives (data: string[]): AllowedFeatures {
    return new AllowedFeatures(data.map(x => new AllowedFeature(x as ALLOWED_FEATURES)))
  }
}
