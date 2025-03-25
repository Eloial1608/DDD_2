import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { LessonDeleteController } from '@Apps/Course/controllers/Lesson/LessonDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LessonDeleteController>('Apps.Course.Controllers.LessonDeleteController')
  router.delete('/v1/lessons/:id', (req: Request, res: Response) => controller.run(req, res))
}
