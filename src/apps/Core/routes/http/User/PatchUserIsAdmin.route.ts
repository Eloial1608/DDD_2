import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserIsAdminPatchController } from '@Apps/Core/controllers/http/User/UserIsAdminPatchController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<UserIsAdminPatchController>('Apps.Core.Controllers.UserIsAdminPatchController')
  router.patch('/v1/users/admin/:id', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}
