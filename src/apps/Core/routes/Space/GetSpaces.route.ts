import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { SpacesGetController } from '@Apps/Core/controllers/Space/SpacesGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SpacesGetController>('Apps.Core.Controllers.SpacesGetController')
  router.get('/v1/spaces', (req: Request, res: Response) => controller.run(req, res))
}
