import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection'
import path from 'path'

interface IDI {
  initialize (): Promise<void>
  resolve<T> (serviceIdentifier: string): T
  getContainer (): ContainerBuilder
}
class DI {
  private static instance: IDI
  private container: ContainerBuilder
  private urlPrefix = ['staging', 'production'].includes(process.env.NODE_ENV!) ? 'dist/' : ''

  private constructor () {
    const srcDir = path.resolve(process.cwd(), this.urlPrefix)
    this.container = new ContainerBuilder(true, srcDir)
  }

  public static getInstance (): IDI {
    if (!DI.instance) {
      DI.instance = new DI()
    }
    return DI.instance
  }

  public async initialize () {
    const loader = new YamlFileLoader(this.container)

    await loader.load(path.resolve(process.cwd(), this.urlPrefix, `src/apps/Core/dependencyInjection/services/services_${process.env.NODE_ENV}.yaml`))
  }

  public resolve<T> (serviceIdentifier: string): T {
    return this.container.get<T>(serviceIdentifier)
  }

  public getContainer (): ContainerBuilder {
    return this.container
  }
}

export default DI
