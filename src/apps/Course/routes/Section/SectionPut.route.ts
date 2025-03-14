import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { SectionPutController } from '@Apps/Course/controllers/Section/SectionPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SectionPutController>('Apps.Course.Controllers.SectionPutController')
  router.put('/v1/sections/:id', (req: Request, res: Response) => controller.run(req, res))
}
