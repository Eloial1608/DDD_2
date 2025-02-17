import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { CourseGetController } from '@Apps/Course/controllers/Course/CourseGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CourseGetController>('Apps.Course.Controllers.CourseGetController')
  router.get('/v1/course/:id', (req: Request, res: Response) => controller.run(req, res))
}
