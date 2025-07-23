import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidActionType } from '../Errors/InvalidActionType'

export enum AvailableActionType {
  CREATE_EVENT = 'create_event',
  JOIN_SPACE = 'join_space',
  JOIN_SUBCOMMUNITY = 'join_subcommunity'
}

export class ActionType extends EnumValueObject<AvailableActionType> {
  constructor (value: AvailableActionType) {
    super(value, Object.values(AvailableActionType))
  }

  protected throwErrorForInvalidValue (value: AvailableActionType): void {
    throw new InvalidActionType(value)
  }
}
