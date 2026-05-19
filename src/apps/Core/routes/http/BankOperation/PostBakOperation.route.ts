import { BankOperationPostController } from '@Apps/Core/controllers/http/BankOperation/BankOperationPostController'
import DI from '@Apps/Core/dependencyInjection/DI'
import { Request, Response, Router } from 'express'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<BankOperationPostController>('Apps.Core.Controllers.BankOperationPostController')
  router.post('/v1/bank-operation', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}