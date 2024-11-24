import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidAllowedFeature } from './Errors/InvalidAllowedFeature'
import { ArrayValueObject } from '@Shared/domain/ValueObjects/ArrayValueObject'

export enum ALLOWED_FEATURES {
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

export class CommunityAllowedFeature extends EnumValueObject<ALLOWED_FEATURES> {
  constructor (value: ALLOWED_FEATURES) {
    super(value, Object.values(ALLOWED_FEATURES))
  }

  protected throwErrorForInvalidValue (value: ALLOWED_FEATURES): void {
    throw new InvalidAllowedFeature(this)
  }
}

export class CommunityAllowedFeatures extends ArrayValueObject<CommunityAllowedFeature> {
  static fromPrimitives (data: string[]): CommunityAllowedFeatures {
    return new CommunityAllowedFeatures(data.map(x => new CommunityAllowedFeature(x as ALLOWED_FEATURES)))
  }
}
