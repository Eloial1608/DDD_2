import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { CoursesGetController } from '@Apps/Course/controllers/Course/CoursesGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CoursesGetController>('Apps.Course.Controllers.CoursesGetController')
  router.get('/v1/courses', (req: Request, res: Response) => controller.run(req, res))
}
