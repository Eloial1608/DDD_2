import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { SpacesPatchController } from '@Apps/Core/controllers/Space/SpacesPatchController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SpacesPatchController>('Apps.Core.Controllers.SpacesPatchController')
  router.patch('/v1/spaces/:id', (req: Request, res: Response) => controller.run(req, res))
}
