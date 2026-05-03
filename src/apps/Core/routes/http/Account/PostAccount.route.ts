import { AccountPostController } from '@Apps/Core/controllers/http/Account/AccountPostController'
import DI from '@Apps/Core/dependencyInjection/DI'
import { Request, Response, Router } from 'express'

export const register = (router: Router) => {
   const controller = DI .getInstance() .resolve<AccountPostController>('Apps.Core.Controllers.AccountPostController')
  router.post('/v1/account', (req: Request, res: Response) => controller.run(req, res))
}