import { Request, Response, Router } from 'express'
import DI from '@Apps/Projects/dependencyInjection/DI'
import { ProjectUsersGetController } from '@Apps/Projects/controllers/ProjectUser/ProjectUsersGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ProjectUsersGetController>('Apps.Projects.Controllers.ProjectUsersGetController')
  router.get('/v1/projects/users', (req: Request, res: Response) => controller.run(req, res))
}
