import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserGetController } from '@Apps/Core/controllers/http/User/UserGetController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<UserGetController>('Apps.Core.Controllers.UserGetController')
  router.get('/v1/users/:id', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}

