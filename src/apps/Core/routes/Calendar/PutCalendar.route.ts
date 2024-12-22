import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CalendarPutController } from '@Apps/Core/controllers/Calendar/CalendarPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CalendarPutController>('Apps.Core.Controllers.CalendarPutController')
  router.put('/v1/calendars/:id', (req: Request, res: Response) => controller.run(req, res))
}
