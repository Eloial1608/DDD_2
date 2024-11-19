import { EnvironmentArranger } from '@Tests/Contexts/Shared/infrastructure/Arranger/EnvironmentArranger'
import { DataSource } from 'typeorm'

export class TypeOrmEnvironmentArranger extends EnvironmentArranger {
  constructor (private readonly connection: Promise<DataSource>) {
    super()
  }

  async arrange (): Promise<void> {
    await this.cleanDatabase()
  }

  private async cleanDatabase (): Promise<void> {
    const entities = (await this.connection).entityMetadatas

    try {
      for (const entity of entities) {
        const repository = (await this.connection).getRepository(entity.name)
        await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE;`)
      }
    } catch (error) {
      throw new Error(`Unable to clean test database: ${error}`)
    }
  }

  async close (): Promise<void> {
    await (await this.connection).destroy()
  }
}
