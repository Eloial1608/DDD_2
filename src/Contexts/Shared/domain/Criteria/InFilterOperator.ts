import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidArgumentError } from '@Shared/domain/ValueObjects/InvalidArgumentError'

export enum Operator {
  IN = 'IN',
  NOT_IN = 'NOT_IN'
}

export class InFilterOperator extends EnumValueObject<Operator> {
  constructor (value: Operator) {
    super(value, Object.values(Operator))
  }

  static fromValue (value: string): InFilterOperator {
    switch (value) {
      case Operator.IN: return new InFilterOperator(Operator.IN)
      case Operator.NOT_IN: return new InFilterOperator(Operator.NOT_IN)
      default: throw new InvalidArgumentError(`The in-filter operator ${value} is invalid`)
    }
  }

  protected throwErrorForInvalidValue (value: Operator): void {
    throw new InvalidArgumentError(`The in-filter operator ${value} is invalid`)
  }
}
