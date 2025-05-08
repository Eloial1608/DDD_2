import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { LessonGetController } from '@Apps/Course/controllers/Lesson/LessonGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LessonGetController>('Apps.Course.Controllers.LessonGetController')
  router.get('/v1/lessons/:id', (req: Request, res: Response) => controller.run(req, res))
}
