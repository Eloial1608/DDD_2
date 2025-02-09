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

  // El constructor es privado para evitar instancias múltiples
  private constructor () {
    const srcDir = path.resolve(process.cwd(), this.urlPrefix)
    this.container = new ContainerBuilder(true, srcDir)
  }

  // Método para obtener la instancia única del singleton
  public static getInstance (): IDI {
    if (!DI.instance) {
      DI.instance = new DI()
    }
    return DI.instance
  }

  public async initialize () {
    const loader = new YamlFileLoader(this.container)

    await loader.load(path.resolve(process.cwd(), this.urlPrefix, `src/apps/Course/dependencyInjection/services/services_${process.env.NODE_ENV}.yaml`))
  }

  // Método para resolver una dependencia
  public resolve<T> (serviceIdentifier: string): T {
    return this.container.get<T>(serviceIdentifier)
  }

  // Acceso al contenedor para casos especiales
  public getContainer (): ContainerBuilder {
    return this.container
  }
}

export default DI
