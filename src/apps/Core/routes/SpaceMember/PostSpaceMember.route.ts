import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { SpaceMemberPostController } from '@Apps/Core/controllers/SpaceMember/SpaceMemberPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SpaceMemberPostController>('Apps.Core.Controllers.SpaceMemberPostController')
  router.post('/v1/spaces/members/:id', (req: Request, res: Response) => controller.run(req, res))
}
