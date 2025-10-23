import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { ButtonGetController } from '../controllers/ButtonGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ButtonGetController>('Apps.Core.Controllers.ButtonGetController')
  router.get('/button/roman-pizza', (req: Request, res: Response) => controller.run(req, res))
}
