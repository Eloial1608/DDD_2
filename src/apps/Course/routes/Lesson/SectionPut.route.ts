import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { LessonPutController } from '@Apps/Course/controllers/Lesson/LessonPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LessonPutController>('Apps.Course.Controllers.LessonPutController')
  router.put('/v1/lessons/:id', (req: Request, res: Response) => controller.run(req, res))
}
