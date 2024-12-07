import { FindAccountByIdQueryHandler } from '@Core/Account/application/FindById/FindAccountByIdQueryHandler'
import { FinderById } from '@Core/Account/application/FindById/FinderById'
import { AccountRepositoryMock } from '../../__mocks__/AccountRepositoryMock'
import { AccountMother } from '../../domain/AccountMother'
import { FindAccountByIdQuery } from '@Core/Account/application/FindById/FindAccountByIdQuery'
import { AccountResponse } from '@Core/Account/application/AccountResponse'
import { AccountNotFound } from '@Core/Account/domain/Errors/AccountNotFound'

let repository: AccountRepositoryMock
let finder: FinderById
let handler: FindAccountByIdQueryHandler

describe('FindAccountByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new AccountRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindAccountByIdQueryHandler(finder)
  })

  test('Return a account', async () => {
    const account = AccountMother.random()

    repository.returnOnFind(account)

    const query = new FindAccountByIdQuery(account.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(account.id)
    expect(response).toEqual(new AccountResponse(account))
  })

  test('Fail if a account doesnt exists', async () => {
    const account = AccountMother.random()

    const query = new FindAccountByIdQuery(account.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(AccountNotFound)
  })
})
