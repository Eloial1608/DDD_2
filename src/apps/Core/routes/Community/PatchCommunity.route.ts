import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityPatchController } from '@Apps/Core/controllers/Community/CommunityPatchController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunityPatchController>('Apps.Core.Controllers.CommunityPatchController')
  router.patch('/v1/communities/:id', (req: Request, res: Response) => controller.run(req, res))
}
