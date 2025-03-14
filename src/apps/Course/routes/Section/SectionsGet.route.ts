import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { SectionsGetController } from '@Apps/Course/controllers/Section/SectionsGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SectionsGetController>('Apps.Course.Controllers.SectionsGetController')
  router.get('/v1/sections', (req: Request, res: Response) => controller.run(req, res))
}
