import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { FormGetController } from '@Apps/Core/controllers/Form/FormGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<FormGetController>('Apps.Core.Controllers.FormGetController')
  router.get('/v1/form/:id', (req: Request, res: Response) => controller.run(req, res))
}
