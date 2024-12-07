import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityPostController } from '@Apps/Core/controllers/Community/CommunityPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunityPostController>('Apps.Core.Controllers.CommunityPostController')
  router.post('/v1/communities/:id', (req: Request, res: Response) => controller.run(req, res))
}
