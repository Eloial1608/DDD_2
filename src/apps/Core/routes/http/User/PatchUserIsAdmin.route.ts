import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserIsAdminPatchController } from '@Apps/Core/controllers/http/User/UserIsAdminPatchController'

export const register = (router: Router) => {
  //const isAdminMiddleware = DI.getInstance().resolve<IsAdminMiddleware>('Apps.Core.Middleware.IsAdminMiddleware')
  const controller = DI.getInstance().resolve<UserIsAdminPatchController>('Apps.Core.Controllers.UserIsAdminPatchController')
  router.patch('/v1/users/admin/:id', (req: Request, res: Response) => controller.run(req, res))
}