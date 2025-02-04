import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { FormPutController } from '@Apps/Core/controllers/Form/FormPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<FormPutController>('Apps.Core.Controllers.FormPutController')
  router.put('/v1/form/:id', (req: Request, res: Response) => controller.run(req, res))
}
