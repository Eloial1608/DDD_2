import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserPasswordPatchController } from '@Apps/Core/controllers/http/User/UserPasswordPatchController'

export const register = (router: Router) => {
  //const isAdminMiddleware = DI.getInstance().resolve<IsAdminMiddleware>('Apps.Core.Middleware.IsAdminMiddleware')
  const controller = DI.getInstance().resolve<UserPasswordPatchController>('Apps.Core.Controllers.UserPasswordPatchController')
  router.patch('/v1/users/password/:id', (req: Request, res: Response) => controller.run(req, res))
}