import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { AccountGetController } from '@Apps/Core/controllers/http/Account/AccountGetController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<AccountGetController>('Apps.Core.Controllers.AccountGetController')
  router.get('/v1/account/:id', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}
