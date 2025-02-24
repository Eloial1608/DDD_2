import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { CourseDeleteController } from '@Apps/Course/controllers/Course/CourseDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CourseDeleteController>('Apps.Course.Controllers.CourseDeleteController')
  router.delete('/v1/courses/:id', (req: Request, res: Response) => controller.run(req, res))
}
