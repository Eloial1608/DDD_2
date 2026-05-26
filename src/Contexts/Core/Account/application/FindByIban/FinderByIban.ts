import { AccountResponse } from '../AccountResponse'
import { AccountRepository } from '../../domain/AccountRepository'
import { IbanNotFound } from '../../domain/Errors/IbanNotFound'
import { Iban } from '../../domain/ValueObjects/Iban'

export class FinderByIban {
  constructor (private readonly repository: AccountRepository) {}

  async find (iban: string): Promise<AccountResponse> {
    const account = await this.repository.findByIban(iban)

    if (!account) throw new IbanNotFound(new Iban(iban))

    return new AccountResponse(account)
  }
}