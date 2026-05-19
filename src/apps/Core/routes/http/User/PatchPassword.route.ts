import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserPasswordPatchController } from '@Apps/Core/controllers/http/User/UserPasswordPatchController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<UserPasswordPatchController>('Apps.Core.Controllers.UserPasswordPatchController')
  router.patch('/v1/users/password/:id', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}
