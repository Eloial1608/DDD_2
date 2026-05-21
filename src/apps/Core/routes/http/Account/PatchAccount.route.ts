import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'
import { AccountPatchController } from 'src/apps/Core/controllers/http/Account/AccountPatchController'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<AccountPatchController>('Apps.Core.Controllers.AccountPatchController')

  router.patch('/v1/account/:id', middleware.run, (req: Request, res: Response) => controller.run(req, res) )
}
