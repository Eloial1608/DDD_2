import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { CoursePutController } from '@Apps/Course/controllers/Course/CoursePutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CoursePutController>('Apps.Course.Controllers.CoursePutController')
  router.put('/v1/courses/:id', (req: Request, res: Response) => controller.run(req, res))
}
