import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { FindByIdAccountController } from '@Apps/Core/controllers/http/Account/FindByIdAccountController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<FindByIdAccountController>('Apps.Core.Controllers.FindByIdAccountController')
  router.get('/v1/account/:id', (req: Request, res: Response) => controller.run(req, res))
}