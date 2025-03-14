import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { SectionGetController } from '@Apps/Course/controllers/Section/SectionGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SectionGetController>('Apps.Course.Controllers.SectionGetController')
  router.get('/v1/sections/:id', (req: Request, res: Response) => controller.run(req, res))
}
