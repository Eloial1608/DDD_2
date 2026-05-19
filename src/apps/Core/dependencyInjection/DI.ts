import fs from 'fs'
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
    const env = process.env.NODE_ENV?.trim() || 'development'
    const envServicesFile = path.resolve(process.cwd(), this.urlPrefix, `src/apps/Core/dependencyInjection/services/services_${env}.yaml`)
    const defaultServicesFile = path.resolve(process.cwd(), this.urlPrefix, 'src/apps/Core/dependencyInjection/services/services.yaml')

    if (fs.existsSync(envServicesFile)) {
      await loader.load(envServicesFile)
    } else {
      await loader.load(defaultServicesFile)
    }

    // Manually register ProcessBankOperationCommandHandler to avoid circular dependency
    const handler = this.container.get('BankOperation.Process.ProcessBankOperationCommandHandler')
    const handlerInfo = this.container.get('Shared.CommandBus.CommandHandlerInformation')
    handlerInfo.registerHandler(handler)
  }

  public resolve<T> (serviceIdentifier: string): T {
    return this.container.get<T>(serviceIdentifier)
  }

  public getContainer (): ContainerBuilder {
    return this.container
  }
}

export default DI
