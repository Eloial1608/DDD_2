import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { FormPostController } from '@Apps/Core/controllers/Form/FormPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<FormPostController>('Apps.Core.Controllers.FormPostController')
  router.post('/v1/form/:id', (req: Request, res: Response) => controller.run(req, res))
}
