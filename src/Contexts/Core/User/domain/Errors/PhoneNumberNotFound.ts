import { PhoneNumber } from '../ValueObjects/PhoneNumber'

export class PhoneNumberNotFound extends Error {
  constructor (phoneNumber: PhoneNumber) {
    super()
    this.message = `A user with phone number ${phoneNumber} wasn't found`
  }
}
