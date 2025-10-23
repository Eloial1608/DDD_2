import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { OpenGetController } from '../controllers/OpenGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<OpenGetController>('Apps.Core.Controllers.OpenGetController')
  router.get('/open/roman-pizza', (req: Request, res: Response) => controller.run(req, res))
}
