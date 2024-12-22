import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserIsAdminPatchController } from '@Apps/Core/controllers/User/UserIsAdminPatchController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<UserIsAdminPatchController>('Apps.Core.Controllers.UserIsAdminPatchController')
  router.patch('/v1/users/:id', (req: Request, res: Response) => controller.run(req, res))
}
