import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { LessonPostController } from '@Apps/Course/controllers/Lesson/LessonPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LessonPostController>('Apps.Course.Controllers.LessonPostController')
  router.post('/v1/lessons/:id', (req: Request, res: Response) => controller.run(req, res))
}
