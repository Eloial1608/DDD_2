import { Request, Response, Router } from 'express'
import DI from '@Apps/Events/dependencyInjection/DI'
import { TicketPostController } from '@Apps/Events/controllers/Ticket/TicketPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<TicketPostController>('Apps.Ticket.Controllers.TicketPostController')
  router.post('/v1/tickets/:id', (req: Request, res: Response) => controller.run(req, res))
}
