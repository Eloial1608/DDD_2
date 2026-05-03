import { DataSource, DataSourceOptions } from 'typeorm'

export class DataSourceFactory {
  private static readonly clients: Map<string, DataSource> = new Map()

  static async createPostgres (contextName: string, config: DataSourceOptions) {
    return this.clients.get(contextName) ?? await this.createAndConnectClient(contextName, config)
  }

  private static async createAndConnectClient (contextName: string, config: DataSourceOptions): Promise<DataSource> {
    const source = new DataSource(config)
    await source.initialize()
    this.clients.set(contextName, source)
    return source
  }
}
