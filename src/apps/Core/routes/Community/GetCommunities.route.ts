import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunitiesGetController } from '@Apps/Core/controllers/Community/CommunitiesGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunitiesGetController>('Apps.Core.Controllers.CommunitiesGetController')
  router.get('/v1/communities', (req: Request, res: Response) => controller.run(req, res))
}
