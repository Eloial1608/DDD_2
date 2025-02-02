import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { FormDeleteController } from '@Apps/Core/controllers/Form/FormDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<FormDeleteController>('Apps.Core.Controllers.FormDeleteController')
  router.delete('/v1/form/:id', (req: Request, res: Response) => controller.run(req, res))
}
