import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserPatchController } from '@Apps/Core/controllers/User/UserPatchController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<UserPatchController>('Apps.Core.Controllers.UserPatchController')
  router.patch('/v1/user/:id', (req: Request, res: Response) => controller.run(req, res))
}
