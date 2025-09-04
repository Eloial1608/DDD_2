import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { ThemeGetController } from '@Apps/Core/controllers/Theme/ThemeGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ThemeGetController>('Apps.Core.Controllers.ThemeGetController')
  router.get('/v1/theme/:id', (req: Request, res: Response) => controller.run(req, res))
}
