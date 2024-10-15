import {ContainerBuilder, YamlFileLoader} from 'node-dependency-injection'
import path from 'path';

class DI {
  private static instance: DI;
  private container: ContainerBuilder;

  // El constructor es privado para evitar instancias múltiples
  private constructor() {
    const srcDir = path.resolve(process.cwd());
    this.container = new ContainerBuilder(true, srcDir)
  }

  // Método para obtener la instancia única del singleton
  public static getInstance(): DI {
    if (!DI.instance) {
      DI.instance = new DI();
    }
    return DI.instance;
  }

  public async initialize () {
    let loader = new YamlFileLoader(this.container)
    await loader.load(`./services/Services_${process.env.NODE_ENV}.yaml`)
  }

  // Método para resolver una dependencia
  public resolve<T>(serviceIdentifier: string): T {
    return this.container.get<T>(serviceIdentifier);
  }

  // Acceso al contenedor para casos especiales
  public getContainer(): ContainerBuilder {
    return this.container;
  }
}

export default DI;
