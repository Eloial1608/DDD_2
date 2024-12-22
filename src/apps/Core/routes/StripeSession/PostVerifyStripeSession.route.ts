import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { VerifyStripeSessionPostController } from '@Apps/Core/controllers/StripeSession/VerifyStripeSessionPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<VerifyStripeSessionPostController>('Apps.Core.Controllers.VerifyStripeSessionPostController')
  router.post('/v1/stripe-session/verify/:id', (req: Request, res: Response) => controller.run(req, res))
}
