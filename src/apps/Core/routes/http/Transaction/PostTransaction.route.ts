import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { TransactionPostController } from '@Apps/Core/controllers/http/Transaction/TransactionPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<TransactionPostController>('Apps.Core.Controllers.TransactionPostController')
  router.post('/v1/transactions', (req: Request, res: Response) => controller.run(req, res))

}