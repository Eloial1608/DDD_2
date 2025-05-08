import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { LessonOrderPatchController } from '@Apps/Course/controllers/Lesson/LessonOrderPatchController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LessonOrderPatchController>('Apps.Course.Controllers.LessonOrderPatchController')
  router.patch('/v1/lessons/order/:id', (req: Request, res: Response) => controller.run(req, res))
}
