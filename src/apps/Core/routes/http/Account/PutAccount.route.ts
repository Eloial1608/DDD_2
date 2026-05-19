import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { AccountPutController } from '@Apps/Core/controllers/http/Account/AccountPutController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<AccountPutController>('Apps.Core.Controllers.AccountPutController')

  router.put('/v1/account/:id', middleware.run, (req: Request, res: Response) => controller.run(req, res) )
}
