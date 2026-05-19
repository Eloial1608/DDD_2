
import { AccountDeleteController } from '@Apps/Core/controllers/http/Account/AccountDeleteController'
import DI from '@Apps/Core/dependencyInjection/DI'
import { Request, Response, Router } from 'express'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<AccountDeleteController>('Apps.Core.Controllers.AccountDeleteController')
  router.delete('/v1/account/:id', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}
