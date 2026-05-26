import { StringValueObject } from '@Shared/domain/ValueObjects/StringValueObject'

export class SharedPhoneNumber extends StringValueObject {
	constructor (value: string) {
		super(value)
	}
}
