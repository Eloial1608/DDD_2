import { ValueObject } from '@Shared/domain/ValueObjects/ValueObject'
import { isNullOrUndefined, Nullable } from '@Shared/domain/Nullable'
import { Primitives } from '@Shared/domain/ValueObjects/Primitives'

type NewableClass<T> = new (...args: any[]) => T;

export const ValueObjectTransformer = <T extends Primitives>(ValueObjectClass: NewableClass<ValueObject<any>>) => ({
  to: (value?: Nullable<ValueObject<T>>): Nullable<T> => isNullOrUndefined(value) ? null : value.valueOf(),
  from: (value: Nullable<T>): Nullable<ValueObject<T>> => isNullOrUndefined(value) ? null : new ValueObjectClass(value.valueOf())
})
