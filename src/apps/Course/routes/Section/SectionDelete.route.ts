import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { SectionDeleteController } from '@Apps/Course/controllers/Section/SectionDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SectionDeleteController>('Apps.Course.Controllers.SectionDeleteController')
  router.delete('/v1/sections/:id', (req: Request, res: Response) => controller.run(req, res))
}
