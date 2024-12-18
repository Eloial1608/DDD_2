import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { SpaceMembersGetController } from '@Apps/Core/controllers/SpaceMember/SpaceMembersGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SpaceMembersGetController>('Apps.Core.Controllers.SpaceMembersGetController')
  router.get('/v1/spaces/members', (req: Request, res: Response) => controller.run(req, res))
}
