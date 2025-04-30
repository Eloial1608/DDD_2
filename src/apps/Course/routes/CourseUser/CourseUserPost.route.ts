import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { CourseUserPostController } from '@Apps/Course/controllers/CourseUser/CourseUserPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CourseUserPostController>('Apps.CourseUser.Controllers.CourseUserPostController')
  router.post('/v1/courses/users/:id', (req: Request, res: Response) => controller.run(req, res))
}
