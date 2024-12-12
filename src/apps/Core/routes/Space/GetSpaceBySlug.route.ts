import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { SpaceBySlugGetController } from '@Apps/Core/controllers/Space/SpaceBySlugGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SpaceBySlugGetController>('Apps.Core.Controllers.SpaceBySlugGetController')
  router.get('/v1/spaces/:slug', (req: Request, res: Response) => controller.run(req, res))
}
