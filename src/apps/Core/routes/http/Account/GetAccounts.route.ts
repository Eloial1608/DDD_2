import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { FindMyAccountsController } from '@Apps/Core/controllers/http/Account/FindMyAccountsController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<FindMyAccountsController>('Apps.Core.Controllers.FindMyAccountsController')

  router.get('/v1/accounts/me', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}