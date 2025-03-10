import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { SectionPostController } from '@Apps/Course/controllers/Section/SectionPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SectionPostController>('Apps.Course.Controllers.SectionPostController')
  router.post('/v1/sections/:id', (req: Request, res: Response) => controller.run(req, res))
}
