import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { TransactionGetController } from '@Apps/Core/controllers/http/Transaction/TransactionGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<TransactionGetController>('Apps.Core.Controllers.TransactionGetController')
  router.get('/v1/transaction/:id', (req: Request, res: Response) => controller.run(req, res))
}