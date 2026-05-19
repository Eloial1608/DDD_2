import { AccountPostController } from '@Apps/Core/controllers/http/Account/AccountPostController'
import DI from '@Apps/Core/dependencyInjection/DI'
import { Request, Response, Router } from 'express'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
   const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
   const controller = DI.getInstance().resolve<AccountPostController>('Apps.Core.Controllers.AccountPostController')
  router.post('/v1/account', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}