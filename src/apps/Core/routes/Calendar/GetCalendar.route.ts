import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CalendarGetController } from '@Apps/Core/controllers/Calendar/CalendarGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CalendarGetController>('Apps.Core.Controllers.CalendarGetController')
  router.get('/v1/calendars/:id', (req: Request, res: Response) => controller.run(req, res))
}
