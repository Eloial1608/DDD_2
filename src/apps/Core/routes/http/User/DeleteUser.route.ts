import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserDeleteController } from '@Apps/Core/controllers/http/User/UserDeleteController'

export const register = (router: Router) => {
  //const isAdminMiddleware = DI.getInstance().resolve<IsAdminMiddleware>('Apps.Core.Middleware.IsAdminMiddleware')
  const controller = DI.getInstance().resolve<UserDeleteController>('Apps.Core.Controllers.UserDeleteController')
  router.delete('/v1/users/:id', (req: Request, res: Response) => controller.run(req, res))
}