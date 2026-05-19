import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserDeleteController } from '@Apps/Core/controllers/http/User/UserDeleteController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<UserDeleteController>('Apps.Core.Controllers.UserDeleteController')
  router.delete('/v1/users/:id', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}