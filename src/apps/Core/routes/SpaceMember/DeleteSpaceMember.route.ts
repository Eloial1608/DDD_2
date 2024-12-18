import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { SpaceMemberDeleteController } from '@Apps/Core/controllers/SpaceMember/SpaceMemberDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SpaceMemberDeleteController>('Apps.Core.Controllers.SpaceMemberDeleteController')
  router.delete('/v1/spaces/members/:id', (req: Request, res: Response) => controller.run(req, res))
}
