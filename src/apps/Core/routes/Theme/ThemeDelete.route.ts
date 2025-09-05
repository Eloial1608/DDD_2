import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { ThemeDeleteController } from '@Apps/Core/controllers/Theme/ThemeDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ThemeDeleteController>('Apps.Core.Controllers.ThemeDeleteController')
  router.delete('/v1/theme/:id', (req: Request, res: Response) => controller.run(req, res))
}
