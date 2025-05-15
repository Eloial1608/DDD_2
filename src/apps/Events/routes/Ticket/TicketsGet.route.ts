import { Request, Response, Router } from 'express'
import DI from '@Apps/Events/dependencyInjection/DI'
import { TicketsGetController } from '@Apps/Events/controllers/Ticket/TicketsGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<TicketsGetController>('Apps.Ticket.Controllers.TicketsGetController')
  router.get('/v1/tickets', (req: Request, res: Response) => controller.run(req, res))
}
