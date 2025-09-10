import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { ThemesGetController } from '@Apps/Core/controllers/Theme/ThemesGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ThemesGetController>('Apps.Core.Controllers.ThemesGetController')
  router.get('/v1/theme', (req: Request, res: Response) => controller.run(req, res))
}
