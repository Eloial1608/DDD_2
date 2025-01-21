import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityDeleteController } from '@Apps/Core/controllers/Community/CommunityDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunityDeleteController>('Apps.Core.Controllers.CommunityDeleteController')
  router.delete('/v1/communities/:id', (req: Request, res: Response) => controller.run(req, res))
}
