import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { ThemePostController } from '@Apps/Core/controllers/Theme/ThemePostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ThemePostController>('Apps.Core.Controllers.ThemePostController')
  router.post('/v1/theme/:id', (req: Request, res: Response) => controller.run(req, res))
}
