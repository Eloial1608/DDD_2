import { Request, Response, Router } from 'express'
import DI from '@Apps/Projects/dependencyInjection/DI'
import { ProjectUserDeleteController } from '@Apps/Projects/controllers/ProjectUser/ProjectUserDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ProjectUserDeleteController>('Apps.Projects.Controllers.ProjectUserDeleteController')
  router.delete('/v1/projects/users/:id', (req: Request, res: Response) => controller.run(req, res))
}
