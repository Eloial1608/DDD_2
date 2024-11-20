import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityByIdGetController } from '@Apps/Core/controllers/Community/CommunityByIdGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunityByIdGetController>('Apps.Core.Controllers.CommunityByIdGetController')
  router.get('/v1/communities/id/:id', (req: Request, res: Response) => controller.run(req, res))
}
