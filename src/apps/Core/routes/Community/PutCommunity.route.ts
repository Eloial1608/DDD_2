import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityPutController } from '@Apps/Core/controllers/Community/CommunityPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunityPutController>('Apps.Core.Controllers.CommunityPutController')
  router.put('/v1/communities/:id', (req: Request, res: Response) => controller.run(req, res))
}
