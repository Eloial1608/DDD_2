import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { CoursePostController } from '@Apps/Course/controllers/Course/CoursePostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CoursePostController>('Apps.Course.Controllers.CoursePostController')
  router.post('/v1/courses/:id', (req: Request, res: Response) => controller.run(req, res))
}
