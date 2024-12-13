import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { SpacesDeleteController } from '@Apps/Core/controllers/Space/SpacesDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SpacesDeleteController>('Apps.Core.Controllers.SpacesDeleteController')
  router.delete('/v1/spaces/:id', (req: Request, res: Response) => controller.run(req, res))
}
