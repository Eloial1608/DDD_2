import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { SpaceMemberModeratorPatchController } from '@Apps/Core/controllers/SpaceMember/SpaceMemberModeratorPatchController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SpaceMemberModeratorPatchController>('Apps.Core.Controllers.SpaceMemberModeratorPatchController')
  router.patch('/v1/spaces/members/moderator/:id', (req: Request, res: Response) => controller.run(req, res))
}
