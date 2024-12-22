import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { StripeSessionGetController } from '@Apps/Core/controllers/StripeSession/StripeSessionGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<StripeSessionGetController>('Apps.Core.Controllers.StripeSessionGetController')
  router.get('/v1/stripe-session/:id', (req: Request, res: Response) => controller.run(req, res))
}
