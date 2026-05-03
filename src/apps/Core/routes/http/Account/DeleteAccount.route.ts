
import { AccountDeleteController } from '@Apps/Core/controllers/http/Account/AccountDeleteController'
import DI from '@Apps/Core/dependencyInjection/DI'
import { Request, Response, Router } from 'express'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<AccountDeleteController>('Apps.Core.Controllers.AccountDeleteController')
  router.delete('/v1/account/:id', (req: Request, res: Response) => controller.run(req, res))
}