import { FirebaseConfigResponse } from './ClientFactory'

export abstract class FirebaseRepository {
  constructor (protected readonly connection: Promise<FirebaseConfigResponse>) {}

  protected async auth () {
    return (await this.connection)()
  }
}
