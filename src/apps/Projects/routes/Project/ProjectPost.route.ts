import { Request, Response, Router } from 'express'
import DI from '@Apps/Projects/dependencyInjection/DI'
import { ProjectPostController } from '@Apps/Projects/controllers/Project/ProjectPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ProjectPostController>('Apps.Projects.Controllers.ProjectPostController')
  router.post('/v1/projects/:id', (req: Request, res: Response) => controller.run(req, res))
}
