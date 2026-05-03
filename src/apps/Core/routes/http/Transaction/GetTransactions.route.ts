import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { TransactionsGetController } from '@Apps/Core/controllers/http/Transaction/TransactionsGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<TransactionsGetController>('Apps.Core.Controllers.TransactionsGetController')
  router.get('/v1/transactions', (req: Request, res: Response) => controller.run(req, res))
}