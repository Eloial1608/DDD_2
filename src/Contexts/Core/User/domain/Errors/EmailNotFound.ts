import { Email } from "../ValueObjects/Email"

export class EmailNotFound extends Error {
    constructor (email: Email) {
      super()
      this.message = `A user with id ${email} wasn't found`
    }
}