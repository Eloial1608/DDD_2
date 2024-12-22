import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { StripeAccountPostController } from '@Apps/Core/controllers/StripeAccount/StripeAccountPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<StripeAccountPostController>('Apps.Core.Controllers.StripeAccountPostController')
  router.post('/v1/stripe-account', (req: Request, res: Response) => controller.run(req, res))
}
