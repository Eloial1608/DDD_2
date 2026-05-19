import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UsersGetController } from '@Apps/Core/controllers/http/User/UsersGetController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<UsersGetController>('Apps.Core.Controllers.UsersGetController')
  router.get('/v1/users', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}
