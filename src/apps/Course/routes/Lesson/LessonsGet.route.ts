import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { LessonsGetController } from '@Apps/Course/controllers/Lesson/LessonsGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LessonsGetController>('Apps.Course.Controllers.LessonsGetController')
  router.get('/v1/lessons', (req: Request, res: Response) => controller.run(req, res))
}
