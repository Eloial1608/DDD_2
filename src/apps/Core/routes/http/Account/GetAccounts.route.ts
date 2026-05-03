
import { AccountsGetController } from '@Apps/Core/controllers/http/Account/AccountsGetController'
import DI from '@Apps/Core/dependencyInjection/DI'
import { Request, Response, Router } from 'express'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<AccountsGetController>('Apps.Core.Controllers.AccountsGetController')
  router.get('/v1/account/:id', (req: Request, res: Response) => controller.run(req, res))
}