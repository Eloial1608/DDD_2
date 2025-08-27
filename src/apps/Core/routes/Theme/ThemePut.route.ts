import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { ThemePutController } from '@Apps/Core/controllers/Theme/ThemePutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ThemePutController>('Apps.Core.Controllers.ThemePutController')
  router.put('/v1/theme/:id', (req: Request, res: Response) => controller.run(req, res))
}
