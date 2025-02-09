import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { SubcommunityPostController } from '@Apps/Core/controllers/Community/SubcommunityPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SubcommunityPostController>('Apps.Core.Controllers.SubcommunityPostController')
  router.post('/v1/communities/sub/:id', (req: Request, res: Response) => controller.run(req, res))
}
