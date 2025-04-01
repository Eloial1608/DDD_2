import { Request, Response, Router } from 'express'
import DI from '@Apps/Events/dependencyInjection/DI'
import { TicketDeleteController } from '@Apps/Events/controllers/Ticket/TicketDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<TicketDeleteController>('Apps.Ticket.Controllers.TicketDeleteController')
  router.delete('/v1/tickets/:id', (req: Request, res: Response) => controller.run(req, res))
}
