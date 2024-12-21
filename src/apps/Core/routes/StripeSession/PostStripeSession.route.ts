import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { StripeSessionPostController } from '@Apps/Core/controllers/StripeSession/StripeSessionPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<StripeSessionPostController>('Apps.Core.Controllers.StripeSessionPostController')
  router.post('/v1/stripe-session/:id', (req: Request, res: Response) => controller.run(req, res))
}
