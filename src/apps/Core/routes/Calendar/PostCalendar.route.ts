import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CalendarPostController } from '@Apps/Core/controllers/Calendar/CalendarPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CalendarPostController>('Apps.Core.Controllers.CalendarPostController')
  router.post('/v1/calendars/:id', (req: Request, res: Response) => controller.run(req, res))
}
