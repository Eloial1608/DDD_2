import { Iban } from "../ValueObjects/Iban"

export class IbanNotFound extends Error {
    constructor (iban: Iban) {
      super()
      this.message = `An account with iban ${iban} wasn't found`
    }
}