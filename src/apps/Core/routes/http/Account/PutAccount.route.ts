import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { AccountPutController } from '@Apps/Core/controllers/http/Account/AccountPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<AccountPutController>('Apps.Core.Controllers.AccountPutController')

  router.put('/v1/account/:id', (req: Request, res: Response) => controller.run(req, res) )
}